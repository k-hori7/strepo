import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

type FooterLinkGroup = {
  title: string;
  links: { label: string; href: string }[];
}

export type FooterProps = {
  description?: string;
  linkGroups?: FooterLinkGroup[];
  copyright?: string;
}

const defaultLinkGroups: FooterLinkGroup[] = [
  {
    title: "プロダクト",
    links: [
      { label: "機能", href: "#features" },
      { label: "料金", href: "#pricing" },
      { label: "利用の流れ", href: "#workflow" },
    ],
  },
  {
    title: "法的情報",
    links: [
      { label: "利用規約", href: "/terms" },
      { label: "プライバシーポリシー", href: "/privacy" },
      { label: "特定商取引法に基づく表記", href: "/legal" },
    ],
  },
];

export function Footer({
  description = "医師と企業の負担を最小限にする、\n新しいストレスチェックツール。",
  linkGroups = defaultLinkGroups,
  copyright = `© ${new Date().getFullYear()} Stre-Po. All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-6 px-6 md:px-20">
      <div className="max-w-[1280px] mx-auto px-0 md:px-8">
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          {/* Brand */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <Logo size="sm" />
            <p className="text-sm text-slate-500 font-light max-w-xs whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {group.title}
                </h4>
                <div className="flex flex-col gap-2.5">
                  {group.links.map((link) =>
                    link.href.startsWith("/") ? (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-400 font-light">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
