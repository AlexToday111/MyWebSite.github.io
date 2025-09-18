import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Inter, Manrope } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", weight: ["200","300","400","500","600","700","800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Портфолио",
    template: "%s | Портфолио",
  },
  description: "Минималистичное портфолио фронтенд-разработчика",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B0F14" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <a href="#content" className="skip-link">Пропустить к контенту</a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


