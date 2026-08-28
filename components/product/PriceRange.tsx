"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/cn";
import {
  PRICE_MAX,
  PRICE_MIN,
  PRICE_STEP,
  listingHref,
  type ProductQuery,
} from "@/lib/filters";

interface PriceRangeProps {
  query: ProductQuery;
  /** Namespaces the input ids — the panel renders twice, sidebar and sheet. */
  idPrefix: string;
}

interface Band {
  label: string;
  min: number;
  max: number;
}

const bands: Band[] = [
  { label: "Under LKR 50,000", min: PRICE_MIN, max: 50000 },
  { label: "LKR 50,000 – 100,000", min: 50000, max: 100000 },
  { label: "LKR 100,000 – 200,000", min: 100000, max: 200000 },
  { label: "Over LKR 200,000", min: 200000, max: PRICE_MAX },
];

const group = (value: number) => value.toLocaleString("en-US");
const digitsOnly = (value: string) => value.replace(/[^\d]/g, "");

const percent = (value: number) =>
  ((value - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100;

interface Draft {
  /** The URL bounds this draft was seeded from. */
  key: string;
  range: [number, number];
  /** Held apart from `range` so a half-typed figure is not reformatted mid-keystroke. */
  text: [string, string];
}

function draftFrom(min: number, max: number): Draft {
  return {
    key: `${min}:${max}`,
    range: [min, max],
    text: [group(min), group(max)],
  };
}

export function PriceRange({ query, idPrefix }: PriceRangeProps) {
  const router = useRouter();
  const [draft, setDraft] = useState(() => draftFrom(query.min, query.max));

  // The URL is the source of truth. Re-seed during render — not in an effect —
  // whenever a navigation, a band pill or the back button moves the bounds.
  const urlKey = `${query.min}:${query.max}`;
  if (draft.key !== urlKey) {
    setDraft(draftFrom(query.min, query.max));
  }

  const [low, high] = draft.range;

  const commit = () => {
    const clamp = (value: number) =>
      Math.min(PRICE_MAX, Math.max(PRICE_MIN, value));
    const min = Math.min(clamp(low), clamp(high));
    const max = Math.max(clamp(low), clamp(high));

    setDraft(draftFrom(min, max));
    if (min === query.min && max === query.max) return;

    router.push(listingHref(query, { min, max }), { scroll: false });
  };

  const onSlide = (edge: 0 | 1, value: number) => {
    setDraft((current) => {
      const range: [number, number] = [...current.range];
      // Thumbs never cross; each stops one step short of the other.
      range[edge] =
        edge === 0
          ? Math.min(value, current.range[1] - PRICE_STEP)
          : Math.max(value, current.range[0] + PRICE_STEP);
      return { ...current, range, text: [group(range[0]), group(range[1])] };
    });
  };

  const onType = (edge: 0 | 1, raw: string) => {
    const cleaned = digitsOnly(raw);
    setDraft((current) => {
      const range: [number, number] = [...current.range];
      const text: [string, string] = [...current.text];
      range[edge] = cleaned ? Number(cleaned) : PRICE_MIN;
      text[edge] = cleaned ? group(Number(cleaned)) : "";
      return { ...current, range, text };
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <PriceField
          id={`${idPrefix}-price-min`}
          label="Minimum Price"
          value={draft.text[0]}
          onChange={(raw) => onType(0, raw)}
          onCommit={commit}
        />
        <span aria-hidden="true" className="text-ink-4">
          —
        </span>
        <PriceField
          id={`${idPrefix}-price-max`}
          label="Maximum Price"
          value={draft.text[1]}
          onChange={(raw) => onType(1, raw)}
          onCommit={commit}
        />
      </div>

      <div className="relative mt-7 h-5">
        <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-pill bg-line" />
        <span
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-pill bg-ink-1"
          style={{
            left: `${percent(low)}%`,
            right: `${100 - percent(high)}%`,
          }}
        />

        {([0, 1] as const).map((edge) => (
          <input
            key={edge}
            type="range"
            className="range-input"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={PRICE_STEP}
            value={draft.range[edge]}
            aria-label={edge === 0 ? "Minimum Price" : "Maximum Price"}
            aria-valuetext={`LKR ${group(draft.range[edge])}`}
            onChange={(event) => onSlide(edge, Number(event.target.value))}
            onPointerUp={commit}
            onKeyUp={commit}
            onBlur={commit}
          />
        ))}
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {bands.map((band) => {
          const active = query.min === band.min && query.max === band.max;

          return (
            <li key={band.label}>
              <Link
                href={listingHref(query, { min: band.min, max: band.max })}
                scroll={false}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "inline-flex h-9 items-center rounded-pill border px-4 text-body-sm",
                  "transition-[background-color,border-color,color,transform] transition-fast",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  active
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "border-line-strong text-ink-2 hover:border-ink-1 hover:text-ink-1",
                )}
              >
                {band.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface PriceFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (raw: string) => void;
  onCommit: () => void;
}

function PriceField({ id, label, value, onChange, onCommit }: PriceFieldProps) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onCommit}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
        className={cn(
          "h-11 w-full rounded-md border border-line-strong bg-surface-alt px-4",
          "text-body-sm text-ink-1 tabular-nums",
          "transition-[border-color] transition-fast hover:border-ink-3 focus:border-ink-1",
        )}
      />
    </div>
  );
}
