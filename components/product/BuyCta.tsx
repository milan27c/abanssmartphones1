import Link from "next/link";

import { Button } from "@/components/ui/Button";
import {
  ExternalLinkIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { contactChannels } from "@/lib/data/nav";
import { productSectionIds } from "@/lib/data/product-sections";

export interface BuyCtaProps {
  /** Outbound handoff to the Abans storefront. */
  buyUrl: string;
  /** Seeds the WhatsApp message so the agent knows what is being asked about. */
  productTitle: string;
  inStock: boolean;
  className?: string;
  /** Anchor id — the sub-nav watches this to know when the fold CTA is gone. */
  id?: string;
}

/**
 * The purchase block. Buying happens on the Abans storefront, so the primary
 * action leaves the site — the two channel buttons under it are what keep a
 * shopper here when they have a question first: WhatsApp for an instant reply,
 * or a jump down to the inquiry form to ask for a call back.
 */
export function BuyCta({
  buyUrl,
  productTitle,
  inStock,
  className,
  id,
}: BuyCtaProps) {
  const whatsAppHref = `https://wa.me/${contactChannels.whatsapp.number}?text=${encodeURIComponent(
    `Hi Abans, I'd like to know more about the ${productTitle}.`,
  )}`;

  return (
    <div id={id} className={cn("flex flex-col gap-3", className)}>
      {inStock ? (
        <Button href={buyUrl} external size="lg" className="w-full">
          Buy Now
          <ExternalLinkIcon className="size-4" />
          <span className="sr-only">— opens the Abans store in a new tab</span>
        </Button>
      ) : (
        <Button disabled size="lg" className="w-full">
          Out Of Stock
        </Button>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Button href={whatsAppHref} external variant="whatsapp" size="lg">
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </Button>

        <Button
          href={`#${productSectionIds.inquiry}`}
          variant="secondary"
          size="lg"
        >
          <PhoneIcon className="size-5" />
          Get A Call
        </Button>
      </div>

      <p className="mt-3 flex flex-wrap items-center gap-2 text-body-sm text-ink-3">
        <MapPinIcon className="size-4 shrink-0 text-ink-4" />
        Please find your nearest
        <Link
          href={contactChannels.storeLocator}
          className="rounded-pill bg-primary-50 px-3 py-1 font-medium text-primary-600 transition-colors transition-fast hover:bg-primary-100"
        >
          Showroom
        </Link>
      </p>
    </div>
  );
}
