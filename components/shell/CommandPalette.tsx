"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  FileText,
  LayoutTemplate,
  Search,
  Users,
  Workflow,
  BookOpen,
  CornerDownLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SEARCH_INDEX } from "@/lib/data";
import type { SearchDoc } from "@/lib/types";
import { useUi } from "./UiProvider";

const KIND_ICON: Record<SearchDoc["kind"], typeof Workflow> = {
  Procesos: Workflow,
  Playbooks: BookOpen,
  Blueprints: LayoutTemplate,
  Roles: Users,
  Documentos: FileText,
  Certificaciones: Award,
};

const KIND_ORDER: SearchDoc["kind"][] = [
  "Procesos",
  "Playbooks",
  "Blueprints",
  "Roles",
  "Documentos",
  "Certificaciones",
];

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen } = useUi();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (paletteOpen) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [paletteOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? SEARCH_INDEX.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.code?.toLowerCase().includes(q) ||
            d.domain?.toLowerCase().includes(q) ||
            d.kind.toLowerCase().includes(q),
        )
      : SEARCH_INDEX.filter((d) => d.kind === "Procesos");
    return filtered.slice(0, 40);
  }, [query]);

  const flat = results;

  function go(doc: SearchDoc) {
    setPaletteOpen(false);
    router.push(doc.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  }

  // Group preserving order
  const grouped = KIND_ORDER.map((kind) => ({
    kind,
    items: results.filter((r) => r.kind === kind),
  })).filter((g) => g.items.length);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          onClick={() => setPaletteOpen(false)}
        >
          <div className="absolute inset-0 bg-graphite/30 backdrop-blur-[3px]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-line bg-white shadow-pop"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-[18px] w-[18px] text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Buscar procesos, playbooks, roles, documentos..."
                className="h-14 w-full bg-transparent text-[15px] text-graphite outline-none placeholder:text-muted"
              />
              <kbd className="mono rounded-md border border-line bg-porcelain px-1.5 py-0.5 text-[11px] font-semibold text-muted">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2 scroll-slim">
              {grouped.length === 0 && (
                <div className="px-3 py-10 text-center text-sm text-muted">
                  Sin resultados para “{query}”.
                </div>
              )}
              {grouped.map((group) => {
                const Icon = KIND_ICON[group.kind];
                return (
                  <div key={group.kind} className="mb-1">
                    <div className="label-caps px-3 py-1.5">{group.kind}</div>
                    {group.items.map((doc) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isActive = idx === active;
                      return (
                        <button
                          key={`${doc.kind}-${doc.title}-${doc.code ?? idx}`}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => go(doc)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                            isActive ? "bg-lavender-bg" : "hover:bg-lavender-bg/60"
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                              isActive ? "bg-white text-purple" : "bg-lavender-bg text-purple"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-graphite">
                              {doc.title}
                            </span>
                            <span className="block truncate text-[12px] text-muted">
                              {doc.domain}
                            </span>
                          </span>
                          {doc.code && (
                            <span className="mono text-[11px] font-semibold text-purple">
                              {doc.code}
                            </span>
                          )}
                          {isActive && (
                            <CornerDownLeft className="h-3.5 w-3.5 text-muted" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
