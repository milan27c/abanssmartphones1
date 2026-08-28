import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The route indicator defaults to bottom-left, which sits directly on top
  // of the mobile CTA stack (WhatsApp/Buy Now/Contact) on every page — it
  // reads as a layout bug in mobile QA, so it's off. Compile/runtime errors
  // still surface normally.
  devIndicators: false,
};

export default nextConfig;
