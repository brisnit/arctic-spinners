"use client";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-icons";

import { ArrowRight, Phone, User } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { nav, site } from "@/lib/site";

export function MobileNav({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[88%] max-w-sm gap-0 bg-white p-0">
        <div className="border-b border-border px-6 pt-6 pb-5">
          <SheetTitle className="eyebrow text-arctic">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </div>
        <nav aria-label="Mobile" className="flex flex-col px-3 py-4">
          <Link href="/" onClick={close} className="display rounded-md px-3 py-2.5 text-3xl text-navy hover:bg-ice">
            Home
          </Link>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="display flex items-center justify-between rounded-md px-3 py-2.5 text-3xl text-navy hover:bg-ice"
            >
              {item.label}
              <ArrowRight className="size-5 text-arctic" />
            </Link>
          ))}
          <Link href="/contact" onClick={close} className="display rounded-md px-3 py-2.5 text-3xl text-navy hover:bg-ice">
            Contact
          </Link>
        </nav>
        <div className="mt-auto space-y-3 border-t border-border bg-ice px-6 py-6 text-sm">
          <Link href="/account" onClick={close} className="flex items-center gap-2 font-medium text-navy">
            <User className="size-4" /> Account
          </Link>
          <a href={site.phoneHref} className="flex items-center gap-2 font-medium text-navy">
            <Phone className="size-4" /> {site.phone}
          </a>
          <div className="flex gap-3 pt-1">
            <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-navy hover:text-arctic">
              <FacebookIcon className="size-5" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-navy hover:text-arctic">
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
