import Link from "next/link";

export interface Crumb {
  label: string;
  /** Omitted on the last crumb, which is the current page. */
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm">
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="link-underline text-ink-3 transition-colors transition-fast hover:text-ink-1"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-ink-1">
                  {item.label}
                </span>
              )}

              {last ? null : (
                <span aria-hidden="true" className="text-ink-4">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
