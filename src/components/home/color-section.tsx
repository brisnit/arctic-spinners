import { LureImage } from "@/components/product/lure-image";
import Link from "next/link";
import { Reveal } from "@/components/shared/reveal";
import { FAMILY_META, familyCount, products } from "@/lib/catalog";
import type { ColorFamily } from "@/lib/types";

const SHOWN: ColorFamily[] = [
  "black",
  "blue",
  "chartreuse",
  "glow",
  "red",
  "orange",
  "green",
  "purple",
  "pink",
  "white",
  "yellow",
  "firetiger",
];

export function ColorSection({ id = "colors" }: { id?: string }) {
  const families = FAMILY_META.filter((f) => SHOWN.includes(f.id));
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24" aria-labelledby={`${id}-heading`}>
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-arctic">Shop by color</p>
            <h2 id={`${id}-heading`} className="display text-[2.75rem] text-navy sm:text-6xl lg:text-7xl">
              Pick your color.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            From all-black silhouettes to high-visibility chartreuse and the glow series — find the color the fish want
            today.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-3 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6">
          {families.map((f, i) => {
            const sample = products.find((p) => p.families.includes(f.id) && p.available);
            return (
              <li key={f.id}>
                <Reveal delay={(i % 6) * 0.04}>
                  <Link
                    href={`/shop?color=${f.id}`}
                    className="group flex flex-col items-center text-center"
                    aria-label={`Shop ${f.label} lures, ${familyCount(f.id)} styles`}
                  >
                    <span className="relative flex aspect-square w-full max-w-[9.5rem] items-center justify-center">
                      <span
                        className="absolute inset-[6%] rounded-full shadow-[inset_0_-10px_24px_rgba(0,0,0,0.12)] ring-1 ring-navy/10 transition-transform duration-500 ease-out-quint group-hover:scale-[1.06]"
                        style={{ background: f.swatch }}
                      />
                      <span className="absolute inset-0 rounded-full ring-2 ring-transparent ring-offset-4 transition-all duration-300 group-hover:ring-arctic group-focus-visible:ring-arctic" />
                      {sample && (
                        <span className="relative h-[86%] w-[60%] translate-y-3 rotate-[-8deg] opacity-0 transition-all duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="absolute inset-0 overflow-hidden rounded-lg bg-white shadow-lg">
                            <LureImage image={sample.images[0]} alt="" sizes="100px" pad="p-1.5" shadow={false} />
                          </span>
                        </span>
                      )}
                    </span>
                    <span className="mt-3 text-sm font-semibold text-navy group-hover:text-arctic sm:text-base">{f.label}</span>
                    <span className="text-xs text-muted-foreground">{familyCount(f.id)} styles</span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal className="mt-10">
          <Link
            href="/shop?color=signature"
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <span
              aria-hidden
              className="absolute -top-20 -right-16 size-64 rounded-full opacity-60 blur-2xl transition-opacity group-hover:opacity-90"
              style={{ background: FAMILY_META.find((f) => f.id === "signature")!.swatch }}
            />
            <span className="relative">
              <span className="eyebrow block text-electric">Signature patterns</span>
              <span className="display mt-1 block text-4xl sm:text-5xl">Raspberry C · Wonder · Platte Magic</span>
            </span>
            <span className="relative inline-flex h-11 items-center gap-2 self-start rounded-md bg-white px-5 text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors group-hover:bg-electric group-hover:text-white sm:self-auto">
              Shop signature
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
