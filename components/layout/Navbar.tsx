"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { IconButton } from "@/components/ui/IconButton";
import { MenuIcon, SearchIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { primaryNav } from "@/lib/data/nav";

import logo from "@/public/images/logo.png";

/** Past this many pixels the bar condenses and picks up its blur plate. */
const CONDENSE_AT = 24;

/**
 * A nav item is active when the current path sits under its href *and* every
 * query pair the href pins is present. That lets `Smartphones`, `Accessories`
 * and `Offers` all point at `/products` yet light up one at a time.
 */
function isNavActive(
  href: string,
  pathname: string,
  params: URLSearchParams | null,
): boolean {
  if (href === "/") return pathname === "/";
  if (/^https?:\/\//.test(href)) return false;

  const [path, query] = href.split("?");
  if (!pathname.startsWith(path)) return false;
  if (!query) return true;
  if (!params) return false;

  const wanted = new URLSearchParams(query);
  for (const [key, value] of wanted) {
    if (params.get(key) !== value) return false;
  }
  return true;
}

interface NavLinksProps {
  pathname: string;
  params: URLSearchParams | null;
}

function NavLinks({ pathname, params }: NavLinksProps) {
  return (
    <ul className="flex items-center gap-8">
      {primaryNav.map((link) => {
        const active = isNavActive(link.href, pathname, params);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={cn(
                "link-underline text-body-sm transition-colors transition-fast",
                active ? "text-primary-600" : "text-ink-2 hover:text-ink-1",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Split out so `useSearchParams` sits behind its own Suspense boundary. */
function NavLinksWithParams({ pathname }: { pathname: string }) {
  const params = useSearchParams();
  return <NavLinks pathname={pathname} params={params} />;
}

export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > CONDENSE_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          "transition-[background-color,border-color,backdrop-filter] transition-base",
          condensed
            ? "border-b border-line bg-page/72 backdrop-blur-[20px]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between",
            "transition-[height] transition-base",
            condensed ? "h-14" : "h-14 lg:h-16",
          )}
        >
          <Link
            href="/"
            aria-label="Abans Smartphones — Home"
            className="shrink-0"
          >
            <Image
              src={logo}
              alt="Abans Smartphones"
              priority
              placeholder="blur"
              className="h-7 w-auto lg:h-8"
              sizes="150px"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <Suspense fallback={<NavLinks pathname={pathname} params={null} />}>
              <NavLinksWithParams pathname={pathname} />
            </Suspense>
          </nav>

          <div className="flex items-center gap-1">
            <IconButton label="Search">
              <SearchIcon className="size-5" />
            </IconButton>
            <IconButton
              label="Open Menu"
              className="lg:hidden"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon className="size-6" />
            </IconButton>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
