"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ALL_TEMPLATES, TEMPLATE_DOMAINS, templateUsedIn } from "@/lib/data";
import { cn } from "@/lib/utils";

export function PlantillasCatalog() {
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get("d");
    if (d && TEMPLATE_DOMAINS.some((x) => x.code === d)) setFilter(d);
  }, []);

  const tabs = [{ code: "all", name: "Todas" }, ...TEMPLATE_DOMAINS];
  const shown =
    filter === "all"
      ? ALL_TEMPLATES
      : ALL_TEMPLATES.filter((t) => t.domain === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="no-scrollbar mb-6 flex gap-1.5 overflow-x-auto">
        {tabs.map((t) => {
          const active = filter === t.code;
          const count =
            t.code === "all"
              ? ALL_TEMPLATES.length
              : ALL_TEMPLATES.filter((x) => x.domain === t.code).length;
          return (
            <button
              key={t.code}
              onClick={() => setFilter(t.code)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                active
                  ? "border-purple bg-purple text-white"
                  : "border-line bg-white text-muted hover:border-lavender hover:text-purple",
              )}
            >
              {t.name}
              <span className={cn("text-[11px]", active ? "text-white/80" : "text-muted/70")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t, i) => {
          const isComm = t.domain === "CX";
          return (
            <motion.div
              key={t.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.2), duration: 0.25 }}
            >
              <Link
                href={`/plantillas/${encodeURIComponent(t.code)}`}
                className="group flex h-full flex-col rounded-xl2 border border-line bg-white p-4 shadow-card transition-all hover:-translate-y-1 hover:border-lavender hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-lavender-bg text-purple">
                    {isComm ? <MessageSquare className="h-[18px] w-[18px]" /> : <FileText className="h-[18px] w-[18px]" />}
                  </span>
                  <span className="mono rounded-md bg-lavender-bg px-2 py-1 text-[11px] font-semibold text-purple">
                    {t.code}
                  </span>
                </div>
                <h3 className="mt-3 flex-1 text-[14px] font-semibold leading-snug text-graphite group-hover:text-purple-deep">
                  {t.title}
                </h3>
                <div className="mt-3 text-[12px] text-muted">
                  Se usa en <span className="font-medium text-purple">{templateUsedIn(t)}</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
