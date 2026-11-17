import type { Product } from "./types";

function normalize(s: string) {
  return s.toLowerCase().replace(/nickle/g, "nickel").replace(/fire\s*tiger/g, "firetiger").replace(/[^a-z0-9/ ]+/g, " ");
}

/** Lightweight token search across name, color parts and families. */
export function searchProducts(list: Product[], query: string) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (!tokens.length) return list;
  return list.filter((p) => {
    const haystack = normalize(
      [p.fullName, ...p.colorParts.map((c) => c.label), ...p.families, ...p.variants.map((v) => v.weight)].join(" "),
    );
    return tokens.every((t) => haystack.includes(t));
  });
}
