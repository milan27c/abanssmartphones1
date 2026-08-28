import type { Brand } from "@/lib/types";

import apple from "@/public/images/brands/apple.png";
import infinix from "@/public/images/brands/infinix.png";
import itel from "@/public/images/brands/itel.png";
import jbl from "@/public/images/brands/jbl.png";
import mibro from "@/public/images/brands/mibro.png";
import motorola from "@/public/images/brands/motorola.png";
import oppo from "@/public/images/brands/oppo.png";
import realme from "@/public/images/brands/realme.png";
import redmi from "@/public/images/brands/redmi.png";
import sudio from "@/public/images/brands/sudio.png";
import tecno from "@/public/images/brands/tecno.png";
import vivo from "@/public/images/brands/vivo.png";

/** Grid order is deliberate: 6 x 2 on desktop, 2 x 6 on mobile. */
export const brands: Brand[] = [
  { slug: "apple", name: "Apple", logo: apple },
  { slug: "redmi", name: "Redmi", logo: redmi },
  { slug: "motorola", name: "Motorola", logo: motorola },
  { slug: "oppo", name: "OPPO", logo: oppo },
  { slug: "vivo", name: "vivo", logo: vivo },
  { slug: "realme", name: "realme", logo: realme },
  { slug: "itel", name: "itel", logo: itel },
  { slug: "tecno", name: "TECNO", logo: tecno },
  { slug: "infinix", name: "Infinix", logo: infinix },
  { slug: "jbl", name: "JBL", logo: jbl },
  { slug: "sudio", name: "Sudio", logo: sudio },
  { slug: "mibro", name: "Mibro", logo: mibro },
];

export const brandName: Record<Brand["slug"], string> = Object.fromEntries(
  brands.map((brand) => [brand.slug, brand.name]),
) as Record<Brand["slug"], string>;
