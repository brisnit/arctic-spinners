import { ArrowRight, Camera, Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/shared/button-link";
import { CatchGallery } from "@/components/shared/catch-gallery";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { catchGallery, testimonials } from "@/data/testimonials";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials & Catch Photos",
  description: "Real fishing stories and catch photos sent to Arctic Spinners by the anglers who fish them.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const allPhotos = [
    ...testimonials.flatMap((t) => t.photos.map((p) => ({ ...p, credit: t.author }))),
    ...catchGallery,
  ];

  return (
    <>
      <PageHero eyebrow="Testimonials" title="Straight from the river.">
        Here’s what some of our fishermen are saying about Arctic Spinner lures. Every note and photo below was sent to us by
        an angler — reproduced as written.
      </PageHero>

      <div className="container-page divide-y divide-border">
        {testimonials.map((t, i) => (
          <article key={t.id} id={t.id} className="grid scroll-mt-28 gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
              {t.photos.length > 0 ? (
                <div className={cn("grid gap-3", t.photos.length > 1 && "grid-cols-2")}>
                  {t.photos.map((p, j) => (
                    <div
                      key={p.src}
                      className={cn(
                        "relative overflow-hidden rounded-xl bg-ice",
                        t.photos.length > 2 && j === 0 ? "col-span-2 aspect-[4/3]" : "aspect-[4/3]",
                        t.photos.length === 1 && "aspect-[4/3]",
                      )}
                    >
                      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex aspect-[4/3] flex-col justify-between rounded-xl bg-navy p-8 text-white">
                  <Quote className="size-12 text-electric" />
                  <p className="display text-4xl leading-[0.95] sm:text-5xl">“{t.pullQuote}”</p>
                </div>
              )}
            </Reveal>
            <Reveal delay={0.08} className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-1 lg:col-start-1")}>
              <p className="eyebrow text-arctic">Story {String(i + 1).padStart(2, "0")}</p>
              <h2 className="display mt-3 text-4xl text-navy sm:text-5xl">{t.headline}</h2>
              <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-navy/80">
                {t.body.map((para, k) => (
                  <p key={k}>{para}</p>
                ))}
              </div>
              <p className="mt-6 border-l-4 border-arctic pl-4">
                <span className="block font-semibold text-navy">{t.author}</span>
                {(t.role || t.location) && (
                  <span className="text-sm text-muted-foreground">{[t.role, t.location].filter(Boolean).join(" · ")}</span>
                )}
              </p>
            </Reveal>
          </article>
        ))}
      </div>

      <section className="bg-ice py-16 sm:py-24" aria-labelledby="gallery-heading">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-3 text-arctic">Catch gallery</p>
              <h2 id="gallery-heading" className="display text-5xl text-navy sm:text-6xl">
                Proof on the stringer.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Photos sent in by customers, including some that arrived without a story. Tap any photo to view it larger.
            </p>
          </div>
          <CatchGallery photos={allPhotos} />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 rounded-3xl bg-navy p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div className="flex items-start gap-5">
            <span className="hidden size-14 shrink-0 items-center justify-center rounded-full bg-arctic sm:flex">
              <Camera className="size-6" />
            </span>
            <div>
              <h2 className="display text-5xl sm:text-6xl">Caught one on an Arctic?</h2>
              <p className="mt-3 max-w-lg text-white/80">
                Send us your photo and story — we’d love to hear about it.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("My Arctic Spinner catch")}`}
              className="inline-flex h-12 items-center gap-2 rounded-md bg-signal px-6 text-[0.8125rem] font-semibold tracking-[0.12em] uppercase hover:bg-signal-600"
            >
              Share your catch <ArrowRight className="size-4" />
            </a>
            <ButtonLink href="/shop" size="xl" variant="outline-light">
              Shop the lures
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
