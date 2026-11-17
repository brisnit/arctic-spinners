"use client";

import { Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import type { Product, ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LureImage } from "./lure-image";

interface View {
  id: string;
  label: string;
  image: ProductImage;
  scale: number;
  origin: string;
}

/**
 * Views are built only from the product's real photography: the isolated
 * lure, focused detail crops of it, and the original workbench photo.
 */
function buildViews(product: Product): View[] {
  const [primary, ...rest] = product.images;
  const views: View[] = [
    { id: "full", label: "Full lure", image: primary, scale: 1, origin: "50% 50%" },
    { id: "blade", label: "Blade & body", image: primary, scale: 2, origin: "50% 26%" },
    { id: "skirt", label: "Skirt & hooks", image: primary, scale: 1.8, origin: "50% 84%" },
  ];
  const photo = rest.find((i) => i.kind === "photo");
  if (photo) views.push({ id: "photo", label: "Original photo", image: photo, scale: 1, origin: "50% 50%" });
  return views;
}

export function ProductGallery({ product }: { product: Product }) {
  const views = useMemo(() => buildViews(product), [product]);
  const [viewId, setViewId] = useState(views[0].id);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const current = views.find((v) => v.id === viewId) ?? views[0];

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !frame.current) return;
    const r = frame.current.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const scale = zoom ? current.scale * 1.9 : current.scale;
  const origin = zoom ? `${zoom.x}% ${zoom.y}%` : current.origin;

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      <div className="scrollbar-none flex gap-3 overflow-x-auto md:flex-col" role="tablist" aria-label="Product image views">
        {views.map((v) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            aria-selected={current.id === v.id}
            aria-label={v.label}
            onClick={() => setViewId(v.id)}
            className={cn(
              "relative aspect-[4/5] w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-ice ring-2 transition-all ring-inset sm:w-20",
              current.id === v.id ? "ring-arctic" : "ring-transparent hover:ring-navy/20",
            )}
          >
            <LureImage
              image={v.image}
              alt=""
              sizes="80px"
              pad="p-1.5"
              shadow={false}
              style={{ transform: `scale(${v.scale})`, transformOrigin: v.origin }}
            />
          </button>
        ))}
      </div>

      <div className="relative min-w-0 flex-1">
        <div
          ref={frame}
          className={cn(
            "relative aspect-[4/5] overflow-hidden rounded-2xl bg-ice lg:aspect-auto lg:h-[min(76vh,46rem)]",
            zoom ? "cursor-zoom-out" : "cursor-zoom-in",
          )}
          onPointerMove={onMove}
          onPointerLeave={() => setZoom(null)}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[15%] bottom-[6%] h-[10%] rounded-[50%] bg-navy/[0.06] blur-xl"
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <LureImage
                image={current.image}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                pad="p-[8%]"
                className={cn("transition-transform duration-300 ease-out", !product.available && "opacity-70")}
                style={{ transform: `scale(${scale})`, transformOrigin: origin }}
              />
            </motion.div>
          </AnimatePresence>
          <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
            {current.label}
          </span>
          {!product.available && (
            <span className="absolute top-4 left-4 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold tracking-wider text-white uppercase">
              Sold out
            </span>
          )}
        </div>
        {product.dataNote && (
          <p className="mt-3 flex items-start gap-2 rounded-lg bg-[#fff4ec] px-3 py-2 text-xs text-[#8a3a12]">
            <Info className="mt-px size-3.5 shrink-0" /> {product.dataNote}
          </p>
        )}
      </div>
    </div>
  );
}
