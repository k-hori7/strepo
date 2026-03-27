import Link from "next/link";

export type LogoProps = {
  size?: "sm" | "md";
}

export function Logo({ size = "md" }: LogoProps) {
  const textClass =
    size === "sm"
      ? "font-black text-xl tracking-tight text-slate-950"
      : "font-black text-2xl tracking-tight text-slate-950";

  return (
    <Link href="/" className={textClass}>
      Stre<span className="text-teal-600">-Po</span>
    </Link>
  );
}
