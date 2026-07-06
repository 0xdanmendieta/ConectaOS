"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NexoMascot } from "@/components/brand/NexoMascot";
import { useUi } from "./UiProvider";

type Msg = { from: "nexo" | "me"; text: string };

const SUGGESTIONS = [
  "Explícame este proceso",
  "¿Qué entregables necesito?",
  "¿Qué pasa si no cumple criterio?",
  "Prepárame para el quiz",
];

// Simulated static answers (no real AI — §19.7)
const CANNED: Record<string, string> = {
  "Explícame este proceso":
    "Este proceso lleva a un fabricante desde la evaluación (F0) hasta la primera venta replicable. Las compuertas clave son el checklist de entrada (F1) y la certificación del equipo (F2): sin 8/8 materiales y sin assessment aprobado, nadie sale a vender.",
  "¿Qué entregables necesito?":
    "Los entregables principales son: Checklist de Entrada (CM.P01.E01), Assessment de Certificación (CM.P01.E02), Informe de Deployment en Sandbox (CM.P01.E03), Brief de Campaña (MK.P02.E01) y el Post-mortem del Lighthouse (CM.P05.E02).",
  "¿Qué pasa si no cumple criterio?":
    "En la compuerta ¿GO? un NO-GO se documenta y se archiva — mejor un NO-GO explícito que una línea zombie. Y en el checklist 8/8: si está incompleto, el proceso no avanza a certificación.",
  "Prepárame para el quiz":
    "El assessment 'Listo para Vender' pide: pitch de 2 min, manejo de 3 objeciones y pricing sin ayuda. La meta es ≥ 80%. Repasa los diferenciadores validados y la matriz de pricing de la línea.",
};

export function NexoDrawer() {
  const { nexoOpen, setNexoOpen } = useUi();
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "nexo",
      text: "¡Hola! Soy Nexo, tu guía de procesos. ¿En qué te ayudo con Onboarding de Fabricante (CM.P01)?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [messages, nexoOpen]);

  function ask(text: string) {
    if (!text.trim()) return;
    const answer =
      CANNED[text] ??
      "Buena pregunta. En esta vista de preview trabajo con contenido estático; cuando conectemos la base de conocimiento de Conecta OS podré responderte con el detalle de cada proceso.";
    setMessages((m) => [...m, { from: "me", text }, { from: "nexo", text: answer }]);
    setInput("");
  }

  return (
    <AnimatePresence>
      {nexoOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNexoOpen(false)}
            className="fixed inset-0 z-[60] bg-graphite/30 backdrop-blur-[3px]"
          />
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed right-0 top-0 bottom-0 z-[61] flex w-full max-w-[400px] flex-col border-l border-line bg-white"
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 border-b border-line px-4 py-3.5"
              style={{ background: "linear-gradient(135deg, #FFF6EF 0%, #F5EEFF 100%)" }}
            >
              <NexoMascot size={40} className="nexo-float" />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 text-sm font-bold text-graphite">
                  Nexo <Sparkles className="h-3.5 w-3.5 text-nexo" />
                </div>
                <div className="text-[12px] text-muted">Tu guía de procesos</div>
              </div>
              <button
                onClick={() => setNexoOpen(false)}
                className="focus-ring grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-white/70"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 scroll-slim">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                      m.from === "me"
                        ? "bg-gradient-to-b from-purple to-purple-deep text-white"
                        : "border border-line bg-porcelain text-graphite"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 border-t border-line px-4 pt-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="rounded-full border border-lavender-light bg-lavender-bg px-3 py-1 text-[12px] font-medium text-purple-deep transition-colors hover:bg-lavender-light"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 p-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escríbele a Nexo..."
                className="focus-ring h-11 flex-1 rounded-xl border border-line bg-porcelain px-3.5 text-sm text-graphite outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                className="focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-purple to-purple-deep text-white shadow-[0_4px_14px_rgba(109,30,212,0.3)] transition-transform hover:-translate-y-px"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
