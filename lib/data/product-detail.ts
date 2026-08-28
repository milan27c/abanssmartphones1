import type { ProductDetail } from "@/lib/types";

// Normalised copies of `2.webp` / `3.webp` beside them: the originals ship on
// an off-white (#F6F5F8) plate, which the tile's multiply blend turns into a
// visible rectangle. These carry the same shots on pure white, so the plate
// disappears into the tile the way the card artwork already does.
import galleryBack from "@/public/images/product1/back-profile.webp";
import galleryCamera from "@/public/images/product1/camera-plateau.webp";
import galleryHero from "@/public/images/products/apple-iphone-17-pro-256gb-deep-blue.jpg";
// Story artwork. `display.png` is a cut-out on transparency, so it sits on the
// panel's own plate.
import storyCamera from "@/public/images/product1/camera.png";
// A copy of `design.jpg` with its tonal range lifted onto the `dark-alt` floor
// (#0A0A0A). The original is shot on pure black, and since this one runs edge
// to edge the 10-level step showed as a hairline across the section.
import storyDesign from "@/public/images/product1/design-plate.jpg";
import storyDisplay from "@/public/images/product1/display.png";

/**
 * The detail record behind every product page.
 *
 * The prototype ships one fully written detail — the iPhone 17 Pro — and every
 * catalogue slug renders against it, so the page can be reviewed at its real
 * depth before 45 spec sheets are typed up. Title, price, brand and tag still
 * come from the `Product` record, so each page reads as its own product from
 * the fold down. When real copy lands, this becomes a map keyed by slug and
 * `getProductDetail` stops falling through.
 */
const sampleDetail: ProductDetail = {
  productCode: "APPIP17PMG8J4XA",
  modelNo: "MG8J4X/A",

  gallery: [
    {
      id: "hero",
      src: galleryHero,
      alt: "iPhone 17 Pro in Deep Blue, shown from the back and front beside its key specifications",
      label: "Front And Back",
    },
    {
      id: "back",
      src: galleryBack,
      alt: "The back and side profile of the iPhone 17 Pro in Deep Blue",
      label: "Back And Profile",
    },
    {
      id: "camera",
      src: galleryCamera,
      alt: "Close-up of the iPhone 17 Pro triple camera plateau",
      label: "Camera Plateau",
    },
  ],

  summary:
    "A19 Pro silicon, a 48MP Fusion camera system with 4x optical zoom, and a 6.3-inch Super Retina XDR display that holds 120Hz all the way to 3,000 nits.",

  keyFeatures: [
    {
      id: "display",
      label: "Display",
      value: "6.3-inch XDR",
      note: "LTPO OLED at 120Hz, 3,000 nits peak",
    },
    {
      id: "chip",
      label: "Processor",
      value: "A19 Pro",
      note: "3 nm hexa-core with a 6-core GPU",
    },
    {
      id: "camera",
      label: "Main Camera",
      value: "Triple 48 MP",
      note: "Wide, ultrawide and 4x periscope",
    },
    {
      id: "memory",
      label: "Memory",
      value: "12 GB · 256 GB",
      note: "NVMe storage, no card slot",
    },
    {
      id: "charging",
      label: "Charging",
      value: "50% In 20 Min",
      note: "PD3.2 wired, 25W MagSafe wireless",
    },
  ],

  stories: [
    {
      id: "camera",
      eyebrow: "Camera",
      title: "Three 48MP Cameras That Behave Like Eight Lenses",
      body: "Wide, ultrawide and a 100mm periscope telephoto all shoot at 48 megapixels, so the in-between focal lengths are cropped from full resolution rather than upscaled. The result is a zoom range that stays sharp from 13mm to 4x optical, with sensor-shift stabilisation on two of the three.",
      image: storyCamera,
      imageAlt:
        "Someone framing a photograph of a friend beside a lake on an iPhone 17 Pro, the shot previewed on screen",
    },
    {
      id: "design",
      eyebrow: "Design",
      title: "Designed From The Inside Out",
      body: "At the core of the new design is a heat-forged aluminium unibody enclosure — one piece of metal carrying the frame, the back and the camera plateau together. It draws heat away from the A19 Pro instead of trapping it, clears room for a larger battery, and leaves the body stiffer than any iPhone before it.",
      image: storyDesign,
      imageAlt:
        "The heat-forged aluminium unibody of the iPhone 17 Pro seen from the side, the camera plateau formed into the same piece of metal",
      tone: "dark",
      // 2.1:1 artwork in a 16:9 frame. Its plate is the section plate, so
      // containing it shows the whole enclosure with no visible letterbox —
      // covering would crop the ends off it.
      fit: "contain",
    },
    {
      id: "display",
      eyebrow: "Display",
      title: "Colour That Holds At Full Brightness",
      body: "Super Retina XDR runs Dolby Vision and HDR10 at 1,000 nits typical, 1,600 in high brightness mode and 3,000 at peak. LTPO drops the refresh rate to save power when nothing on screen is moving, then lifts it back to 120Hz the moment your thumb does.",
      image: storyDisplay,
      imageAlt:
        "An iPhone 17 Pro held in landscape, playing a film across the full Super Retina XDR display",
    },
  ],

  specGroups: [
    {
      id: "model",
      title: "Model",
      rows: [{ label: "Model No", values: ["MG8J4X/A"] }],
    },
    {
      id: "body",
      title: "Body",
      rows: [
        {
          label: "Dimensions",
          values: ["150 x 71.9 x 8.8 mm (5.91 x 2.83 x 0.35 in)"],
        },
        { label: "Weight", values: ["206 g (7.27 oz)"] },
        {
          label: "Build",
          values: [
            "Glass front (Ceramic Shield 2), aluminum alloy frame, aluminum alloy back / glass back (Ceramic Shield)",
          ],
        },
        {
          label: "SIM",
          values: [
            "Nano-SIM + eSIM + eSIM (max 2 at a time; International)",
            "eSIM + eSIM (8 or more, max 2 at a time; USA)",
            "Nano-SIM + Nano-SIM (China)",
          ],
        },
        {
          label: "Other",
          values: [
            "IP68 dust tight and water resistant (immersible up to 6m for 30 min)",
            "Apple Pay (Visa, MasterCard, AMEX certified)",
          ],
        },
      ],
    },
    {
      id: "display",
      title: "Display",
      rows: [
        {
          label: "Type",
          values: [
            "LTPO Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1000 nits (typ), 1600 nits (HBM), 3000 nits (peak)",
          ],
        },
        {
          label: "Size",
          values: ["6.3 inches, 96.4 cm² (~89.4% screen-to-body ratio)"],
        },
        {
          label: "Resolution",
          values: ["1206 x 2622 pixels, 19.5:9 ratio (~460 ppi density)"],
        },
        {
          label: "Protection",
          values: ["Ceramic Shield 2, Mohs level 5", "Anti-reflective coating"],
        },
      ],
    },
    {
      id: "platform",
      title: "Platform",
      rows: [
        { label: "OS", values: ["iOS 26"] },
        { label: "Chipset", values: ["Apple A19 Pro (3 nm)"] },
        { label: "CPU", values: ["Hexa-core (2x4.26 GHz + 4xX.X GHz)"] },
        { label: "GPU", values: ["Apple GPU (6-core graphics)"] },
      ],
    },
    {
      id: "memory",
      title: "Memory",
      rows: [
        { label: "Card Slot", values: ["No"] },
        {
          label: "Internal",
          values: ["256GB 12GB RAM, 512GB 12GB RAM, 1TB 12GB RAM", "NVMe"],
        },
      ],
    },
    {
      id: "main-camera",
      title: "Main Camera",
      rows: [
        {
          label: "Triple",
          values: [
            "48 MP, f/1.8, 24mm (wide), 1/1.28\", 1.22µm, dual pixel PDAF, sensor-shift OIS",
            "48 MP, f/2.8, 100mm (periscope telephoto), 1/2.55\", 0.7µm, PDAF, 3D sensor-shift OIS, 4x optical zoom",
            "48 MP, f/2.2, 13mm, 120˚ (ultrawide), 1/2.55\", 0.7µm, PDAF",
            "TOF 3D LiDAR scanner (depth)",
          ],
        },
        {
          label: "Features",
          values: ["Dual-LED dual-tone flash, HDR (photo/panorama)"],
        },
        {
          label: "Video",
          values: [
            "4K@24/25/30/60/100/120fps, 1080p@25/30/60/120/240fps, 10-bit HDR, Dolby Vision HDR (up to 120fps), ProRes, ProRes RAW (up to 120fps), Apple Log 2, 3D (spatial) video/audio, stereo",
          ],
        },
      ],
    },
    {
      id: "selfie-camera",
      title: "Selfie Camera",
      rows: [
        {
          label: "Single",
          values: [
            "18 MP multi-aspect, f/1.9, 20mm (ultrawide), PDAF",
            "SL 3D (depth / biometrics sensor)",
          ],
        },
        {
          label: "Features",
          values: [
            "HDR, Dolby Vision HDR, 3D (spatial) audio, stereo sound rec., ProRes RAW, Apple Log 2",
          ],
        },
        {
          label: "Video",
          values: ["4K@24/25/30/60fps, 1080p@25/30/60/120fps, gyro-EIS"],
        },
      ],
    },
    {
      id: "sound",
      title: "Sound",
      rows: [
        { label: "Loudspeaker", values: ["Yes, with stereo speakers"] },
        { label: "3.5mm Jack", values: ["No"] },
      ],
    },
    {
      id: "comms",
      title: "Comms",
      rows: [
        {
          label: "WLAN",
          values: ["Wi-Fi 802.11 a/b/g/n/ac/6e/7, tri-band, hotspot"],
        },
        { label: "Bluetooth", values: ["6.0, A2DP, LE"] },
        {
          label: "Positioning",
          values: ["GPS (L1+L5), GLONASS, GALILEO, BDS, QZSS, NavIC"],
        },
        { label: "NFC", values: ["Yes"] },
        { label: "Radio", values: ["No"] },
        { label: "USB", values: ["USB Type-C 3.2 Gen 2, DisplayPort"] },
      ],
    },
    {
      id: "sensors",
      title: "Sensors",
      rows: [
        {
          label: "Sensors",
          values: [
            "Face ID, accelerometer, gyro, proximity, compass, barometer",
            "Ultra Wideband (UWB) support (gen2 chip)",
            "Emergency SOS, Messages and Find My via satellite",
          ],
        },
      ],
    },
    {
      id: "battery",
      title: "Battery",
      rows: [
        {
          label: "Type",
          values: [
            "Market-dependent versions:",
            "Li-Ion 3998 mAh — Nano SIM model",
            "Li-Ion 4252 mAh — eSIM only model",
          ],
        },
        {
          label: "Charging",
          values: [
            "Wired, PD3.2, AVS, 50% in 20 min",
            "25W wireless MagSafe / Qi2, 50% in 30 min (15W — China)",
            "4.5W reverse wired",
          ],
        },
      ],
    },
    {
      id: "misc",
      title: "Misc",
      rows: [
        { label: "Colors", values: ["Silver, Cosmic Orange, Deep Blue"] },
        { label: "SAR", values: ["1.19 W/kg (head), 1.19 W/kg (body)"] },
        { label: "SAR EU", values: ["1.49 W/kg (head), 1.49 W/kg (body)"] },
      ],
    },
    {
      id: "network",
      title: "Network",
      rows: [
        {
          label: "Technology",
          values: ["GSM / CDMA / HSPA / EVDO / LTE / 5G"],
        },
      ],
    },
  ],

  faqs: [
    {
      id: "box",
      question: "What Comes In The Box?",
      answer:
        "The handset, a USB-C to USB-C cable and the documentation pack. Apple has not shipped a wall adapter or headphones with an iPhone since 2020, so pick one up separately if you need it — any USB-C PD adapter of 20W or more will hit the 50% in 20 minutes figure.",
    },
    {
      id: "warranty",
      question: "Is This Covered By Abans Warranty?",
      answer:
        "Yes. Every phone sold here is authorised local stock carrying a one-year Abans warranty, serviced through Abans care centres island-wide. Keep the invoice — it is what the service centre matches against the IMEI.",
    },
    {
      id: "instalments",
      question: "Can I Pay In Instalments?",
      answer:
        "Yes. Any participating bank card runs 0% instalments up to the tenor shown against that bank above, and Abans Tiken Tika Pay, SnapPay and Fintrex Mobile Loan are available if you would rather not use a credit card. The plan is confirmed at checkout on the Abans store.",
    },
    {
      id: "delivery",
      question: "How Long Does Delivery Take?",
      answer:
        "Colombo and suburbs are usually next working day. The rest of the island is two to four working days, and you can also reserve online and collect from any Abans showroom the same day, stock permitting.",
    },
    {
      id: "genuine",
      question: "Is This Genuine Apple Stock?",
      answer:
        "It is. Abans is an authorised dealer, so every unit is TRCSL approved and registered for local network use, with the full Apple serial and IMEI on the box matching the device inside.",
    },
  ],
};

/** Written spec sheets, keyed by slug. One product deep for now. */
const detailBySlug = new Map<string, ProductDetail>([
  ["apple-iphone-17-pro-256gb-deep-blue", sampleDetail],
]);

/**
 * The detail record for a product. Every slug without its own sheet falls
 * through to the sample — see the note above.
 */
export function getProductDetail(slug: string): ProductDetail {
  return detailBySlug.get(slug) ?? sampleDetail;
}
