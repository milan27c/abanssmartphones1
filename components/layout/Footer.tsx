import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";

import { Container } from "@/components/layout/Container";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/ui/Icons";
import {
  footerColumns,
  footerContact,
  footerLegal,
  socialLinks,
} from "@/lib/data/nav";
import type { FooterContactItem, SocialLink } from "@/lib/types";

import logoFooter from "@/public/images/logofooter.png";

const socialIcons: Record<
  SocialLink["icon"],
  ComponentType<{ className?: string }>
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
};

const contactIcons: Record<
  FooterContactItem["icon"],
  ComponentType<{ className?: string }>
> = {
  phone: PhoneIcon,
  mail: MailIcon,
  address: MapPinIcon,
  sites: GlobeIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-alt text-on-dark-2">
      <Container className="pt-section-sm pb-12">
        {/* Brand column + link columns. Everything stays centred while the
            footer is a single stack, and returns to the left once the columns
            sit side by side at lg. */}
        <div className="grid gap-12 text-center lg:grid-cols-12 lg:gap-8 lg:text-left">
          <div className="lg:col-span-4 lg:pr-10">
            <Image
              src={logoFooter}
              alt="Abans Smartphones"
              placeholder="blur"
              className="mx-auto h-10 w-auto lg:mx-0"
              sizes="160px"
            />
            <p className="mx-auto mt-7 max-w-[42ch] text-body-sm text-on-dark-2 lg:mx-0">
              Abans Smartphones brings you unmatched confidence and convenience
              in owning world-renowned smartphone brands. Enjoy authentic
              devices at the best prices, backed by a trusted warranty and
              exceptional after-sales support.
            </p>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex size-10 items-center justify-center rounded-pill text-on-dark-3 transition-colors transition-fast hover:bg-white/10 hover:text-white"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:col-span-8 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-body-sm text-on-dark-1">{column.title}</h2>
                <ul className="mt-5 flex flex-col gap-3 lg:mt-6 lg:gap-4">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-body-sm text-on-dark-2 transition-colors transition-fast hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact rail. Auto-width items with the space distributed between
            them, so the gaps read even however long each value runs. */}
        <div className="mt-16 grid gap-8 border-t border-on-dark-line pt-10 text-center sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-between lg:gap-x-12 lg:gap-y-8 lg:text-left">
          {footerContact.map((item) => {
            const Icon = contactIcons[item.icon];
            return (
              <div
                key={item.label}
                // Stacked while the rail is centred; back to icon-beside-value
                // once it runs as a left-aligned row at lg.
                className="flex flex-col items-center gap-2 lg:flex-row lg:items-start lg:justify-start lg:gap-3"
              >
                <Icon className="size-4 shrink-0 text-on-dark-3 lg:mt-0.5" />
                <div>
                  <p className="text-label uppercase text-on-dark-3">
                    {item.label}
                  </p>
                  <ul className="mt-1.5 flex flex-col gap-1">
                    {item.lines.map((line) => (
                      <li key={line.text} className="text-body-sm text-on-dark-1">
                        {line.href ? (
                          <a
                            href={line.href}
                            target={
                              line.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              line.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="link-underline transition-colors transition-fast hover:text-white"
                          >
                            {line.text}
                          </a>
                        ) : (
                          line.text
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Legal bar — the hairline runs the full width, as in the reference. */}
      <div className="border-t border-on-dark-line">
        <Container className="flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-body-sm text-on-dark-3">
            &copy; {year} Abans PLC. All Rights Reserved. Powered By{" "}
            <a
              href="https://www.azbow.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline transition-colors transition-fast hover:text-white"
            >
              Azbow
            </a>
            .
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              {footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-body-sm text-on-dark-3 transition-colors transition-fast hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
