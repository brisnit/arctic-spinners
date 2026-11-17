import { NextResponse, type NextRequest } from "next/server";
import source from "@/data/products.source.json";

/**
 * With Cache Components enabled, `dynamicParams = false` is unavailable, so
 * unknown product URLs would stream the not-found UI with a 200 status.
 * Rewrite them to an unmatched path so they return a true 404.
 */
const known = new Set(source.map((p) => p.slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !known.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__product-not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/shop/:slug",
};
