import { Award, Cog, FishingHook, Hand } from "lucide-react";
import Image from "next/image";
import { LureImage } from "@/components/product/lure-image";
import { Reveal } from "@/components/shared/reveal";
import { getProduct, products } from "@/lib/catalog";

const benefits = [
  {
    icon: Hand,
    title: "Hand-Assembled Quality",
    text: "Every Arctic Spinner is hand assembled with professional care. Nothing rushed to market. No shortcuts. No gimmicks.",
  },
  {
    icon: Award,
    title: "Proven Fishing Heritage",
    text: "Designed in 1967 by fishing guide Jack Wadkins in Bear Lake, Michigan — with a fish-catching reputation earned across Michigan, northern Indiana and beyond.",
  },
  {
    icon: Cog,
    title: "Carefully Selected Components",
    text: "Built with the finest lure components you’ll find anywhere, so every spinner is worth its money in durability alone.",
  },
  {
    icon: FishingHook,
    title: "Made for the Next Cast",
    text: "Each lure comes with a split ring for easy hook setup and a treble hook, plus an extra single hook included just in case.",
  },
];

export function WhySection() {
  const hero = getProduct("arctic-raspberry-c")!;
  const stats = [
    { value: "1967", label: "First designed" },
    { value: String(products.length), label: "Colorways" },
    { value: "3", label: "Weights offered" },
    { value: "$6.99", label: "Per lure" },
  ];

  return (
    <section className="overflow-hidden bg-ice py-16 sm:py-24" aria-labelledby="why-heading">
      <div className="container-page grid items-center gap-12 grid-cols-[minmax(0,1fr)] lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
            <LureImage image={hero.images[0]} sizes="(min-width: 1024px) 40vw, 90vw" pad="p-12" className="rotate-[-8deg]" />
            <span className="absolute bottom-5 left-5 rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white">
              {hero.name}
            </span>
          </div>
          <div className="absolute -right-3 -bottom-8 w-[46%] overflow-hidden rounded-xl border-4 border-ice shadow-xl sm:-right-6 lg:-right-10">
            <Image
              src="/images/catches/succ_pic05c.jpg"
              alt="Steelhead with a blue Arctic Spinner in its jaw, sent in by a customer"
              width={600}
              height={450}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-3 text-arctic">Why Arctic Spinners</p>
            <h2 id="why-heading" className="display text-[2.6rem] text-navy sm:text-6xl lg:text-[4.25rem]">
              Over 50 years of fish-catching heritage.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              There’s a reason fishermen put their faith in Arctic Spinners. It’s a legacy of unwavering quality that can be
              seen in every lure and felt with every cast of the line.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06} className="group">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-white text-arctic shadow-sm ring-1 ring-border transition-colors group-hover:bg-arctic group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-display text-sm font-bold tracking-widest text-arctic/70">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border ring-1 ring-border sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white px-5 py-4">
                  <dt className="text-xs font-medium text-muted-foreground">{s.label}</dt>
                  <dd className="display mt-1 text-4xl text-navy">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
