import { LureImage } from "./lure-image";
import Link from "next/link";
import { ColorParts } from "@/components/shared/swatches";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { QuickAdd } from "./quick-add";

export function ProductCard({
  product,
  priority,
  className,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw",
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const img = product.images[0];
  const href = `/shop/${product.slug}`;
  return (
    <article className={cn("group/card relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ice transition-colors duration-300 group-hover/card:bg-ice-200">
        <Link href={href} className="absolute inset-0 z-0 rounded-xl" aria-label={product.fullName} tabIndex={-1}>
          <LureImage
            image={img}
            sizes={sizes}
            priority={priority}
            className={cn(
              "transition-transform duration-700 ease-out-quint group-hover/card:scale-[1.06]",
              img.kind === "cutout" && "group-hover/card:-rotate-3",
              !product.available && "opacity-60 grayscale-[35%]",
            )}
          />
        </Link>
        <div className="pointer-events-none absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
          {!product.available && (
            <span className="rounded-full bg-navy px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-white uppercase">
              Sold out
            </span>
          )}
          {product.isSignature && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-arctic uppercase shadow-sm">
              Signature
            </span>
          )}
          {product.families.includes("glow") && (
            <span className="rounded-full bg-[#e9ffb8] px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-navy uppercase">
              Glow
            </span>
          )}
        </div>
        <QuickAdd product={product} />
      </div>
      <div className="mt-3.5 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className="text-[0.95rem] leading-snug font-semibold text-navy">
            <Link href={href} className="after:absolute after:inset-x-0 after:bottom-0 after:h-14 hover:text-arctic sm:after:h-12">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {product.variants.length ? (
              <>
                {product.variants.length} weight{product.variants.length > 1 ? "s" : ""}
                <span className="hidden sm:inline"> · {product.variants.map((v) => v.weight).join(", ")}</span>
              </>
            ) : (
              "Currently unavailable"
            )}
          </p>
        </div>
        <p className="shrink-0 text-[0.95rem] font-semibold text-navy tabular-nums">{formatPrice(product.priceCents)}</p>
      </div>
      <ColorParts parts={product.colorParts} className="mt-2.5" />
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden>
      <div className="aspect-[4/5] animate-pulse rounded-xl bg-ice" />
      <div className="mt-3.5 h-4 w-2/3 animate-pulse rounded bg-ice" />
      <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-ice" />
    </div>
  );
}
