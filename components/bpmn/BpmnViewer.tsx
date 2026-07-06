"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Expand,
  Maximize2,
  Minus,
  Plus,
  Scan,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { BpmnDef, BpmnLane, BpmnNode } from "@/lib/types";
import { GUT, LANE_H, TOP, computeLayout } from "@/lib/bpmn/layout";
import { cn } from "@/lib/utils";

const LANE_DOT: Record<BpmnLane["color"], string> = {
  orange: "#F57A1F",
  blue: "#7A44C6",
  teal: "#17A97B",
  purple: "#5510A8",
  yellow: "#E0A400",
  gray: "#8A8A95",
};

const TYPE_LABEL: Record<BpmnNode["type"], string> = {
  task: "Actividad",
  gateway: "Decisión",
  start: "Inicio",
  end: "Fin",
  doc: "Documento",
};

function wrapLaneLabel(label: string): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 16) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

function Canvas({
  def,
  zoom,
  hovered,
  setHovered,
  selected,
  setSelected,
}: {
  def: BpmnDef;
  zoom: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  selected: string | null;
  setSelected: (id: string | null) => void;
}) {
  const { width, height, laidNodes, laidFlows } = useMemo(
    () => computeLayout(def),
    [def],
  );

  return (
    <svg
      width={width * zoom}
      height={height * zoom}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
      fontFamily="Inter, system-ui, sans-serif"
    >
      <defs>
        <marker id="arw" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#6E5B86" />
        </marker>
        <marker id="arwD" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
          <path d="M0,0 L9,4.5 L0,9 z" fill="#B68BFF" />
        </marker>
        <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#6E1ED4" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Lanes */}
      {def.lanes.map((l, i) => {
        const y = TOP + i * LANE_H;
        const lines = wrapLaneLabel(l.label);
        const ly = y + LANE_H / 2 - (lines.length - 1) * 7.5 + 4;
        return (
          <g key={l.id}>
            <rect x="0" y={y} width={width} height={LANE_H} fill={i % 2 ? "#FCFBFE" : "#FFFFFF"} stroke="#EFEAF8" />
            <rect x="0" y={y} width={GUT} height={LANE_H} fill="#F7F1FF" stroke="#EFEAF8" />
            <rect x="0" y={y} width="3.5" height={LANE_H} fill={LANE_DOT[l.color]} opacity="0.85" />
            {l.interaction && (
              <line x1="0" y1={y + LANE_H} x2={width} y2={y + LANE_H} stroke="#E0A400" strokeWidth="2" strokeDasharray="8 5" />
            )}
            {lines.map((t, k) => (
              <text
                key={k}
                x={GUT / 2 + 3}
                y={ly + k * 15}
                textAnchor="middle"
                fontWeight="700"
                fontSize="11"
                fill="#5510A8"
              >
                {t}
              </text>
            ))}
          </g>
        );
      })}

      {/* Flows */}
      {laidFlows.map((f, idx) => {
        const stroke = f.dashed ? "#B68BFF" : "#6E5B86";
        return (
          <g key={idx}>
            <path
              d={f.path}
              fill="none"
              stroke={stroke}
              strokeWidth="1.7"
              strokeDasharray={f.dashed ? "5 4" : undefined}
              markerEnd={`url(#${f.dashed ? "arwD" : "arw"})`}
            />
            {f.label && (
              <>
                <rect
                  x={f.lx - (f.label.length * 5.2 + 10) / 2}
                  y={f.ly - 9}
                  width={f.label.length * 5.2 + 10}
                  height="15"
                  rx="4"
                  fill="#FFFFFF"
                  opacity="0.94"
                  stroke="#EFEAF8"
                />
                <text x={f.lx} y={f.ly + 1.5} textAnchor="middle" fontSize="9.5" fontWeight="600" fill={stroke}>
                  {f.label}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {laidNodes.map((n) => {
        const isHover = hovered === n.id;
        const isSel = selected === n.id;
        const emphasize = isHover || isSel;
        const inside = n.type === "task" || n.type === "doc";
        const ty = inside
          ? n.y - (n.label.length - 1) * 6.4 + 4
          : n.type === "gateway"
            ? n.y + 42
            : n.y + 32;

        let shape: React.ReactNode = null;
        if (n.type === "start") {
          shape = <circle cx={n.x} cy={n.y} r="17" fill="#EAF7F1" stroke="#16A34A" strokeWidth="2.4" />;
        } else if (n.type === "end") {
          shape = <circle cx={n.x} cy={n.y} r="17" fill="#FDEEEE" stroke="#EF4444" strokeWidth="3" />;
        } else if (n.type === "gateway") {
          shape = (
            <>
              <path
                d={`M${n.x},${n.y - 28} L${n.x + 28},${n.y} L${n.x},${n.y + 28} L${n.x - 28},${n.y} z`}
                fill="#F5EEFF"
                stroke={emphasize ? "#6E1ED4" : "#8B5CF6"}
                strokeWidth="2"
              />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontWeight="700" fill="#6E1ED4" fontSize="16">
                ×
              </text>
            </>
          );
        } else if (n.type === "doc") {
          shape = (
            <path
              d={`M${n.x - 56},${n.y - 24} h112 v40 q-28,12 -56,0 q-28,12 -56,0 z`}
              fill="#FFF6EF"
              stroke={emphasize ? "#E5651A" : "#F57A1F"}
              strokeWidth="1.8"
            />
          );
        } else {
          shape = (
            <rect
              x={n.x - 62}
              y={n.y - 30}
              width="124"
              height="60"
              rx="12"
              fill="#F5EEFF"
              stroke={emphasize ? "#6E1ED4" : "#B68BFF"}
              strokeWidth={emphasize ? "2.4" : "1.8"}
            />
          );
        }

        const textColor = n.type === "doc" ? "#9A4A0F" : inside ? "#5510A8" : "#4B4B57";

        return (
          <g
            key={n.id}
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setSelected(isSel ? null : n.id)}
            style={{ cursor: "pointer" }}
            filter={emphasize ? "url(#nodeGlow)" : undefined}
          >
            {shape}
            {n.label.map((t, k) => (
              <text
                key={k}
                x={n.x}
                y={ty + k * 12.5}
                textAnchor="middle"
                fill={textColor}
                fontSize={inside ? "10.5" : "10"}
                fontWeight={k === 0 ? "700" : "400"}
              >
                {t}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function Controls({
  zoom,
  setZoom,
  onFit,
  onFull,
  isFull,
}: {
  zoom: number;
  setZoom: (z: number) => void;
  onFit: () => void;
  onFull: () => void;
  isFull?: boolean;
}) {
  const btn =
    "focus-ring grid h-8 w-8 place-items-center rounded-lg text-muted transition-colors hover:bg-lavender-bg hover:text-purple";
  return (
    <div className="flex items-center gap-1 rounded-xl border border-line bg-white/90 p-1 shadow-sm backdrop-blur">
      <button className={btn} onClick={() => setZoom(Math.max(0.5, +(zoom - 0.15).toFixed(2)))} aria-label="Alejar">
        <Minus className="h-4 w-4" />
      </button>
      <span className="mono w-12 text-center text-[12px] font-semibold text-graphite">
        {Math.round(zoom * 100)}%
      </span>
      <button className={btn} onClick={() => setZoom(Math.min(2, +(zoom + 0.15).toFixed(2)))} aria-label="Acercar">
        <Plus className="h-4 w-4" />
      </button>
      <span className="mx-0.5 h-5 w-px bg-line" />
      <button className={btn} onClick={onFit} aria-label="Ajustar a pantalla">
        <Scan className="h-4 w-4" />
      </button>
      <button className={btn} onClick={onFull} aria-label={isFull ? "Cerrar" : "Pantalla completa"}>
        {isFull ? <X className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

function NodeDetail({
  node,
  lanes,
  onClose,
}: {
  node: BpmnNode;
  lanes: BpmnLane[];
  onClose: () => void;
}) {
  const lane = lanes.find((l) => l.id === node.lane);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="pointer-events-auto absolute bottom-4 left-4 z-10 w-64 rounded-xl border border-lavender-light bg-white p-3.5 shadow-pop"
    >
      <div className="flex items-start justify-between">
        <span className="rounded-md bg-lavender-bg px-2 py-0.5 text-[11px] font-semibold text-purple">
          {TYPE_LABEL[node.type]}
        </span>
        <button onClick={onClose} className="text-muted hover:text-graphite">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-2 text-[13px] font-semibold leading-snug text-graphite">
        {node.label.join(" ")}
      </p>
      <dl className="mt-2 space-y-1 text-[12px]">
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Responsable</dt>
          <dd className="text-right font-medium text-graphite">{lane?.label}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted">Tipo</dt>
          <dd className="font-medium text-graphite">{TYPE_LABEL[node.type]}</dd>
        </div>
      </dl>
    </motion.div>
  );
}

export function BpmnViewer({ def, code }: { def: BpmnDef; code: string }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [full, setFull] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { width } = useMemo(() => computeLayout(def), [def]);
  const selectedNode = def.nodes.find((n) => n.id === selected) ?? null;

  function fit(containerWidth: number) {
    const z = Math.min(1, +((containerWidth - 24) / width).toFixed(2));
    setZoom(Math.max(0.5, z));
  }

  const inner = (fullMode: boolean) => (
    <div className={cn("relative", fullMode ? "flex-1" : "")}>
      <div className="absolute right-3 top-3 z-10">
        <Controls
          zoom={zoom}
          setZoom={setZoom}
          onFit={() => fit(scrollRef.current?.clientWidth ?? width)}
          onFull={() => setFull((v) => !v)}
          isFull={fullMode}
        />
      </div>
      <div
        ref={scrollRef}
        className={cn(
          "overflow-auto scroll-slim",
          fullMode ? "h-full p-6" : "max-h-[440px] p-4",
        )}
      >
        <div className="relative" style={{ width: width * zoom }}>
          <Canvas
            def={def}
            zoom={zoom}
            hovered={hovered}
            setHovered={setHovered}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
      <AnimatePresence>
        {selectedNode && (
          <NodeDetail
            node={selectedNode}
            lanes={def.lanes}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="mono rounded-md bg-lavender-bg px-1.5 py-0.5 text-[11px] font-bold text-purple">
              {code}
            </span>
            <h3 className="text-sm font-semibold text-graphite">Diagrama BPMN</h3>
          </div>
        </div>
        {inner(false)}
        {def.caption && (
          <p className="border-t border-line bg-porcelain px-4 py-2.5 text-[12px] leading-relaxed text-muted">
            {def.caption}
          </p>
        )}
        <div className="border-t border-line px-4 py-2.5">
          <button
            onClick={() => setFull(true)}
            className="focus-ring inline-flex items-center gap-1.5 text-[13px] font-medium text-purple hover:text-purple-deep"
          >
            <Expand className="h-3.5 w-3.5" /> Ver diagrama en pantalla completa
          </button>
        </div>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {full && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="mono rounded-md bg-lavender-bg px-1.5 py-0.5 text-[11px] font-bold text-purple">
                  {code}
                </span>
                <h3 className="text-sm font-semibold text-graphite">Diagrama BPMN</h3>
              </div>
              <button
                onClick={() => setFull(false)}
                className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted hover:bg-lavender-bg hover:text-purple"
              >
                Cerrar <X className="h-4 w-4" />
              </button>
            </div>
            {inner(true)}
            {def.caption && (
              <p className="border-t border-line bg-porcelain px-6 py-3 text-[13px] text-muted">
                {def.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
