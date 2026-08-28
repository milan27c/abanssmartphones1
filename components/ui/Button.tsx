import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "on-dark-outline"
  | "on-dark-solid"
  | "whatsapp";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  /** Renders a link instead of a button. */
  href?: string;
  /** Opens the link in a new tab with the safe rel pair. */
  external?: boolean;
}

export type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>;

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,transform] transition-fast " +
  "disabled:pointer-events-none disabled:scale-100 " +
  "disabled:bg-line disabled:text-ink-4 disabled:border-transparent";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] active:bg-primary-800",
  secondary:
    "border border-line-strong text-ink-1 hover:border-ink-1 hover:bg-surface hover:scale-[1.02] active:scale-[0.98] active:bg-line",
  // A bare text action: no plate at any state, so the only hover is the colour
  // deepening and the arrow nudging (`group` drives the icon).
  tertiary: "group text-primary-600 hover:text-primary-700 active:text-primary-800",
  "on-dark-outline":
    "border border-white/40 text-white hover:border-white hover:bg-white/12 hover:scale-[1.02] active:scale-[0.98] active:bg-white/20",
  "on-dark-solid":
    "bg-white text-ink-1 hover:bg-surface hover:scale-[1.02] active:scale-[0.98] active:bg-line",
  // The palette's one sanctioned exception: a channel button wears its own
  // brand colour. See the token note in `globals.css`.
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-hover hover:scale-[1.02] active:scale-[0.98] active:bg-whatsapp-active",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-body-sm",
  md: "h-12 px-7 text-body",
  lg: "h-14 px-9 text-body",
};

/** Tertiary has no plate to fill, so it drops the horizontal padding and sits
    flush with the text it aligns to. */
const tertiarySizes: Record<ButtonSize, string> = {
  sm: "h-10 text-body-sm",
  md: "h-12 text-body",
  lg: "h-14 text-body",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  external = false,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    variant === "tertiary" ? tertiarySizes[size] : sizes[size],
    className,
  );

  if (href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
