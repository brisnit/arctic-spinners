"use client";

import { Globe, LocateFixed, Loader2, MapPin, Navigation, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { dealers, dealerStates } from "@/data/dealers";
import { formatPhone, phoneHref } from "@/lib/format";
import type { Dealer } from "@/lib/types";
import { cn } from "@/lib/utils";

function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function mapsUrl(d: Dealer) {
  const q = [d.name, d.street, d.city, d.state, d.postalCode].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

function websiteUrl(w: string) {
  return /^https?:\/\//.test(w) ? w : `https://${w}`;
}

export function DealerDirectory() {
  const [q, setQ] = useState("");
  const [state, setState] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = dealers.filter(
      (d) =>
        (!state || d.state === state) &&
        (!needle || [d.name, d.city, d.state, d.postalCode, d.street].join(" ").toLowerCase().includes(needle)),
    );
    if (origin) {
      list = list
        .map((d) => ({ d, dist: d.lat != null && d.lng != null ? milesBetween(origin, { lat: d.lat, lng: d.lng }) : Infinity }))
        .sort((a, b) => a.dist - b.dist)
        .map((x) => x.d);
    }
    return list;
  }, [q, state, origin]);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Location isn’t available in this browser.");
      return;
    }
    setLocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setGeoError("We couldn’t get your location. Try searching by city or ZIP instead.");
        setLocating(false);
      },
      { timeout: 10000 },
    );
  };

  const grouped = useMemo(() => {
    if (origin) return [{ state: "Nearest to you", items: results }];
    const map = new Map<string, Dealer[]>();
    for (const d of results) map.set(d.state, [...(map.get(d.state) ?? []), d]);
    return [...map.entries()].map(([s, items]) => ({ state: s, items }));
  }, [results, origin]);

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 border-b border-border bg-white/95 px-4 py-4 backdrop-blur sm:top-[4.5rem] sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by shop, city or ZIP"
              aria-label="Search dealers"
              className="h-12 w-full rounded-md border border-input bg-white pr-3 pl-10 text-[0.95rem] text-navy outline-none focus-visible:border-arctic focus-visible:ring-2 focus-visible:ring-electric/40"
            />
          </div>
          <button
            type="button"
            onClick={origin ? () => setOrigin(null) : locate}
            className={cn(
              "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors",
              origin ? "bg-navy text-white" : "bg-arctic text-white hover:bg-navy",
            )}
          >
            {locating ? <Loader2 className="size-4 animate-spin" /> : <LocateFixed className="size-4" />}
            {origin ? "Clear location" : "Use my location"}
          </button>
        </div>
        <div className="scrollbar-none mt-3 flex gap-2 overflow-x-auto" role="group" aria-label="Filter by state">
          {[null, ...dealerStates].map((s) => (
            <button
              key={s ?? "all"}
              type="button"
              aria-pressed={state === s}
              onClick={() => setState(s)}
              className={cn(
                "h-9 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors",
                state === s ? "bg-navy text-white" : "bg-ice text-navy hover:bg-ice-200",
              )}
            >
              {s ?? "All states"}{" "}
              <span className="opacity-60">({s ? dealers.filter((d) => d.state === s).length : dealers.length})</span>
            </button>
          ))}
        </div>
        {geoError && <p className="mt-2 text-sm text-destructive">{geoError}</p>}
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {results.length} {results.length === 1 ? "dealer" : "dealers"}
        {origin && " · sorted by distance"}
      </p>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-ice px-6 py-14 text-center">
          <p className="display text-4xl text-navy">No dealers found</p>
          <p className="mt-2 text-muted-foreground">Try another city or ZIP — or order online any time.</p>
        </div>
      ) : (
        grouped.map((g) => (
          <section key={g.state} className="mt-8" aria-label={g.state}>
            <h2 className="display mb-4 flex items-baseline gap-3 text-3xl text-navy">
              {g.state} <span className="font-sans text-sm font-medium tracking-normal text-muted-foreground normal-case">{g.items.length}</span>
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {g.items.map((d) => {
                const tel = phoneHref(d.phone);
                const dist =
                  origin && d.lat != null && d.lng != null ? milesBetween(origin, { lat: d.lat, lng: d.lng }) : null;
                return (
                  <li
                    key={`${d.name}-${d.street}`}
                    className="flex flex-col rounded-xl border border-border bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-navy/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-navy">{d.name}</h3>
                      {dist != null && (
                        <span className="shrink-0 rounded-full bg-arctic-50 px-2 py-0.5 text-xs font-semibold text-arctic">
                          {dist < 10 ? dist.toFixed(1) : Math.round(dist)} mi
                        </span>
                      )}
                    </div>
                    <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-arctic" />
                      <span>
                        {d.street}
                        <br />
                        {d.city}, {d.state} {d.postalCode}
                      </span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-sm font-semibold">
                      {d.phone &&
                        (tel ? (
                          <a href={tel} className="inline-flex items-center gap-1.5 text-navy hover:text-arctic">
                            <Phone className="size-3.5" /> {formatPhone(d.phone)}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-navy">
                            <Phone className="size-3.5" /> {d.phone}
                          </span>
                        ))}
                      <a
                        href={mapsUrl(d)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-arctic hover:underline"
                      >
                        <Navigation className="size-3.5" /> Directions
                      </a>
                      {d.website && (
                        <a
                          href={websiteUrl(d.website)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-arctic hover:underline"
                        >
                          <Globe className="size-3.5" /> Website
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
