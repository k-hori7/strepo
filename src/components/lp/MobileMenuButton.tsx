"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

type MobileMenuButtonProps = {
  navItems: { label: string; href: string }[];
  ctaText: string;
  ctaHref: string;
}

export function MobileMenuButton({
  navItems,
  ctaText,
  ctaHref,
}: MobileMenuButtonProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  const isInternalPage = (href: string) =>
    href.startsWith("/") && !href.startsWith("/#");

  return (
    <div className="md:hidden" ref={menuRef}>
      <button
        className="text-slate-600"
        aria-label={mobileOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {mobileOpen && (
        <nav className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 px-8 pb-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {isInternalPage(ctaHref) ? (
            <Link
              href={ctaHref}
              className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm text-center hover:bg-teal-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {ctaText}
            </Link>
          ) : (
            <a
              href={ctaHref}
              className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm text-center hover:bg-teal-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {ctaText}
            </a>
          )}
        </nav>
      )}
    </div>
  );
}
