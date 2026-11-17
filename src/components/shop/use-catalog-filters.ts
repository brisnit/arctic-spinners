"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ALL_WEIGHTS, FAMILY_META } from "@/lib/catalog";
import type { ColorFamily } from "@/lib/types";

export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "name-asc", label: "Name: A–Z" },
  { id: "name-desc", label: "Name: Z–A" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
] as const;
export type SortId = (typeof SORTS)[number]["id"];

export const PRICE_MIN = 0;
export const PRICE_MAX = 10;

export interface Filters {
  q: string;
  colors: ColorFamily[];
  weights: string[];
  stock: ("in" | "out")[];
  price: [number, number];
  sort: SortId;
}

export type FilterUpdate = Partial<Filters> | ((current: Filters) => Partial<Filters>);

const familyIds = new Set(FAMILY_META.map((f) => f.id));

function list(v: string | null) {
  return v ? v.split(",").filter(Boolean) : [];
}

function num(params: URLSearchParams, key: string, fallback: number) {
  if (!params.has(key)) return fallback;
  const n = Number(params.get(key));
  return Number.isFinite(n) ? n : fallback;
}

export function parseFilters(params: URLSearchParams): Filters {
  const sort = params.get("sort") as SortId | null;
  return {
    q: params.get("q") ?? "",
    colors: list(params.get("color")).filter((c): c is ColorFamily => familyIds.has(c as ColorFamily)),
    weights: list(params.get("weight"))
      .map((w) => w.replace(/-/g, "/").replace(/oz$/, " oz"))
      .filter((w) => (ALL_WEIGHTS as readonly string[]).includes(w)),
    stock: list(params.get("stock")).filter((s): s is "in" | "out" => s === "in" || s === "out"),
    price: [num(params, "min", PRICE_MIN), num(params, "max", PRICE_MAX)],
    sort: sort && SORTS.some((s) => s.id === sort) ? sort : "featured",
  };
}

function serialize(f: Filters) {
  const sp = new URLSearchParams();
  if (f.q.trim()) sp.set("q", f.q);
  if (f.colors.length) sp.set("color", f.colors.join(","));
  if (f.weights.length) sp.set("weight", f.weights.map((w) => w.replace(" oz", "oz").replace("/", "-")).join(","));
  if (f.stock.length) sp.set("stock", f.stock.join(","));
  if (f.price[0] !== PRICE_MIN) sp.set("min", String(f.price[0]));
  if (f.price[1] !== PRICE_MAX) sp.set("max", String(f.price[1]));
  if (f.sort !== "featured") sp.set("sort", f.sort);
  return sp.toString();
}

/**
 * Filters live in the URL (shareable, back-button friendly). Updates use the
 * native History API, which Next.js syncs with useSearchParams without a
 * server round trip. Each update reads the live URL, so rapid successive
 * changes never overwrite each other with stale state.
 */
export function useCatalogFilters() {
  const params = useSearchParams();
  const filters = useMemo(() => parseFilters(new URLSearchParams(params.toString())), [params]);

  const update = useCallback((next: FilterUpdate) => {
    const current = parseFilters(new URLSearchParams(window.location.search));
    const patch = typeof next === "function" ? next(current) : next;
    const qs = serialize({ ...current, ...patch });
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
  }, []);

  return { filters, update };
}
