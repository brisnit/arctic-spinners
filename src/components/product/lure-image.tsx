import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Renders a product image inside a positioned container (uses `fill`).
 * Cutouts float with a soft shadow; original photos fill the tile.
 */
export function LureImage({
  image,
  sizes,
  priority,
  className,
  pad = "p-[9%]",
  shadow = true,
  alt,
  style,
}: {
  image: ProductImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Padding applied to cutouts */
  pad?: string;
  shadow?: boolean;
  alt?: string;
  style?: CSSProperties;
}) {
  const cutout = image.kind === "cutout";
  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      fill
      sizes={sizes}
      priority={priority}
      style={style}
      className={cn(
        cutout ? cn("object-contain", pad, shadow && "drop-shadow-[0_14px_16px_rgba(16,43,63,0.22)]") : "object-cover",
        className,
      )}
    />
  );
}
