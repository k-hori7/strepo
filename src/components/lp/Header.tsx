import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { LP_NAV_ITEMS } from "@/constants/navigation";
import { MobileMenuButton } from "./MobileMenuButton";

export type HeaderProps = {
  logoText?: string;
  ctaText?: string;
  ctaHref?: string;
  navItems?: { label: string; href: string }[];
}

export function Header({
  logoText,
  ctaText = "無料で始める (医師用)",
  ctaHref = "#pricing",
  navItems = LP_NAV_ITEMS,
}: HeaderProps) {
  const isInternalPage = (href: string) =>
    href.startsWith("/") && !href.startsWith("/#");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-8 md:px-20">
        <div className="flex items-center justify-between h-16">
          {logoText ? (
            <span className="font-black text-2xl tracking-tight text-slate-950">
              {logoText}
            </span>
          ) : (
            <Logo />
          )}

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
            {isInternalPage(ctaHref) ? (
              <Link
                href={ctaHref}
                className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm hover:bg-teal-700 transition-colors"
              >
                {ctaText}
              </Link>
            ) : (
              <a
                href={ctaHref}
                className="bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-md shadow-sm hover:bg-teal-700 transition-colors"
              >
                {ctaText}
              </a>
            )}
          </nav>

          {/* Mobile toggle + menu */}
          <MobileMenuButton
            navItems={navItems}
            ctaText={ctaText}
            ctaHref={ctaHref}
          />
        </div>
      </div>
    </header>
  );
}
