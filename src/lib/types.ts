/**
 * Commerce data model.
 *
 * Shaped to map cleanly onto Shopify / WooCommerce style APIs:
 *   Product  ->  Shopify Product / Woo product
 *   Variant  ->  Shopify ProductVariant / Woo variation (weight option)
 * Money is stored in integer cents to avoid floating-point drift.
 */

export type ColorFamily =
  | "black"
  | "blue"
  | "chartreuse"
  | "glow"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "white"
  | "yellow"
  | "brown"
  | "firetiger"
  | "metallic"
  | "signature";

export interface ColorPart {
  /** Label as it appears in the product name, e.g. "Nickel" */
  label: string;
  /** CSS background for swatch rendering */
  swatch: string;
}

export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /**
   * "cutout": subject isolated from the original photo (transparent PNG).
   * "photo": the original product photo from the current store.
   */
  kind: "cutout" | "photo";
}

export interface ProductVariant {
  id: string;
  /** Weight option as listed in the current store, e.g. "1/4 oz" */
  weight: string;
  priceCents: number;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  /** Short display name, e.g. "Black-Nickel-Red" */
  name: string;
  /** Full catalog name, e.g. "Black-Nickel-Red Arctic Spinner" */
  fullName: string;
  priceCents: number;
  currency: "USD";
  available: boolean;
  /** Merchandising order (mirrors the existing store order) */
  position: number;
  isSignature: boolean;
  colorParts: ColorPart[];
  families: ColorFamily[];
  variants: ProductVariant[];
  images: ProductImage[];
  /** EasyCart model number from the current store, when present */
  modelNumber: string | null;
  /** Link to the product on the current arcticspinner.com store */
  sourceUrl: string;
  /** Known content issue carried over from the source store */
  dataNote?: string;
}

export interface CartLine {
  variantId: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  headline: string;
  author: string;
  role?: string;
  location?: string;
  /** Verbatim paragraphs from arcticspinner.com */
  body: string[];
  /** Short pull quote taken verbatim from the body */
  pullQuote: string;
  photos: { src: string; width: number; height: number; alt: string }[];
  /** Color families this angler mentions, used for relevance on product pages */
  mentions: ColorFamily[];
}

export interface Dealer {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  website: string | null;
  lat: number | null;
  lng: number | null;
}
