"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface HeaderProps {
  logoText?: string;
  ctaText?: string;
  ctaHref?: string;
  navItems?: { label: string; href: string }[];
}

const defaultNavItems = [
  { label: "機能", href: "#features" },
  { label: "利用の流れ", href: "#workflow" },
  { label: "料金", href: "#pricing" },
];

export function Header({
  logoText,
  ctaText = "無料で始める (医師用)",
  ctaHref = "#pricing",
  navItems = defaultNavItems,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-8 md:px-20">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-black text-2xl tracking-tight text-slate-950"
          >
            {logoText ?? (
              <>
                Stre<span className="text-teal-600">-Po</span>
              </>
            )}
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm hover:bg-teal-700 transition-colors"
            >
              {ctaText}
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-600"
            aria-label="メニューを開く"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm text-center hover:bg-teal-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {ctaText}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
