"use client";

import { ArrowDownUp, Search, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/product/product-card";
import { Swatch } from "@/components/shared/swatches";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ALL_WEIGHTS, FAMILY_META, familyMeta, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { searchProducts } from "@/lib/search";
import type { ColorFamily, Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type FilterUpdate, type Filters, PRICE_MAX, PRICE_MIN, SORTS, type SortId, useCatalogFilters } from "./use-catalog-filters";

const PAGE_SIZE = 12;

function applyFilters(all: Product[], f: Filters) {
  let list = f.q.trim() ? searchProducts(all, f.q) : all;
  if (f.colors.length) list = list.filter((p) => f.colors.some((c) => p.families.includes(c)));
  if (f.weights.length) list = list.filter((p) => p.variants.some((v) => f.weights.includes(v.weight)));
  if (f.stock.length === 1) list = list.filter((p) => (f.stock[0] === "in" ? p.available : !p.available));
  list = list.filter((p) => p.priceCents >= f.price[0] * 100 && p.priceCents <= f.price[1] * 100);

  const sorted = [...list];
  switch (f.sort) {
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      sorted.sort((a, b) => a.priceCents - b.priceCents || a.position - b.position);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.priceCents - a.priceCents || a.position - b.position);
      break;
    default:
      // Featured: in-stock first, signature patterns up front, then store order.
      sorted.sort(
        (a, b) =>
          Number(b.available) - Number(a.available) ||
          Number(b.isSignature) - Number(a.isSignature) ||
          a.position - b.position,
      );
  }
  return sorted;
}

export function ShopCatalog() {
  const { filters, update } = useCatalogFilters();
  const [pageCount, setPageCount] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const results = useMemo(() => applyFilters(products, filters), [filters]);
  const visible = results.slice(0, pageCount * PAGE_SIZE);

  const set = (next: FilterUpdate) => {
    setPageCount(1);
    update(next);
  };

  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const activeChips: { key: string; label: string; onRemove: () => void }[] = [
    ...(filters.q ? [{ key: "q", label: `“${filters.q}”`, onRemove: () => set({ q: "" }) }] : []),
    ...filters.colors.map((c) => ({
      key: `c-${c}`,
      label: familyMeta(c).label,
      onRemove: () => set((cur) => ({ colors: cur.colors.filter((x) => x !== c) })),
    })),
    ...filters.weights.map((w) => ({
      key: `w-${w}`,
      label: w,
      onRemove: () => set((cur) => ({ weights: cur.weights.filter((x) => x !== w) })),
    })),
    ...filters.stock.map((s) => ({
      key: `s-${s}`,
      label: s === "in" ? "In stock" : "Sold out",
      onRemove: () => set((cur) => ({ stock: cur.stock.filter((x) => x !== s) })),
    })),
    ...(filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX
      ? [
          {
            key: "price",
            label: `${formatPrice(filters.price[0] * 100)} – ${formatPrice(filters.price[1] * 100)}`,
            onRemove: () => set({ price: [PRICE_MIN, PRICE_MAX] }),
          },
        ]
      : []),
  ];

  const clearAll = () =>
    set({ q: "", colors: [], weights: [], stock: [], price: [PRICE_MIN, PRICE_MAX] });

  const filterPanel = (
    <FilterPanel
      filters={filters}
      onColor={(c) => set((cur) => ({ colors: toggle(cur.colors, c) }))}
      onWeight={(w) => set((cur) => ({ weights: toggle(cur.weights, w) }))}
      onStock={(s) => set((cur) => ({ stock: toggle(cur.stock, s) }))}
      onPrice={(p) => set({ price: p })}
    />
  );

  return (
    <>
      {/* Color rail */}
      <div id="colors" className="scroll-mt-28 border-b border-border bg-white">
        <div className="container-page">
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 py-4 sm:mx-0 sm:px-0" aria-label="Quick color filters">
            <button
              type="button"
              onClick={() => set({ colors: [] })}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors",
                filters.colors.length === 0 ? "border-navy bg-navy text-white" : "border-border text-navy hover:border-navy",
              )}
              aria-pressed={filters.colors.length === 0}
            >
              All colors
            </button>
            {FAMILY_META.map((f) => {
              const on = filters.colors.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => set((cur) => ({ colors: toggle(cur.colors, f.id) }))}
                  aria-pressed={on}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border pr-4 pl-2 text-sm font-semibold transition-colors",
                    on ? "border-arctic bg-arctic-50 text-arctic" : "border-border text-navy hover:border-navy",
                  )}
                >
                  <Swatch color={f.swatch} className="size-6" />
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-page grid gap-10 py-8 lg:grid-cols-[16rem_1fr] lg:py-12 xl:gap-14">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-28">
            <SearchField value={filters.q} onChange={(q) => set({ q })} />
            {filterPanel}
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-full lg:hidden">
              <SearchField value={filters.q} onChange={(q) => set({ q })} />
            </div>
            <p className="mr-auto text-sm text-muted-foreground" aria-live="polite">
              <span className="font-semibold text-navy">{results.length}</span> {results.length === 1 ? "lure" : "lures"}
            </p>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-input px-3.5 text-sm font-semibold text-navy lg:hidden"
            >
              <SlidersHorizontal className="size-4" /> Filters
              {activeChips.length > 0 && (
                <span className="rounded-full bg-arctic px-1.5 text-[0.65rem] text-white">{activeChips.length}</span>
              )}
            </button>
            <label className="relative inline-flex h-10 items-center">
              <span className="sr-only">Sort by</span>
              <ArrowDownUp className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <select
                value={filters.sort}
                onChange={(e) => set({ sort: e.target.value as SortId })}
                className="h-10 appearance-none rounded-md border border-input bg-white pr-8 pl-9 text-sm font-semibold text-navy outline-none focus-visible:ring-2 focus-visible:ring-electric"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span aria-hidden className="pointer-events-none absolute right-3 text-xs text-muted-foreground">▾</span>
            </label>
          </div>

          {activeChips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {activeChips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.onRemove}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ice pr-2.5 pl-3 text-xs font-semibold text-navy hover:bg-ice-200"
                  aria-label={`Remove filter ${c.label}`}
                >
                  {c.label} <X className="size-3.5" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="ml-1 text-xs font-semibold text-arctic hover:underline">
                Clear all
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-ice px-6 py-16 text-center">
              <p className="display text-4xl text-navy">No lures found</p>
              <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
                Nothing matches those filters. Try a different color or clear your filters to see all {products.length} lures.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="mt-6 inline-flex h-11 items-center rounded-md bg-arctic px-5 text-xs font-semibold tracking-[0.12em] text-white uppercase hover:bg-navy"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence initial={false} mode="popLayout">
                  {visible.map((p, i) => (
                    <motion.li
                      key={p.slug}
                      layout="position"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: (i % PAGE_SIZE) * 0.02 }}
                    >
                      <ProductCard product={p} priority={i < 4} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-14 flex flex-col items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing {visible.length} of {results.length}
                </p>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-ice">
                  <div
                    className="h-full rounded-full bg-arctic transition-[width] duration-500"
                    style={{ width: `${(visible.length / results.length) * 100}%` }}
                  />
                </div>
                {visible.length < results.length && (
                  <button
                    type="button"
                    onClick={() => setPageCount((n) => n + 1)}
                    className="inline-flex h-12 items-center rounded-md border border-navy/20 px-7 text-xs font-semibold tracking-[0.12em] text-navy uppercase transition-colors hover:bg-navy hover:text-white"
                  >
                    Load more lures
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[88%] max-w-sm gap-0 overflow-y-auto bg-white p-0">
          <div className="border-b border-border px-6 py-5">
            <SheetTitle className="display text-2xl text-navy">Filters</SheetTitle>
            <SheetDescription className="sr-only">Filter lures by color, weight, availability and price</SheetDescription>
          </div>
          <div className="px-6 py-4">{filterPanel}</div>
          <div className="sticky bottom-0 mt-auto flex gap-2 border-t border-border bg-white p-4">
            <button
              type="button"
              onClick={clearAll}
              className="h-12 flex-1 rounded-md border border-input text-sm font-semibold text-navy"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="h-12 flex-[2] rounded-md bg-arctic text-sm font-semibold text-white"
            >
              Show {results.length} lures
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function SearchField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search lures"
        aria-label="Search lures"
        className="h-11 w-full rounded-md border border-input bg-white pr-3 pl-9 text-sm text-navy outline-none placeholder:text-muted-foreground focus-visible:border-arctic focus-visible:ring-2 focus-visible:ring-electric/40"
      />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-border py-6 last:border-0">
      <legend className="eyebrow mb-4 text-navy">{title}</legend>
      {children}
    </fieldset>
  );
}

function FilterPanel({
  filters,
  onColor,
  onWeight,
  onStock,
  onPrice,
}: {
  filters: Filters;
  onColor: (c: ColorFamily) => void;
  onWeight: (w: string) => void;
  onStock: (s: "in" | "out") => void;
  onPrice: (p: [number, number]) => void;
}) {
  const count = (pred: (p: Product) => boolean) => products.filter(pred).length;
  return (
    <div className="mt-2">
      <FilterGroup title="Color">
        <ul className="space-y-2.5">
          {FAMILY_META.map((f) => (
            <li key={f.id}>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-navy">
                <Checkbox checked={filters.colors.includes(f.id)} onCheckedChange={() => onColor(f.id)} />
                <Swatch color={f.swatch} className="size-4" />
                <span className="flex-1">{f.label}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {count((p) => p.families.includes(f.id))}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>
      <FilterGroup title="Weight">
        <div className="grid grid-cols-3 gap-2">
          {ALL_WEIGHTS.map((w) => {
            const on = filters.weights.includes(w);
            return (
              <button
                key={w}
                type="button"
                aria-pressed={on}
                onClick={() => onWeight(w)}
                className={cn(
                  "h-10 rounded-md border text-xs font-semibold transition-colors",
                  on ? "border-arctic bg-arctic text-white" : "border-input text-navy hover:border-navy",
                )}
              >
                {w}
              </button>
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <div className="space-y-2.5">
          {(
            [
              ["in", "In stock", count((p) => p.available)],
              ["out", "Sold out", count((p) => !p.available)],
            ] as const
          ).map(([id, label, n]) => (
            <label key={id} className="flex cursor-pointer items-center gap-3 text-sm text-navy">
              <Checkbox checked={filters.stock.includes(id)} onCheckedChange={() => onStock(id)} />
              <span className="flex-1">{label}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{n}</span>
            </label>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price">
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={0.5}
          value={filters.price}
          onValueChange={(v) => {
            if (Array.isArray(v)) onPrice([v[0], v[1]]);
          }}
          aria-label="Price range"
          className="px-1"
        />
        <div className="mt-3 flex justify-between text-xs font-semibold text-navy tabular-nums">
          <span>{formatPrice(filters.price[0] * 100)}</span>
          <span>{formatPrice(filters.price[1] * 100)}</span>
        </div>
      </FilterGroup>
    </div>
  );
}

export function ShopCatalogFallback() {
  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[16rem_1fr]">
      <div className="hidden space-y-3 lg:block">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-5 animate-pulse rounded bg-ice" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
