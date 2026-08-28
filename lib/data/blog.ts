import type { BlogPost } from "@/lib/types";

import cover1 from "@/public/images/blogs/1.png";
import cover2 from "@/public/images/blogs/2.png";
import cover3 from "@/public/images/blogs/3.png";

export const blogPosts: BlogPost[] = [
  {
    slug: "meet-the-new-faces-of-the-oppo-family",
    title: "Meet The New Faces Of The Oppo Family",
    category: "New Arrivals",
    date: "2026-08-12",
    excerpt:
      "Four new handsets land at Abans this month — the Reno15, Reno15F, A6 and A6X. Here is how the line-up splits, and which one suits you.",
    cover: cover1,
    coverAlt:
      "The OPPO Reno15, Reno15F, A6 and A6X shown side by side on a dark green backdrop",
    readingMinutes: 5,
  },
  {
    slug: "realme-and-abans-join-forces",
    title:
      "realme And Abans Join Forces To Spark a Smart Revolution In Sri Lanka",
    category: "Partnerships",
    date: "2026-07-29",
    excerpt:
      "A new smartphone line-up was unveiled in Colombo as realme and Abans announced an island-wide retail partnership.",
    cover: cover2,
    coverAlt:
      "realme and Abans executives on stage at the partnership launch event in Colombo",
    readingMinutes: 4,
  },
  {
    slug: "real-power-up-realme-at-abans",
    title: "Real ඔබව Power-Up කරගන්න - Abans වෙතින් realme එකක් මිලට ගන්න!",
    category: "Offers",
    date: "2026-07-15",
    excerpt:
      "Pick up any realme handset at Abans and power up your everyday — with instalment plans, warranty cover and island-wide delivery included.",
    cover: cover3,
    coverAlt: "realme promotional artwork for the Abans Power-Up campaign",
    readingMinutes: 3,
  },
];
