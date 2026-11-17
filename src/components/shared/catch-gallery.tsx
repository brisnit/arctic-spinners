"use client";

import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

type Photo = { src: string; width: number; height: number; alt: string; credit?: string };

export function CatchGallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = index !== null ? photos[index] : null;

  return (
    <>
      <ul className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>li]:mb-4">
        {photos.map((p, i) => (
          <li key={p.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-xl bg-ice"
              aria-label={`View photo: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={p.width}
                height={p.height}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                className="h-auto w-full transition-transform duration-700 ease-out-quint group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/20" />
              <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
              {p.credit && (
                <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[0.65rem] font-semibold text-navy">
                  {p.credit}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <Sheet open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <SheetContent
          side="bottom"
          className="h-[100dvh] max-h-none gap-0 border-0 bg-navy/95 p-0 text-white sm:h-[100dvh]"
        >
          <SheetTitle className="sr-only">Catch photo</SheetTitle>
          <SheetDescription className="sr-only">{current?.alt}</SheetDescription>
          {current && (
            <div className="flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-12">
              <div className="relative h-full max-h-[78vh] w-full">
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <p className="min-w-[14rem] text-center text-sm text-white/80">
                  {current.alt}
                  {current.credit && <span className="block text-xs text-electric">{current.credit}</span>}
                </p>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
