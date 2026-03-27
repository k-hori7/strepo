export const LP_NAV_ITEMS = [
  { label: "機能", href: "#features" },
  { label: "利用の流れ", href: "#workflow" },
  { label: "料金", href: "#pricing" },
];

export const LP_NAV_ITEMS_ABSOLUTE = LP_NAV_ITEMS.map((item) => ({
  ...item,
  href: `/${item.href}`,
}));
