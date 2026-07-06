import { cn } from "@/lib/utils";

// Replace with official Conecta logo SVG when available.
export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="30"
        height="26"
        viewBox="0 0 60 52"
        fill="none"
        aria-label="Conecta"
        className="shrink-0"
      >
        <path
          d="M46 26C46 15 30 15 30 26C30 37 14 37 14 26C14 15 30 15 30 26C30 37 46 37 46 26Z"
          stroke="url(#cg)"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="cg" x1="14" y1="15" x2="46" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6E1ED4" />
            <stop offset="1" stopColor="#B68BFF" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-[19px] font-bold tracking-tight text-graphite">
        CONECTA
      </span>
      <span className="rounded-md bg-gradient-to-b from-purple to-purple-deep px-1.5 py-0.5 text-[12px] font-bold leading-none text-white">
        OS
      </span>
    </div>
  );
}
