/**
 * Inline stroke icons on a 24-unit grid, sized by the caller.
 * Grouped in one file by convention — they are glyphs, not components with
 * behaviour of their own.
 */
interface IconProps {
  className?: string;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Svg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...stroke}>
      {children}
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" />
    </Svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 8h16M4 16h16" />
    </Svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14.5 6 8.5 12l6 6" />
    </Svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m9.5 6 6 6-6 6" />
    </Svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9.75 5.5v13M14.25 5.5v13" />
    </Svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8.5 5.6v12.8L18.5 12 8.5 5.6Z" />
    </Svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4.5 12h15M14 6.5l5.5 5.5L14 17.5" />
    </Svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3.5 5 6.2v5c0 4.3 2.9 8 7 9.3 4.1-1.3 7-5 7-9.3v-5L12 3.5Z" />
      <path d="m9 11.8 2.1 2.1L15 10" />
    </Svg>
  );
}

export function BadgeCheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m12 3.2 2.2 1.9 2.9-.3.9 2.8 2.5 1.5-1 2.8 1 2.8-2.5 1.5-.9 2.8-2.9-.3L12 20.8l-2.2-1.9-2.9.3-.9-2.8L3.5 15l1-2.8-1-2.8L6 7.9l.9-2.8 2.9.3L12 3.2Z" />
      <path d="m9.3 12 1.9 1.9 3.5-3.8" />
    </Svg>
  );
}

export function SignalIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M5.5 15.5a9 9 0 0 1 0-7M18.5 8.5a9 9 0 0 1 0 7M8.8 13.4a4 4 0 0 1 0-2.8M15.2 10.6a4 4 0 0 1 0 2.8" />
      <circle cx="12" cy="12" r="1.4" />
      <path d="M12 13.4V21" />
    </Svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3 7.5h10v9H3zM13 11h4l3 3v2.5h-7z" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </Svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7.5 8 5.5 8-5.5" />
    </Svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function SlidersIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 8h9M17 8h3M4 16h3M11 16h9" />
      <circle cx="15" cy="8" r="2" />
      <circle cx="9" cy="16" r="2" />
    </Svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M7.6 3.5H4.9A1.4 1.4 0 0 0 3.5 5c.3 3.6 1.9 7 4.4 9.6 2.5 2.5 5.9 4.1 9.5 4.4a1.4 1.4 0 0 0 1.5-1.4v-2.7l-3.6-1-1.5 1.8a13 13 0 0 1-5-5l1.8-1.5-1-3.7Z" />
    </Svg>
  );
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M19 10.3c0 5-7 10.2-7 10.2s-7-5.2-7-10.2a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10.2" r="2.6" />
    </Svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5a13 13 0 0 1 0 17 13 13 0 0 1 0-17Z" />
    </Svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M17.5 3.5h-2.4a4.1 4.1 0 0 0-4.1 4.1v2.6H8.5v3.4H11v7h3.4v-7h2.5l.6-3.4h-3.1V7.9c0-.5.4-1 1-1h2.1V3.5Z" />
    </Svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="3.7" />
      <path d="M16.9 7.1h.01" />
    </Svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.4 9.4 15 12l-4.6 2.6V9.4Z" />
    </Svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M16.2 3.5a4.6 4.6 0 0 0 4.3 4.3M16.2 3.5v10.9a5.2 5.2 0 1 1-5.2-5.2c.4 0 .8.05 1.2.15" />
    </Svg>
  );
}

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13.5 4.5H19.5V10.5M19.5 4.5 12 12" />
      <path d="M18 14.5v3a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
    </Svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.4-4.5A8.4 8.4 0 1 1 20.5 11.7Z" />
      <path d="M9.2 8.6c.3-.1.6 0 .8.3l.7 1.2c.1.3.1.6-.1.8l-.5.5a5.6 5.6 0 0 0 2.5 2.5l.5-.5c.2-.2.5-.3.8-.1l1.2.7c.3.2.4.5.3.8a2 2 0 0 1-2.3 1.2 7.5 7.5 0 0 1-5.1-5.1 2 2 0 0 1 1.2-2.3Z" />
    </Svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 5.5v13M5.5 12h13" />
    </Svg>
  );
}

export function ChevronUpIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m6 14.5 6-6 6 6" />
    </Svg>
  );
}

export function StoreIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4.5 9.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5V9.5" />
      <path d="M3.5 7.2 5 3.5h14l1.5 3.7a2.6 2.6 0 0 1-4.25 2.1 2.6 2.6 0 0 1-4.25 0 2.6 2.6 0 0 1-4.25 0A2.6 2.6 0 0 1 3.5 7.2Z" />
      <path d="M9.5 20.5v-6h5v6" />
    </Svg>
  );
}
