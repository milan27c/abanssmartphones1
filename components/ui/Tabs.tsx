"use client";

import { useRef } from "react";

import { pillClasses } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** Names the tablist for screen readers. */
  label: string;
  className?: string;
}

/** Pill tabs with roving arrow-key navigation. */
export function Tabs({ items, value, onChange, label, className }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const next = (index + items.length) % items.length;
    onChange(items[next].id);
    const buttons =
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      className={cn("no-scrollbar flex gap-2 overflow-x-auto", className)}
      onKeyDown={(event) => {
        const current = items.findIndex((item) => item.id === value);
        if (event.key === "ArrowRight") {
          event.preventDefault();
          focusTab(current + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          focusTab(current - 1);
        } else if (event.key === "Home") {
          event.preventDefault();
          focusTab(0);
        } else if (event.key === "End") {
          event.preventDefault();
          focusTab(items.length - 1);
        }
      }}
    >
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={pillClasses(active)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
