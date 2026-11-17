import source from "@/data/products.source.json";
import type { ColorFamily, ColorPart, Product } from "./types";

type SourceProduct = (typeof source)[number];

/* ------------------------------------------------------------------
   Color vocabulary
   ------------------------------------------------------------------ */

const PART_SWATCH: Record<string, string> = {
  black: "#14181c",
  blue: "#1f4fd1",
  brown: "#6b4426",
  chartreuse: "#c8e619",
  gold: "linear-gradient(135deg,#f6dd8a 0%,#c99a2e 55%,#8f6a14 100%)",
  brass: "linear-gradient(135deg,#f1d98f 0%,#b8902f 55%,#7d5e17 100%)",
  nickel: "linear-gradient(135deg,#ffffff 0%,#c4ccd3 45%,#7f8a93 100%)",
  green: "#1fa045",
  orange: "#ff7a1a",
  pink: "#ff5fa8",
  purple: "#6a2fb8",
  red: "#d7262e",
  white: "#ffffff",
  yellow: "#ffd60a",
  firetiger:
    "repeating-linear-gradient(135deg,#ffd60a 0 4px,#1fa045 4px 7px,#ff7a1a 7px 11px)",
  glow: "radial-gradient(circle at 35% 35%,#fbffe8 0%,#e4ff9e 45%,#b5f04a 100%)",
};

const PART_FAMILY: Record<string, ColorFamily> = {
  black: "black",
  blue: "blue",
  brown: "brown",
  chartreuse: "chartreuse",
  green: "green",
  orange: "orange",
  pink: "pink",
  purple: "purple",
  red: "red",
  white: "white",
  yellow: "yellow",
  firetiger: "firetiger",
  glow: "glow",
  gold: "metallic",
  brass: "metallic",
  nickel: "metallic",
};

/**
 * Signature patterns do not encode their colors in the name. Swatches and
 * families below are read directly from the existing product photography.
 */
const SIGNATURE: Record<
  string,
  { parts: ColorPart[]; families: ColorFamily[] }
> = {
  "arctic-raspberry-c": {
    parts: [
      { label: "Black", swatch: PART_SWATCH.black },
      { label: "Raspberry", swatch: "#d61f8f" },
      { label: "Purple", swatch: PART_SWATCH.purple },
    ],
    families: ["signature", "black", "pink", "purple"],
  },
  "arctic-wonder": {
    parts: [
      { label: "White", swatch: PART_SWATCH.white },
      { label: "Pink", swatch: PART_SWATCH.pink },
      { label: "Blue", swatch: PART_SWATCH.blue },
    ],
    families: ["signature", "white", "blue", "pink"],
  },
  "platte-magic": {
    parts: [
      { label: "Black", swatch: PART_SWATCH.black },
      { label: "Green", swatch: "#4ee04a" },
    ],
    families: ["signature", "black", "green"],
  },
};

/**
 * Listings that share an identical photo file on the current store
 * (verified by file hash). Each needs its own photography before launch.
 */
const SHARED_PHOTO_GROUPS: string[][] = [
  ["black-black-green", "black-black-purple", "glow-black-green", "glow-black-purple"],
  ["black-black-orange", "glow-black-orange"],
  ["glow-orange", "orange-orange-orange"],
  ["glow-pink", "pink-pink-pink"],
  ["glow-yellow", "yellow-yellow-yellow"],
  ["glow-white-green", "white-green-white"],
  ["orange-orange-brass", "orange-orange-nickel"],
];

const DATA_NOTES: Record<string, string> = Object.fromEntries(
  SHARED_PHOTO_GROUPS.flatMap((group) =>
    group.map((slug) => [
      slug,
      "Shared photo — the current store uses this same image for more than one colorway. A dedicated photo is needed.",
    ]),
  ),
);

function titleCase(token: string) {
  if (token.toUpperCase() === "GLOW") return "Glow";
  if (token.toLowerCase() === "firetiger") return "FireTiger";
  if (token.toLowerCase() === "nickle") return "Nickel";
  return token.charAt(0).toUpperCase() + token.slice(1).toLowerCase();
}

function parseParts(p: SourceProduct): { parts: ColorPart[]; families: ColorFamily[] } {
  const sig = SIGNATURE[p.slug];
  if (sig) return sig;
  const tokens = p.name.split("-").map((t) => t.trim()).filter(Boolean);
  const parts: ColorPart[] = [];
  const families = new Set<ColorFamily>();
  for (const raw of tokens) {
    const key = raw.toLowerCase() === "nickle" ? "nickel" : raw.toLowerCase();
    parts.push({ label: titleCase(raw), swatch: PART_SWATCH[key] ?? "#cbd5dc" });
    const fam = PART_FAMILY[key];
    if (fam) families.add(fam);
  }
  return { parts, families: [...families] };
}

const PRICE_CENTS = 699;

function buildProduct(p: SourceProduct, index: number): Product {
  const { parts, families } = parseParts(p);
  const isSignature = families.includes("signature");
  const variants = p.weights.map((w) => ({
    id: `${p.slug}__${w.replace(/[^0-9]+/g, "-").replace(/-+$/, "")}oz`,
    weight: w,
    priceCents: PRICE_CENTS,
    available: p.inStock,
  }));
  return {
    id: p.slug,
    slug: p.slug,
    name: p.name,
    fullName: p.fullName,
    priceCents: PRICE_CENTS,
    currency: "USD",
    available: p.inStock,
    position: index,
    isSignature,
    colorParts: parts,
    families,
    variants,
    images: [
      ...(p.cutout
        ? [{ ...p.cutout, kind: "cutout" as const, alt: `${p.fullName} in-line spinner fishing lure` }]
        : []),
      {
        ...p.image,
        kind: "photo" as const,
        alt: `${p.fullName} photographed on the workbench`,
      },
    ],
    modelNumber: p.modelNumber,
    sourceUrl: p.sourceUrl,
    dataNote: DATA_NOTES[p.slug],
  };
}

export const products: Product[] = source.map(buildProduct);

const bySlug = new Map(products.map((p) => [p.slug, p]));
const byVariant = new Map(
  products.flatMap((p) => p.variants.map((v) => [v.id, { product: p, variant: v }] as const)),
);

export function getProduct(slug: string) {
  return bySlug.get(slug);
}

export function getVariant(variantId: string) {
  return byVariant.get(variantId);
}

export function getProducts(slugs: string[]) {
  return slugs.map((s) => bySlug.get(s)).filter((p): p is Product => Boolean(p));
}

/** Products featured on the homepage, as named in the creative brief. */
export const FEATURED_SLUGS = [
  "arctic-raspberry-c",
  "arctic-wonder",
  "black-black-blue",
  "blue-nickel-blue",
  "chartreuse-green-chartreuse",
  "glow-chartreuse",
  "platte-magic",
  "black-black-red",
];

export function getRelatedProducts(product: Product, limit = 4) {
  const scored = products
    .filter((p) => p.slug !== product.slug && p.available)
    .map((p) => ({
      p,
      score: p.families.filter((f) => product.families.includes(f)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.position - b.p.position);
  return scored.slice(0, limit).map((x) => x.p);
}

/* ------------------------------------------------------------------
   Color families for "Shop by Color" & filters
   ------------------------------------------------------------------ */

export interface FamilyMeta {
  id: ColorFamily;
  label: string;
  swatch: string;
  blurb: string;
}

export const FAMILY_META: FamilyMeta[] = [
  { id: "black", label: "Black", swatch: PART_SWATCH.black, blurb: "Dark silhouettes" },
  { id: "blue", label: "Blue", swatch: PART_SWATCH.blue, blurb: "Cool water classics" },
  { id: "chartreuse", label: "Chartreuse", swatch: PART_SWATCH.chartreuse, blurb: "High-visibility" },
  { id: "glow", label: "Glow", swatch: PART_SWATCH.glow, blurb: "Glow series" },
  { id: "red", label: "Red", swatch: PART_SWATCH.red, blurb: "Bold & bright" },
  { id: "orange", label: "Orange", swatch: PART_SWATCH.orange, blurb: "Warm tones" },
  { id: "green", label: "Green", swatch: PART_SWATCH.green, blurb: "Natural greens" },
  { id: "purple", label: "Purple", swatch: PART_SWATCH.purple, blurb: "Deep purples" },
  { id: "pink", label: "Pink", swatch: PART_SWATCH.pink, blurb: "Hot pinks" },
  { id: "white", label: "White", swatch: PART_SWATCH.white, blurb: "Clean whites" },
  { id: "yellow", label: "Yellow", swatch: PART_SWATCH.yellow, blurb: "Sunny yellows" },
  { id: "firetiger", label: "FireTiger", swatch: PART_SWATCH.firetiger, blurb: "Striped pattern" },
  { id: "metallic", label: "Nickel, Brass & Gold", swatch: PART_SWATCH.nickel, blurb: "Metal finishes" },
  { id: "brown", label: "Brown", swatch: PART_SWATCH.brown, blurb: "Earth tones" },
  {
    id: "signature",
    label: "Signature Patterns",
    swatch: "conic-gradient(from 210deg,#d61f8f,#1f4fd1,#4ee04a,#ffd60a,#d61f8f)",
    blurb: "Raspberry C, Wonder & Platte Magic",
  },
];

export function familyMeta(id: ColorFamily) {
  return FAMILY_META.find((f) => f.id === id)!;
}

export function familyCount(id: ColorFamily) {
  return products.filter((p) => p.families.includes(id)).length;
}

export const ALL_WEIGHTS = ["1/4 oz", "5/16 oz", "1/2 oz"] as const;
