import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type IconButtonTone = "light" | "dark";

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Always required — these buttons never carry a visible label. */
  label: string;
  children: ReactNode;
  tone?: IconButtonTone;
  className?: string;
}

const tones: Record<IconButtonTone, string> = {
  light: "text-ink-1 hover:bg-surface active:bg-line",
  dark: "text-white hover:bg-white/12 active:bg-white/20",
};

export function IconButton({
  label,
  children,
  tone = "light",
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-pill",
        "transition-[background-color,color,transform] transition-fast",
        "hover:scale-[1.02] active:scale-[0.98]",
        "disabled:pointer-events-none disabled:text-ink-4",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
