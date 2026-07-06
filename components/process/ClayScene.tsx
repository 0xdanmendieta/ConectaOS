import { NexoMascot } from "@/components/brand/NexoMascot";

/**
 * Clay-style editorial illustration for the process hero.
 * Replace with official Nexo clay render / process artwork when available.
 */
export function ClayScene() {
  return (
    <div className="pointer-events-none relative h-[220px] w-full select-none">
      {/* ambient gradient blobs */}
      <div className="absolute right-6 top-2 h-40 w-40 rounded-full bg-lavender-light blur-3xl opacity-60" />
      <div className="absolute right-24 top-16 h-32 w-32 rounded-full bg-nexo-soft/40 blur-3xl opacity-50" />

      <svg viewBox="0 0 360 220" className="relative h-full w-full" fill="none">
        <defs>
          <linearGradient id="clay-p" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B68BFF" />
            <stop offset="100%" stopColor="#6E1ED4" />
          </linearGradient>
          <linearGradient id="clay-p2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8D8FF" />
            <stop offset="100%" stopColor="#B68BFF" />
          </linearGradient>
          <linearGradient id="clay-o" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB15A" />
            <stop offset="100%" stopColor="#F57A1F" />
          </linearGradient>
          <filter id="clay-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#5510A8" floodOpacity="0.18" />
          </filter>
        </defs>

        <g filter="url(#clay-shadow)">
          {/* data tubes */}
          <path
            d="M60 150 Q40 120 70 96 Q100 74 150 92"
            stroke="url(#clay-p2)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="60" cy="150" r="8" fill="url(#clay-o)" />
          <circle cx="150" cy="92" r="7" fill="url(#clay-p)" />

          {/* cloud */}
          <g transform="translate(238,36)">
            <ellipse cx="30" cy="26" rx="34" ry="20" fill="url(#clay-p2)" />
            <circle cx="14" cy="24" r="15" fill="#EFE4FF" />
            <circle cx="44" cy="22" r="17" fill="#EFE4FF" />
          </g>

          {/* server stack */}
          <g transform="translate(250,96)">
            <rect x="0" y="0" width="70" height="26" rx="9" fill="url(#clay-p)" />
            <rect x="0" y="32" width="70" height="26" rx="9" fill="url(#clay-p)" opacity="0.85" />
            <circle cx="14" cy="13" r="4" fill="#FFB15A" />
            <circle cx="14" cy="45" r="4" fill="#B68BFF" />
            <rect x="30" y="10" width="30" height="5" rx="2.5" fill="#fff" opacity="0.7" />
            <rect x="30" y="42" width="30" height="5" rx="2.5" fill="#fff" opacity="0.7" />
          </g>

          {/* bank / institution */}
          <g transform="translate(96,56)">
            <rect x="-6" y="96" width="132" height="16" rx="6" fill="url(#clay-p)" />
            <polygon points="60,4 122,40 -2,40" fill="url(#clay-p2)" />
            <polygon points="60,14 108,40 12,40" fill="#F5EEFF" />
            {[6, 34, 62, 90].map((x) => (
              <rect key={x} x={x} y="46" width="18" height="48" rx="5" fill="url(#clay-p)" />
            ))}
          </g>

          {/* shield */}
          <g transform="translate(30,72)">
            <path
              d="M34 2 L64 14 V40 C64 62 50 76 34 84 C18 76 4 62 4 40 V14 Z"
              fill="url(#clay-o)"
            />
            <path
              d="M22 42 l9 9 l17 -19"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>
      </svg>

      {/* Nexo sitting as guide */}
      <div className="absolute bottom-1 right-4">
        <NexoMascot size={72} className="nexo-float drop-shadow-[0_10px_16px_rgba(85,16,168,0.25)]" />
      </div>
    </div>
  );
}
