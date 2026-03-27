import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "Stre-Po | ストレスチェックを名簿レスで",
  description:
    "医師と企業の負担を最小限にする、最短のストレスチェックツール。面倒な従業員名簿のインポートは不要です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-noto-sans-jp">
        {children}
      </body>
    </html>
  );
}
