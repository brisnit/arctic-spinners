import Foundation
import Vision
import CoreImage
import ImageIO
import UniformTypeIdentifiers

// Usage: cutout <input.jpg> <output.png>
// Lifts the foreground subject using Apple Vision and writes a tightly-cropped PNG with alpha.
let args = CommandLine.arguments
guard args.count == 3 else { fputs("usage: cutout in out\n", stderr); exit(2) }
let inURL = URL(fileURLWithPath: args[1]), outURL = URL(fileURLWithPath: args[2])
guard let src = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else { fputs("read fail\n", stderr); exit(1) }
let handler = VNImageRequestHandler(ciImage: src)
let req = VNGenerateForegroundInstanceMaskRequest()
do { try handler.perform([req]) } catch { fputs("vision fail \(error)\n", stderr); exit(1) }
guard let obs = req.results?.first, !obs.allInstances.isEmpty else { fputs("no subject\n", stderr); exit(3) }
let maskBuf = try obs.generateScaledMaskForImage(forInstances: obs.allInstances, from: handler)
let mask = CIImage(cvPixelBuffer: maskBuf)
let clear = CIImage(color: .clear).cropped(to: src.extent)
let blended = src.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: clear, kCIInputMaskImageKey: mask])
// Crop to mask bounds with padding
let ctx = CIContext()
guard let mcg = ctx.createCGImage(mask, from: mask.extent) else { exit(1) }
let w = mcg.width, h = mcg.height
var data = [UInt8](repeating: 0, count: w * h)
let cs = CGColorSpaceCreateDeviceGray()
let bctx = CGContext(data: &data, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w, space: cs, bitmapInfo: 0)!
bctx.draw(mcg, in: CGRect(x: 0, y: 0, width: w, height: h))
var minX = w, minY = h, maxX = 0, maxY = 0
for y in 0..<h { for x in 0..<w where data[y * w + x] > 40 { minX = min(minX, x); maxX = max(maxX, x); minY = min(minY, y); maxY = max(maxY, y) } }
if maxX <= minX { exit(3) }
// data rows are top-down after draw; CI coords are bottom-up
let pad = Int(Double(max(maxX - minX, maxY - minY)) * 0.04)
let rect = CGRect(x: max(0, minX - pad), y: max(0, (h - 1 - maxY) - pad), width: min(w, maxX - minX + 2 * pad), height: min(h, maxY - minY + 2 * pad)).intersection(src.extent)
guard let out = ctx.createCGImage(blended, from: rect, format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)) else { exit(1) }
let dest = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.png.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, nil)
CGImageDestinationFinalize(dest)
print("\(out.width)x\(out.height) coverage=\(Double((maxX-minX)*(maxY-minY))/Double(w*h))")
