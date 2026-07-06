"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  ChevronRight,
  Folder,
  Home,
  Inbox,
  LayoutTemplate,
  LineChart,
  MapPin,
  Plus,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NexoMascot } from "@/components/brand/NexoMascot";
import { DOMAINS, NAV_ITEMS, PROGRESS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useUi } from "./UiProvider";

const NAV_ICONS: Record<string, typeof Home> = {
  home: Home,
  inbox: Inbox,
  workflow: Workflow,
  "book-open": BookOpen,
  "layout-template": LayoutTemplate,
  "line-chart": LineChart,
  "badge-check": BadgeCheck,
  folder: Folder,
};

function CircularProgress({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#E8D8FF" strokeWidth="6" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="url(#pg)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
        <defs>
          <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6E1ED4" />
            <stop offset="60%" stopColor="#B68BFF" />
            <stop offset="100%" stopColor="#F57A1F" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[15px] font-bold text-graphite">
        {pct}%
      </span>
    </div>
  );
}

function DomainGroup({
  code,
  name,
  processes,
  activeCode,
  defaultOpen,
}: {
  code: string;
  name: string;
  processes: { code: string; name: string }[];
  activeCode: string;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-semibold text-graphite hover:bg-lavender-bg"
      >
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 text-muted transition-transform duration-200",
            open && "rotate-90",
          )}
        />
        <span className="mono text-[11px] font-bold text-purple">{code}</span>
        <span className="text-muted">·</span>
        <span className="truncate">{name}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-0.5 space-y-0.5 border-l border-line pl-2">
              {processes.map((p) => {
                const active = p.code === activeCode;
                return (
                  <Link
                    key={p.code}
                    href={`/proceso/${p.code}`}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-150 hover:translate-x-0.5",
                      active
                        ? "border border-lavender-light bg-lavender-bg font-semibold text-purple-deep"
                        : "text-muted hover:bg-lavender-bg/60 hover:text-purple",
                    )}
                  >
                    <span className="mono text-[11px] font-semibold opacity-70">
                      {p.code}
                    </span>
                    <span className="truncate">{p.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SidebarContent({ activeCode }: { activeCode: string }) {
  const { setNexoOpen, setMobileSidebarOpen } = useUi();
  const pathname = usePathname();
  const activeDomain = activeCode.split(".")[0];
  const onProcess = pathname?.startsWith("/proceso");

  return (
    <div className="flex h-full flex-col">
      {/* Progress */}
      <div className="px-4 pt-5">
        <div className="label-caps mb-2.5">Tu progreso</div>
        <div className="flex items-center gap-3.5">
          <CircularProgress pct={PROGRESS.pct} />
          <div className="min-w-0">
            <div className="text-sm font-semibold text-graphite">
              Nivel: {PROGRESS.level}
            </div>
            <div className="text-[12px] text-muted">
              {PROGRESS.points} / {PROGRESS.pointsTotal} pts
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-lavender-light">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple to-lavender"
                style={{ width: `${PROGRESS.pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 px-3">
        <div className="label-caps mb-1.5 px-1.5">Navegación</div>
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon] ?? MapPin;
            const active =
              item.key === "procesos"
                ? onProcess || pathname === "/procesos"
                : pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "focus-ring relative flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-sm transition-all duration-150",
                  active
                    ? "bg-lavender-bg font-semibold text-purple-deep"
                    : "text-muted hover:bg-lavender-bg hover:text-purple",
                )}
              >
                <Icon className="h-[18px] w-[18px]" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-purple px-1.5 text-[11px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Domains */}
      <div className="mt-6 flex-1 overflow-y-auto px-3 pb-4 scroll-slim">
        <div className="mb-1.5 flex items-center justify-between px-1.5">
          <span className="label-caps">Dominios</span>
          <button className="focus-ring grid h-5 w-5 place-items-center rounded-md text-muted hover:bg-lavender-bg hover:text-purple">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="space-y-0.5">
          {DOMAINS.map((d) => (
            <DomainGroup
              key={d.code}
              code={d.code}
              name={d.name}
              processes={d.processes}
              activeCode={activeCode}
              defaultOpen={d.code === activeDomain}
            />
          ))}
        </div>
      </div>

      {/* Nexo helper */}
      <div className="p-3">
        <div
          className="rounded-xl2 border border-lavender-light p-3.5 shadow-card"
          style={{
            background: "linear-gradient(135deg, #FFF6EF 0%, #F5EEFF 100%)",
          }}
        >
          <div className="flex items-start gap-2.5">
            <NexoMascot size={44} className="nexo-float" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-graphite">
                ¿Necesitas ayuda?
              </div>
              <p className="text-[12px] leading-snug text-muted">
                Nexo está aquí para guiarte.
              </p>
            </div>
          </div>
          <button
            onClick={() => setNexoOpen(true)}
            className="focus-ring mt-3 flex w-full items-center justify-center gap-1.5 rounded-[10px] bg-gradient-to-b from-purple to-purple-deep py-2 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(109,30,212,0.28)] transition-all hover:-translate-y-px hover:shadow-[0_8px_22px_rgba(109,30,212,0.4)]"
          >
            Pregúntale a Nexo <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ activeCode }: { activeCode: string }) {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUi();
  return (
    <>
      {/* Desktop */}
      <aside className="fixed left-0 top-16 bottom-0 z-30 hidden w-[280px] border-r border-line bg-porcelain lg:block">
        <SidebarContent activeCode={activeCode} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-graphite/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[280px] border-r border-line bg-porcelain lg:hidden"
            >
              <SidebarContent activeCode={activeCode} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
