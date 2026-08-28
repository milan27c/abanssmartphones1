"use client";

import { useState } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/ui/Icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SpecGroup } from "@/lib/types";

export interface SpecTableProps {
  groups: SpecGroup[];
  id?: string;
}

/** Enough to answer the common questions before the table has to be opened. */
const COLLAPSED_GROUPS = 4;

/**
 * The full sheet. Group titles hold the left rail; the rows are hairlines
 * only — no zebra, no boxes.
 */
export function SpecTable({ groups, id }: SpecTableProps) {
  const [expanded, setExpanded] = useState(false);

  const collapsible = groups.length > COLLAPSED_GROUPS;
  const visible =
    expanded || !collapsible ? groups : groups.slice(0, COLLAPSED_GROUPS);

  return (
    <Section
      id={id}
      tone="surface"
      aria-labelledby="specs-title"
      className="scroll-anchor"
    >
      <Container>
        <SectionHeader
          titleId="specs-title"
          title="Full Specifications"
          align="center"
        />

        <div className="relative mt-12">
          <div id="specs-table">
            {visible.map((group, index) => (
              <div
                key={group.id}
                className={
                  index === 0
                    ? "grid gap-4 pb-10 lg:grid-cols-[16rem_1fr] lg:gap-12"
                    : "grid gap-4 border-t border-line-strong py-10 lg:grid-cols-[16rem_1fr] lg:gap-12"
                }
              >
                <h3 className="text-h3 text-ink-1">{group.title}</h3>

                <dl className="min-w-0">
                  {group.rows.map((row, rowIndex) => (
                    <div
                      key={row.label}
                      className={
                        rowIndex === group.rows.length - 1
                          ? "grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                          : "grid gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                      }
                    >
                      <dt className="text-body-sm text-ink-3">{row.label}</dt>
                      <dd className="min-w-0 text-body-sm text-ink-1">
                        {row.values.map((value) => (
                          <span key={value} className="block">
                            {value}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {collapsible && !expanded ? (
            <div
              aria-hidden="true"
              className="spec-veil pointer-events-none absolute inset-x-0 bottom-0 h-40"
            />
          ) : null}
        </div>

        {collapsible ? (
          <div className="mt-4 flex justify-center">
            <Button
              variant="secondary"
              aria-expanded={expanded}
              aria-controls="specs-table"
              onClick={() => setExpanded((open) => !open)}
            >
              {expanded ? "Show Fewer Specifications" : "Show All Specifications"}
              {expanded ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
