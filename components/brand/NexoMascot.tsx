import { cn } from "@/lib/utils";

/**
 * Nexo — the Conecta OS guide, a friendly fox.
 * Replace with official Nexo clay render when available.
 */
export function NexoMascot({
  className,
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <defs>
        <radialGradient id="nx-body" cx="45%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FFB15A" />
          <stop offset="100%" stopColor="#F57A1F" />
        </radialGradient>
        <linearGradient id="nx-ear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F57A1F" />
          <stop offset="100%" stopColor="#E5651A" />
        </linearGradient>
      </defs>
      {/* soft shadow */}
      <ellipse cx="50" cy="90" rx="26" ry="5" fill="#5510A8" opacity="0.10" />
      {/* ears */}
      <path d="M24 40 L20 14 L44 30 Z" fill="url(#nx-ear)" />
      <path d="M76 40 L80 14 L56 30 Z" fill="url(#nx-ear)" />
      <path d="M27 34 L26 20 L38 30 Z" fill="#5510A8" opacity="0.20" />
      <path d="M73 34 L74 20 L62 30 Z" fill="#5510A8" opacity="0.20" />
      {/* head */}
      <path
        d="M50 26 C70 26 82 40 82 58 C82 76 68 88 50 88 C32 88 18 76 18 58 C18 40 30 26 50 26 Z"
        fill="url(#nx-body)"
      />
      {/* cheeks / snout */}
      <path
        d="M50 52 C64 52 74 60 74 70 C74 80 63 88 50 88 C37 88 26 80 26 70 C26 60 36 52 50 52 Z"
        fill="#FFF6EF"
      />
      {/* eyes */}
      <ellipse cx="39" cy="56" rx="4.6" ry="5.2" fill="#1B1B20" />
      <ellipse cx="61" cy="56" rx="4.6" ry="5.2" fill="#1B1B20" />
      <circle cx="40.6" cy="54.4" r="1.5" fill="#fff" />
      <circle cx="62.6" cy="54.4" r="1.5" fill="#fff" />
      {/* nose */}
      <path d="M50 66 l-5 -4 h10 z" fill="#5510A8" />
      <path d="M50 66 v6" stroke="#C79A78" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
