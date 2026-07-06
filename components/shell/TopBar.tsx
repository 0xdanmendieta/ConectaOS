"use client";

import { motion } from "framer-motion";
import {
  Bell,
  LayoutGrid,
  LogOut,
  Search,
  Settings,
  Trophy,
  User,
  BadgeCheck,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Popover } from "@/components/ui/Popover";
import { useUi } from "./UiProvider";
import { DOMAIN_SUMMARY, NOTIFICATIONS, USER } from "@/lib/data";

export function TopBar() {
  const { setPaletteOpen, setMobileSidebarOpen } = useUi();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 6);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-40 h-16 border-b border-line backdrop-blur-[18px] transition-shadow"
      style={{
        background: "rgba(255,255,255,0.82)",
        boxShadow: scrolled ? "0 4px 20px rgba(27,27,32,0.06)" : "none",
      }}
    >
      <div className="flex h-full items-center gap-3 px-4 lg:px-6">
        {/* Left: mobile menu + logo + tag */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="focus-ring -ml-1 grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-lavender-bg lg:hidden"
          aria-label="Abrir navegación"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="focus-ring rounded-lg">
          <Logo />
        </Link>
        <span className="ml-1 hidden text-[13px] text-muted xl:block">
          Sistema Operativo de Procesos
        </span>

        {/* Center: global search */}
        <div className="mx-auto hidden w-full max-w-xl px-4 md:block">
          <button
            onClick={() => setPaletteOpen(true)}
            className="focus-ring group flex h-10 w-full items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 text-left text-sm text-muted shadow-[inset_0_1px_2px_rgba(27,27,32,0.04)] transition-colors hover:border-lavender"
          >
            <Search className="h-4 w-4 text-muted group-hover:text-purple" />
            <span className="flex-1 truncate">
              Buscar procesos, playbooks, roles, documentos...
            </span>
            <kbd className="mono rounded-md border border-line bg-porcelain px-1.5 py-0.5 text-[11px] font-semibold text-muted">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => setPaletteOpen(true)}
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-lavender-bg md:hidden"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Dominios */}
          <Popover
            width={280}
            trigger={({ toggle, open }) => (
              <button
                onClick={toggle}
                className={`focus-ring hidden h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors sm:inline-flex ${
                  open ? "bg-lavender-bg text-purple-deep" : "text-graphite hover:bg-lavender-bg"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Dominios
              </button>
            )}
          >
            {({ close }) => (
              <div className="p-1.5">
                <div className="label-caps px-2.5 py-2">Dominios</div>
                {DOMAIN_SUMMARY.map((d) => (
                  <Link
                    key={d.code}
                    href={`/proceso/${d.code}.P01`}
                    onClick={close}
                    className="flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors hover:bg-lavender-bg"
                  >
                    <span className="mono grid h-8 w-9 place-items-center rounded-md bg-lavender-bg text-[12px] font-bold text-purple">
                      {d.code}
                    </span>
                    <span className="flex-1 text-sm font-medium text-graphite">
                      {d.name}
                    </span>
                    <span className="text-xs text-muted">{d.count} procesos</span>
                  </Link>
                ))}
              </div>
            )}
          </Popover>

          {/* Notifications */}
          <Popover
            width={340}
            trigger={({ toggle }) => (
              <button
                onClick={toggle}
                className="focus-ring relative grid h-9 w-9 place-items-center rounded-lg text-muted hover:bg-lavender-bg hover:text-purple"
                aria-label="Notificaciones"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-critical px-1 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </button>
            )}
          >
            {() => (
              <div>
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="text-sm font-semibold text-graphite">
                    Notificaciones
                  </span>
                  <span className="text-xs font-medium text-purple">
                    {unread} sin leer
                  </span>
                </div>
                <div className="max-h-80 overflow-y-auto scroll-slim">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="flex gap-3 border-b border-line/60 px-4 py-3 last:border-0 hover:bg-lavender-bg/50"
                    >
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          n.unread ? "bg-purple" : "bg-transparent"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium leading-snug text-graphite">
                          {n.title}
                        </p>
                        <p className="mt-0.5 text-[12px] leading-snug text-muted">
                          {n.detail}
                        </p>
                        <span className="mt-1 block text-[11px] text-muted/80">
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 text-center text-[13px] font-medium text-purple hover:bg-lavender-bg">
                  Ver todas
                </button>
              </div>
            )}
          </Popover>

          {/* Profile */}
          <Popover
            width={230}
            trigger={({ toggle }) => (
              <button
                onClick={toggle}
                className="focus-ring flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 hover:bg-lavender-bg"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-purple to-lavender text-[13px] font-bold text-white">
                  {USER.initials}
                </span>
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block text-[13px] font-semibold text-graphite">
                    {USER.name}
                  </span>
                  <span className="block text-[11px] text-muted">{USER.role}</span>
                </span>
              </button>
            )}
          >
            {() => (
              <div className="p-1.5">
                <div className="flex items-center gap-3 px-2.5 py-2">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-purple to-lavender text-sm font-bold text-white">
                    {USER.initials}
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold text-graphite">{USER.name}</div>
                    <div className="text-[11px] text-muted">{USER.role}</div>
                  </div>
                </div>
                <div className="my-1 h-px bg-line" />
                {[
                  { label: "Mi perfil", icon: User },
                  { label: "Mi progreso", icon: Trophy },
                  { label: "Certificaciones", icon: BadgeCheck },
                  { label: "Configuración", icon: Settings },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-graphite hover:bg-lavender-bg"
                  >
                    <item.icon className="h-4 w-4 text-muted" />
                    {item.label}
                  </button>
                ))}
                <div className="my-1 h-px bg-line" />
                <button className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-critical hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </Popover>
        </div>
      </div>
    </motion.header>
  );
}
