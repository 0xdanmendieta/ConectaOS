"use client";

import { motion } from "framer-motion";
import { Boxes, Gauge, Target, Timer, Zap } from "lucide-react";
import type { Process } from "@/lib/types";

export function SummaryCards({ p }: { p: Process }) {
  const cards = [
    { icon: Zap, title: "Trigger", text: p.ficha.trigger },
    { icon: Boxes, title: "Inputs", text: p.ficha.inputs },
    { icon: Target, title: "Outputs", text: p.ficha.outputs },
    { icon: Timer, title: "Tiempo objetivo", text: p.ficha.duracion },
    { icon: Gauge, title: "Métrica de éxito", text: p.ficha.metricaExito },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
          whileHover={{ y: -4 }}
          className="group rounded-xl2 border border-line bg-white p-4 shadow-card transition-shadow duration-150 hover:border-lavender hover:shadow-card-hover"
        >
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-lavender-bg text-purple">
              <c.icon className="h-4 w-4" />
            </span>
            <h4 className="text-[13px] font-semibold text-purple">{c.title}</h4>
          </div>
          <p className="mt-2.5 whitespace-pre-line text-[13px] leading-relaxed text-muted">
            {c.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
