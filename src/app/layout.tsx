import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/shared/motion-provider";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Arctic Spinners — Hand-Assembled Fishing Lures Since 1967",
    template: "%s | Arctic Spinners",
  },
  description: site.description,
  keywords: [
    "Arctic Spinner",
    "in-line spinner",
    "fishing lures",
    "steelhead spinner",
    "salmon lure",
    "trout spinner",
    "glow spinner",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Arctic Spinners — The Legend Lives On",
    description: site.description,
    images: [{ url: "/images/lifestyle/river-cast-placeholder.jpg", width: 2000, height: 1500 }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#087EBD",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col bg-white">
        <a
          href="#main"
          className="sr-only z-[60] rounded-md bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <CartDrawer />
        </MotionProvider>
      </body>
    </html>
  );
}
