"use client";

import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/shared/logo";
import { cart, useCart } from "@/lib/cart-store";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { SearchDialog } from "./search-dialog";

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard shortcut: "/" opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key === "/" && !(t && (t.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(t.tagName)))) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (href.includes("#")) return false;
    return base === "/" ? pathname === "/" : pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300 supports-[backdrop-filter]:bg-white/80",
        scrolled ? "border-border shadow-[0_6px_24px_-12px_rgba(16,43,63,0.18)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center gap-2 sm:h-[4.5rem]">
        <div className="flex flex-1 items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-ml-2 inline-flex size-10 items-center justify-center rounded-md text-navy hover:bg-ice"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex size-10 items-center justify-center rounded-md text-navy hover:bg-ice sm:hidden"
            aria-label="Search lures"
          >
            <Search className="size-5" />
          </button>
        </div>

        <Logo priority className="lg:mr-8" />

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-[0.8125rem] font-semibold tracking-wide text-navy/80 transition-colors hover:text-arctic",
                isActive(item.href) && "text-navy",
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-arctic"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-0.5 lg:flex-none">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden h-10 items-center gap-2 rounded-full border border-border bg-ice/60 pr-3 pl-3.5 text-sm text-muted-foreground transition-colors hover:border-arctic/40 hover:text-navy sm:inline-flex lg:mr-1"
            aria-label="Search lures"
          >
            <Search className="size-4" />
            <span className="hidden xl:inline">Search lures</span>
            <kbd className="hidden rounded border border-border bg-white px-1.5 text-[0.65rem] font-medium xl:inline">/</kbd>
          </button>
          <Link
            href="/account"
            className="hidden size-10 items-center justify-center rounded-md text-navy hover:bg-ice sm:inline-flex"
            aria-label="Account"
          >
            <User className="size-5" />
          </Link>
          <button
            type="button"
            onClick={() => cart.open()}
            className="relative -mr-2 inline-flex size-10 items-center justify-center rounded-md text-navy hover:bg-ice"
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="size-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute top-0.5 right-0.5 flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-signal px-1 text-[0.65rem] font-bold text-white tabular-nums"
                >
                  {count > 99 ? "99+" : count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
