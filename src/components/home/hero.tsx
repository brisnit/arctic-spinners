import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { LureImage } from "@/components/product/lure-image";
import Link from "next/link";
import { ButtonLink } from "@/components/shared/button-link";
import { PlaceholderChip } from "@/components/shared/placeholder-chip";
import { Reveal } from "@/components/shared/reveal";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function Hero() {
  const featured = getProduct("arctic-wonder")!;
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <Image
        src="/images/lifestyle/river-cast-placeholder.jpg"
        alt="Angler casting into a clear, rocky river on a bright summer day"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[68%_center]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/45 to-navy/0 md:via-navy/30" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy/70 to-transparent" />
      <PlaceholderChip className="absolute top-4 right-4" />

      <div className="container-page flex min-h-[clamp(560px,calc(100svh-6.75rem),860px)] flex-col justify-end pt-24 pb-10 sm:pb-14 lg:pb-16">
        <div className="grid items-end gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-white ring-1 ring-white/20 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-electric" />
                Est. 1967 · Bear Lake, Michigan
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display text-[clamp(3.6rem,11vw,9.5rem)] text-white">
                The Legend
                <br />
                Lives <span className="text-electric">On.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Hand-assembled fishing lures with a legacy dating back to 1967. Built for the moments that keep you coming back
                to the water.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop" size="xl" variant="accent">
                Shop the Lures <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/our-story" size="xl" variant="outline-light">
                Our Story
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal delay={0.35} className="hidden lg:col-span-4 lg:block xl:col-span-3 xl:col-start-10">
            <Link
              href={`/shop/${featured.slug}`}
              className="group flex items-center gap-4 rounded-2xl bg-white/95 p-3 pr-5 shadow-2xl shadow-navy/40 ring-1 ring-white/50 backdrop-blur transition-transform duration-500 ease-out-quint hover:-translate-y-1"
            >
              <span className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-ice">
                <LureImage
                  image={featured.images[0]}
                  sizes="96px"
                  pad="p-2"
                  className="transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block text-[0.65rem] text-arctic">Signature pattern</span>
                <span className="display mt-1 block text-2xl text-navy">{featured.name}</span>
                <span className="mt-1 flex items-center gap-2 text-sm font-semibold text-navy">
                  {formatPrice(featured.priceCents)}
                  <ArrowUpRight className="size-4 text-arctic transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
