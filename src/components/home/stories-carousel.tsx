"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function StoriesCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-ice py-16 sm:py-24" aria-labelledby="stories-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3 text-arctic">Customer stories</p>
            <h2 id="stories-heading" className="display text-[2.75rem] text-navy sm:text-6xl lg:text-7xl">
              Straight from the river.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Real notes and catch photos sent to Arctic Spinners by the anglers who fish them.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={edges.start}
              className="inline-flex size-12 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35"
              aria-label="Previous stories"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={edges.end}
              className="inline-flex size-12 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-35"
              aria-label="Next stories"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <ul
        ref={track}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-px-4 px-4 pb-2 sm:gap-6 sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))] lg:px-[max(2.5rem,calc((100vw-88rem)/2+2.5rem))]"
        aria-label="Customer testimonials"
      >
        {testimonials.map((t) => {
          const photo = t.photos.find((p) => p.src.includes("05b")) ?? t.photos[0];
          return (
            <li
              key={t.id}
              className={cn(
                "flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl sm:w-[26rem]",
                photo ? "bg-white" : "bg-navy text-white",
              )}
            >
              {photo ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-ice-200">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 26rem, 85vw" className="object-cover" />
                </div>
              ) : (
                <div className="px-7 pt-8">
                  <Quote className="size-10 text-electric" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <p className={cn("eyebrow text-[0.65rem]", photo ? "text-arctic" : "text-electric")}>{t.headline}</p>
                <blockquote
                  className={cn(
                    "mt-3 flex-1",
                    photo ? "text-lg leading-snug font-medium text-navy" : "display text-[2.6rem] leading-[0.95] text-white",
                  )}
                >
                  “{t.pullQuote}”
                </blockquote>
                <footer className="mt-6 flex items-center justify-between gap-4 text-sm">
                  <span>
                    <span className="block font-semibold">{t.author}</span>
                    {(t.role || t.location) && (
                      <span className={cn("block text-xs", photo ? "text-muted-foreground" : "text-white/60")}>
                        {[t.role, t.location].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </span>
                  <Link
                    href={`/testimonials#${t.id}`}
                    className={cn(
                      "shrink-0 text-xs font-semibold underline-offset-4 hover:underline",
                      photo ? "text-arctic" : "text-electric",
                    )}
                  >
                    Read story
                  </Link>
                </footer>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
