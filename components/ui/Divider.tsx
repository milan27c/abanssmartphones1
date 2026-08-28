import { cn } from "@/lib/cn";

interface DividerProps {
  className?: string;
  tone?: "light" | "dark";
}

export function Divider({ className, tone = "light" }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        tone === "light" ? "border-line" : "border-on-dark-line",
        className,
      )}
    />
  );
}
