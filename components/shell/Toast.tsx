"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useUi } from "./UiProvider";

export function Toast() {
  const { toast } = useUi();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2"
        >
          <div className="flex items-center gap-2.5 rounded-xl border border-line bg-graphite px-4 py-2.5 text-sm font-medium text-white shadow-pop">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-ok">
              <Check className="h-3 w-3 text-white" />
            </span>
            {toast}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
