"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Primitives";
import { QUIZ } from "@/lib/data/quiz";
import { cn } from "@/lib/utils";

export function Quiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];
  const answered = picked !== null;
  const progress = Math.round(((idx + (answered ? 1 : 0)) / QUIZ.length) * 100);

  function choose(j: number) {
    if (answered) return;
    setPicked(j);
    if (j === q.answer) setScore((s) => s + 1);
  }
  function next() {
    if (idx + 1 < QUIZ.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  }
  function restart() {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  }

  const pct = Math.round((score / QUIZ.length) * 100);
  const result =
    pct === 100
      ? { emo: "🏆", title: `¡Perfecto! ${score}/${QUIZ.length}`, text: "Te sabes el OS mejor que quien lo escribió. Presume tu racha en el pipeline review del lunes." }
      : pct >= 75
        ? { emo: "🔥", title: `¡Muy bien! ${score}/${QUIZ.length}`, text: "Dominas el sistema. Repasa los links de las que fallaste y ve por el 100%." }
        : pct >= 50
          ? { emo: "🚀", title: `Vas bien: ${score}/${QUIZ.length}`, text: "Ya tienes la mitad del OS en la cabeza. Date una vuelta por los procesos y reintenta." }
          : { emo: "🌱", title: `Apenas germinando: ${score}/${QUIZ.length}`, text: "Tranqui: lee 2-3 procesos y vuelve. El OS se aprende jugando." };

  return (
    <Card className="overflow-hidden">
      {/* progress */}
      <div className="h-1.5 w-full bg-lavender-light">
        <motion.div
          className="h-full bg-gradient-to-r from-purple to-nexo"
          animate={{ width: `${done ? 100 : progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="label-caps">Pregunta {idx + 1} de {QUIZ.length}</div>
              <h3 className="mt-2 text-[18px] font-semibold leading-snug text-graphite">{q.q}</h3>

              <div className="mt-4 space-y-2">
                {q.options.map((op, j) => {
                  const isRight = j === q.answer;
                  const isPicked = picked === j;
                  return (
                    <button
                      key={j}
                      onClick={() => choose(j)}
                      disabled={answered}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-[14px] transition-all",
                        !answered && "border-line bg-white hover:border-lavender hover:bg-lavender-bg/50",
                        answered && isRight && "border-ok bg-[#F0FDF4] text-graphite",
                        answered && isPicked && !isRight && "border-critical bg-red-50 text-graphite",
                        answered && !isRight && !isPicked && "border-line opacity-60",
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[12px] font-bold",
                          answered && isRight && "border-ok bg-ok text-white",
                          answered && isPicked && !isRight && "border-critical bg-critical text-white",
                          !(answered && (isRight || isPicked)) && "border-lavender text-purple",
                        )}
                      >
                        {answered && isRight ? <Check className="h-3.5 w-3.5" /> : answered && isPicked ? <X className="h-3.5 w-3.5" /> : String.fromCharCode(65 + j)}
                      </span>
                      {op}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className={cn("rounded-xl border p-3.5 text-[13px] leading-relaxed", picked === q.answer ? "border-ok/30 bg-[#F0FDF4]" : "border-nexo/30 bg-nexo-cream")}>
                      <span className="font-bold">{picked === q.answer ? "✅ ¡Exacto! " : "❌ Casi. "}</span>
                      {q.why}{" "}
                      <Link href={q.ref} className="font-medium text-purple underline-offset-2 hover:underline">
                        Ver proceso →
                      </Link>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="primary" onClick={next}>
                        {idx + 1 < QUIZ.length ? "Siguiente" : "Ver resultado"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <div className="text-6xl">{result.emo}</div>
              <h3 className="mt-3 text-[22px] font-bold text-graphite">{result.title}</h3>
              <p className="mx-auto mt-2 max-w-md text-[14px] text-muted">{result.text}</p>
              <div className="mt-6 flex justify-center">
                <Button variant="primary" onClick={restart}>
                  <RotateCcw className="h-4 w-4" /> Intentar de nuevo
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
