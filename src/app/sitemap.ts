import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/our-story", "/testimonials", "/dealers", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...products.map((p) => ({ url: `${site.url}/shop/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
