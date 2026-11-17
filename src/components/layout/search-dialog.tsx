"use client";

import { ArrowRight, Search } from "lucide-react";
import { LureImage } from "@/components/product/lure-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Swatch } from "@/components/shared/swatches";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { FAMILY_META, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { searchProducts } from "@/lib/search";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const results = useMemo(() => (q.trim() ? searchProducts(products, q).slice(0, 6) : []), [q]);

  const close = () => {
    onOpenChange(false);
    setQ("");
  };

  return (
    <Sheet open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <SheetContent side="top" className="gap-0 bg-white p-0" showCloseButton>
        <SheetTitle className="sr-only">Search lures</SheetTitle>
        <SheetDescription className="sr-only">Search the Arctic Spinners catalog by name or color</SheetDescription>
        <div className="container-page max-w-3xl py-6 sm:py-10">
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
              close();
            }}
            className="flex items-center gap-3 border-b-2 border-navy pb-3"
          >
            <Search className="size-6 shrink-0 text-arctic" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by color or name — try “glow” or “firetiger”"
              className="w-full bg-transparent text-xl font-medium text-navy outline-none placeholder:text-muted-foreground/70 sm:text-2xl"
              aria-label="Search lures"
            />
          </form>

          {q.trim() ? (
            <div className="mt-6">
              {results.length ? (
                <ul className="divide-y divide-border">
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/shop/${p.slug}`}
                        onClick={close}
                        className="flex items-center gap-4 rounded-md px-2 py-3 hover:bg-ice"
                      >
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-ice">
                          <LureImage image={p.images[0]} alt="" sizes="56px" pad="p-1" shadow={false} />
                        </span>
                        <span className="flex-1">
                          <span className="block font-semibold text-navy">{p.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {p.available ? p.variants.map((v) => v.weight).join(" · ") : "Sold out"}
                          </span>
                        </span>
                        <span className="text-sm font-semibold text-navy">{formatPrice(p.priceCents)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-6 text-muted-foreground">No lures match “{q}”. Try a color like blue, glow, or chartreuse.</p>
              )}
              <Link
                href={`/shop?q=${encodeURIComponent(q.trim())}`}
                onClick={close}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-arctic hover:underline"
              >
                See all results <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              <p className="eyebrow mb-3 text-muted-foreground">Browse by color</p>
              <div className="flex flex-wrap gap-2">
                {FAMILY_META.slice(0, 10).map((f) => (
                  <Link
                    key={f.id}
                    href={`/shop?color=${f.id}`}
                    onClick={close}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:border-arctic hover:text-arctic"
                  >
                    <Swatch color={f.swatch} /> {f.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
