import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Inter, Manrope, Unbounded } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const bebas = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "800"],
  variable: "--font-bebas",
});
const iconPath = `${(process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "")}/favicon.png`;

const gendy = localFont({
  src: [{ path: "../public/fonts/Gendy.otf", weight: "400", style: "normal" }],
  variable: "--font-gendy",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "ba6kir — Java Backend",
    template: "%s | ba6kir",
  },
  description:
    "Персональный сайт портфолио: Java Backend (Spring, PostgreSQL, Docker)",
  icons: {
    icon: [{ url: iconPath, type: "image/png" }],
    shortcut: [iconPath],
    apple: [{ url: iconPath, type: "image/png" }],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B0F14" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
  viewport: { width: "device-width", initialScale: 1 },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${gendy.className} ${gendy.variable}`}>
        <a href="#content" className="skip-link">
          Сразу к контенту
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
