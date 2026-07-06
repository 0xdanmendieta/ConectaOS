import { cn } from "@/lib/utils";

// ── Card ──────────────────────────────────────────────────────────────────
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-line bg-white shadow-card",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── Pill ──────────────────────────────────────────────────────────────────
type PillTone = "lavender" | "success" | "warn" | "neutral";

const pillTones: Record<PillTone, string> = {
  lavender: "bg-lavender-bg text-purple-deep border-lavender-light",
  success: "bg-[#ECFDF5] text-[#047857] border-[#A7F3D0]",
  warn: "bg-nexo-cream text-[#9A4A0F] border-[#FFD9B8]",
  neutral: "bg-[#F4F4F7] text-muted border-line",
};

export function Pill({
  tone = "lavender",
  className,
  children,
}: {
  tone?: PillTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[12px] font-medium leading-5",
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

// ── Badge (process code) ────────────────────────────────────────────────────
export function CodeBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center rounded-md bg-lavender-bg px-2 py-1 text-[13px] font-semibold tracking-tight text-purple",
        className,
      )}
    >
      {children}
    </span>
  );
}

// ── Section label ────────────────────────────────────────────────────────────
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("label-caps", className)}>{children}</div>;
}
