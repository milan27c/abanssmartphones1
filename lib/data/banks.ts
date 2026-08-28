import type { Bank } from "@/lib/types";

// PNG, not the AVIF originals sitting beside them: Turbopack cannot read AVIF
// dimensions, so a static AVIF import lands as a 100x100 square and squashes
// every logo. The PNGs are lossless conversions of the same artwork.
import cargills from "@/public/images/banks/cargils.png";
import commercial from "@/public/images/banks/commercial.png";
import nationsTrust from "@/public/images/banks/nation-trust.png";
import ndb from "@/public/images/banks/ndb.png";
import peoples from "@/public/images/banks/peoples.png";
import sampath from "@/public/images/banks/sampath.png";
import seylan from "@/public/images/banks/seylan.png";

/**
 * Every card partner running instalment plans on Abans stock, longest headline
 * tenor first — a shopper scans for the biggest number.
 *
 * The short tenors are interest-free; the long ones carry the bank's own
 * handling charge, which is why the plan dialog quotes a total as well as a
 * monthly figure. Only Commercial Bank's card-centre number is confirmed —
 * the rest are placeholders to be replaced with each bank's published line.
 */
export const banks: Bank[] = [
  {
    id: "commercial",
    name: "Commercial Bank",
    fullName: "Commercial Bank of Ceylon",
    logo: commercial,
    hotline: { label: "011 2486 486", href: "tel:+94112486486" },
    plans: [
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 0 },
      { months: 36, feePercent: 0 },
      { months: 48, feePercent: 1.5 },
      { months: 60, feePercent: 3 },
    ],
  },
  {
    id: "sampath",
    name: "Sampath Cards",
    fullName: "Sampath Bank",
    logo: sampath,
    hotline: { label: "011 2303 050", href: "tel:+94112303050" },
    plans: [
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 0 },
      { months: 36, feePercent: 0 },
      { months: 48, feePercent: 1.5 },
      { months: 60, feePercent: 3 },
    ],
  },
  {
    id: "ndb",
    name: "NDB Bank",
    fullName: "National Development Bank",
    logo: ndb,
    hotline: { label: "011 2448 448", href: "tel:+94112448448" },
    plans: [
      { months: 6, feePercent: 0 },
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 0 },
      { months: 36, feePercent: 1 },
      { months: 48, feePercent: 2.5 },
    ],
  },
  {
    id: "nations-trust",
    name: "Nations Trust Bank",
    fullName: "Nations Trust Bank",
    logo: nationsTrust,
    hotline: { label: "011 4711 411", href: "tel:+94114711411" },
    plans: [
      { months: 6, feePercent: 0 },
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 0 },
      { months: 36, feePercent: 1 },
      { months: 48, feePercent: 2.5 },
    ],
  },
  {
    id: "seylan",
    name: "Seylan Bank",
    fullName: "Seylan Bank",
    logo: seylan,
    hotline: { label: "011 2008 888", href: "tel:+94112008888" },
    plans: [
      { months: 6, feePercent: 0 },
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 1 },
      { months: 36, feePercent: 2 },
    ],
  },
  {
    id: "peoples",
    name: "People's Bank",
    fullName: "People's Bank",
    logo: peoples,
    hotline: { label: "011 2481 481", href: "tel:+94112481481" },
    plans: [
      { months: 6, feePercent: 0 },
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 1 },
      { months: 36, feePercent: 2 },
    ],
  },
  {
    id: "cargills",
    name: "Cargills Bank",
    fullName: "Cargills Bank",
    logo: cargills,
    hotline: { label: "011 7640 000", href: "tel:+94117640000" },
    plans: [
      { months: 3, feePercent: 0 },
      { months: 6, feePercent: 0 },
      { months: 12, feePercent: 0 },
      { months: 24, feePercent: 1.5 },
    ],
  },
];

/** The plan a bank's card advertises — its longest tenor. */
export function headlinePlan(bank: Bank) {
  return bank.plans[bank.plans.length - 1];
}
