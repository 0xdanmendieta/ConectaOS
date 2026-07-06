"use client";

import { motion } from "framer-motion";
import { Check, FileText } from "lucide-react";
import { deliverableHighlights } from "@/lib/data";
import type { Process } from "@/lib/types";

export function DeliverablesGrid({ p }: { p: Process }) {
  const items = deliverableHighlights(p);
  return (
    <section>
      <h2 className="mb-3 text-[17px] font-semibold text-graphite">
        Entregables principales
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.28 }}
            whileHover={{ y: -4 }}
            className="rounded-xl2 border border-line bg-white p-3.5 shadow-card transition-shadow hover:border-lavender hover:shadow-card-hover"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-lavender-bg text-purple">
                <FileText className="h-4 w-4" />
              </span>
              {d.done && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ok">
                  <Check className="h-3 w-3 text-white" />
                </span>
              )}
            </div>
            <h4 className="mt-3 text-[13px] font-semibold leading-snug text-purple-deep">
              {d.title}
            </h4>
            <p className="mt-0.5 text-[12px] leading-snug text-muted">{d.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
