"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const selector = '.reveal, .reveal-grid';
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
          } else {
            el.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    );

    const observeAll = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
      elements.forEach((el) => observer.observe(el));
    };

    observeAll();

    // Optional: observe DOM changes to catch late-loaded nodes
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={["light", "dark"]}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
