import { ArrowRight, Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { LureImage } from "@/components/product/lure-image";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal } from "@/components/shared/reveal";
import { getProduct, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The Arctic Spinner was designed in 1967 by fishing guide Jack Wadkins in Bear Lake, Michigan. Today it's owned and operated by Doug Richardson of Luckey, Ohio.",
  alternates: { canonical: "/our-story" },
};

const timeline = [
  {
    year: "1967",
    title: "Born in Bear Lake, Michigan",
    text: "Fishing guide Jack Wadkins designs a unique in-line spinner on the water in Bear Lake, Michigan. The Arctic Spinner is born.",
  },
  {
    year: "Decades",
    title: "A reputation, earned one fish at a time",
    text: "The lure builds an excellent history of catching fish throughout Michigan and northern Indiana — passed from angler to angler and bait shop to bait shop.",
  },
  {
    year: "2007",
    title: "In print",
    text: "Outdoor writer Brian Kelly documents the lure in an article for the Michigan outdoor magazine Woods-n-Water, later published in Midwest Outdoors.",
  },
  {
    year: "2011",
    title: "Black takes the crown",
    text: "For the first time in the lure’s history, orange is not the best-selling color. Black outsells the next best color by well over 2 to 1.",
  },
  {
    year: "2012",
    title: "New colors from angler feedback",
    text: "An All Black lure with black beads, a two-tone Black Copper Vein, a brown body and skirt — the classic night crawler color — and purple blades join the lineup.",
  },
  {
    year: "Today",
    title: "Hand assembled in Luckey, Ohio",
    text: `Owned and operated by Doug Richardson of Luckey, Ohio. Anglers report salmon in Alaska and pike and muskie in Canada — and the lineup now spans ${products.length} colorways.`,
  },
];

export default function OurStoryPage() {
  const sig = getProduct("platte-magic")!;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ice">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 size-[36rem] rounded-full border-[72px] border-arctic/[0.06]" />
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-24 grid-cols-[minmax(0,1fr)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-4 text-arctic">Our Story</p>
              <h1 className="display text-6xl text-navy sm:text-8xl lg:text-[8.5rem]">
                A legend
                <br />
                since <span className="text-arctic">1967.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                The Arctic Spinner is a unique, in-line spinner that continues to grow its reputation as an extremely
                productive lure. It started with one fishing guide in northern Michigan. It continues with every angler who
                ties one on.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <figure className="rotate-[1.5deg] rounded-xl bg-white p-3 shadow-xl shadow-navy/10 ring-1 ring-border">
              <Image
                src="/images/brand/banner_main4.jpg"
                alt="Original Arctic Spinners banner: Steelhead, Chinook, Coho, Browns, Trout, Pike, Bass — Hand-made in the USA"
                width={600}
                height={249}
                className="h-auto w-full rounded-md"
              />
              <figcaption className="px-1 pt-3 text-xs text-muted-foreground">
                Archive: the banner from the original arcticspinner.com.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Origin */}
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 grid-cols-[minmax(0,1fr)] lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="display text-[9rem] leading-none text-arctic sm:text-[12rem]">’67</p>
            <p className="eyebrow mt-2 text-muted-foreground">Bear Lake, Michigan</p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-navy/85 lg:col-span-7">
            <h2 className="display text-5xl text-navy sm:text-6xl">Designed by a guide. Proven by anglers.</h2>
            <p>
              The Arctic Spinner was designed in 1967 by fishing guide Jack Wadkins in Bear Lake, Michigan. The lure built an
              excellent history of catching fish throughout Michigan and northern Indiana — the kind of reputation that only
              comes from time on the water.
            </p>
            <p>
              Today it’s owned and operated by Doug Richardson of Luckey, Ohio, and the goal is simple: give anglers in the rest
              of the country, and the world, access to this all-time great fishing lure.
            </p>
            <p>
              Every lure is hand assembled with professional care, using the finest lure components you’ll find anywhere.
              Nothing rushed to market. No shortcuts. No gimmicks. No flash-in-the-pan, next-greatest things.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-navy py-16 text-white sm:py-24" aria-labelledby="timeline-heading">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-3 text-electric">Through the years</p>
            <h2 id="timeline-heading" className="display text-5xl sm:text-7xl">
              Over 50 years on the water.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t, i) => (
              <li key={t.year} className="bg-navy p-7 sm:p-8">
                <Reveal delay={(i % 3) * 0.06}>
                  <p className="display text-5xl text-electric">{t.year}</p>
                  <h3 className="mt-4 text-lg font-bold">{t.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{t.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Made to catch / built to last */}
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-6 grid-cols-[minmax(0,1fr)] lg:grid-cols-2">
          <Reveal className="group relative overflow-hidden rounded-2xl bg-ice">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/catches/succ_pic05b.jpg"
                alt="Angler holding a steelhead caught on a blue Arctic Spinner"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <h3 className="display text-5xl sm:text-6xl">Made to catch.</h3>
              <p className="mt-2 max-w-md text-white/85">
                Steelhead, salmon, trout, walleye, pike, muskie and bass — reported by the anglers who fish them.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="group relative overflow-hidden rounded-2xl bg-ice">
            <div className="relative aspect-[4/3]">
              <LureImage
                image={sig.images[0]}
                sizes="(min-width: 1024px) 45vw, 100vw"
                pad="p-12 pb-28"
                className="rotate-[-12deg] transition-transform duration-700 group-hover:rotate-[-6deg]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <h3 className="display text-5xl text-navy sm:text-6xl">Built to last.</h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Quality components, assembled by hand — worth the money in durability alone.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-ice py-16 sm:py-24">
        <div className="container-page grid items-center gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <Quote className="size-12 text-arctic" />
            <blockquote className="display mt-5 text-4xl leading-[0.98] text-navy sm:text-6xl">
              “Without you, the Arctic Spinner doesn’t exist. You can count on us to do everything we can to continue to provide
              you with quality lures at affordable prices.”
            </blockquote>
            <p className="mt-6 font-semibold text-navy">
              — Doug Richardson <span className="font-normal text-muted-foreground">· Arctic Spinners, Luckey, Ohio</span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex justify-center lg:col-span-4">
            <figure className="text-center">
              <Image
                src="/images/brand/polar_bear_reading.jpg"
                alt="Illustrated polar bear reading a book, from the original Arctic Spinners history page"
                width={164}
                height={200}
                className="mx-auto mix-blend-multiply"
              />
              <figcaption className="mt-2 text-xs text-muted-foreground">From the original history page.</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 rounded-3xl bg-arctic p-8 text-white sm:p-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="display text-5xl sm:text-6xl">Write your own chapter.</h2>
            <p className="mt-3 max-w-lg text-white/85">{products.length} colorways. Hand assembled. $6.99 each.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/shop" size="xl" variant="inverse">
              Shop the lures <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/dealers" size="xl" variant="outline-light">
              Find a dealer
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
