import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ShopCatalog, ShopCatalogFallback } from "@/components/shop/shop-catalog";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop All Lures",
  description: `Shop all ${products.length} hand-assembled Arctic Spinner in-line spinners. $6.99 each in 1/4, 5/16 and 1/2 oz weights.`,
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-border bg-ice">
        <div className="container-page py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-arctic">
              Home
            </Link>{" "}
            / <span className="text-navy">Shop</span>
          </nav>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="display text-6xl text-navy sm:text-8xl">All Lures</h1>
            <p className="max-w-md text-muted-foreground">
              {products.length} hand-assembled in-line spinners. Every lure ships with a split ring, a treble hook and a spare
              single hook — <span className="font-semibold text-navy">$6.99 each</span>.
            </p>
          </div>
        </div>
      </section>
      <Suspense fallback={<ShopCatalogFallback />}>
        <ShopCatalog />
      </Suspense>
    </>
  );
}
