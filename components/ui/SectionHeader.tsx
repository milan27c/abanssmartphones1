import { Button, type ButtonVariant } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  title: string;
  /** Lets the wrapping <section> point aria-labelledby at this heading. */
  titleId?: string;
  /** One line, sentence case. */
  sub?: string;
  action?: { label: string; href: string };
  /** Extra classes on the action button — e.g. to hide it below `sm`. */
  actionClassName?: string;
  /**
   * Overrides the action button's variant. Defaults to a bare text link
   * (`tertiary`, or `on-dark-outline` on dark). Set `secondary` for the
   * outline pill used by the Best Selling sections.
   */
  actionVariant?: ButtonVariant;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
  /** Extra classes on the heading itself — e.g. to lift the centred width cap. */
  titleClassName?: string;
  /** Heading level, so each page keeps a sane outline. */
  as?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  title,
  titleId,
  sub,
  action,
  actionClassName,
  actionVariant,
  tone = "light",
  align = "start",
  className,
  titleClassName,
  as: Heading = "h2",
}: SectionHeaderProps) {
  const dark = tone === "dark";

  return (
    // Phones read a section header as a title card: centred, with the action
    // directly under it. From `sm` the row splits left/right again.
    <div
      className={cn(
        "flex flex-col items-center gap-6 text-center",
        "sm:flex-row sm:items-end sm:justify-between sm:text-left",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-[46ch] sm:mx-0",
          align === "center" && "sm:mx-auto sm:text-center",
        )}
      >
        <Heading
          id={titleId}
          className={cn(
            "text-h2",
            dark ? "text-white" : "text-ink-1",
            align === "center" && "max-w-[20ch] sm:mx-auto",
            titleClassName,
          )}
        >
          {title}
        </Heading>

        {sub ? (
          <p
            className={cn(
              "mx-auto mt-4 max-w-[65ch] text-body-lg sm:mx-0",
              dark ? "text-on-dark-2" : "text-ink-3",
            )}
          >
            {sub}
          </p>
        ) : null}
      </div>

      {action ? (
        <Button
          href={action.href}
          variant={actionVariant ?? (dark ? "on-dark-outline" : "tertiary")}
          size="sm"
          className={cn("group self-center sm:self-auto", actionClassName)}
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition-transform transition-fast group-hover:translate-x-0.5" />
        </Button>
      ) : null}
    </div>
  );
}
