import type { BpmnDef, BpmnNode } from "@/lib/types";

// Geometry (ported from conecta-os/bpmn.js, tuned for the premium viewer).
export const GUT = 132; // lane-label gutter
export const COL_W = 168;
export const LANE_H = 104;
export const TOP = 8;

export type LaidNode = BpmnNode & { x: number; y: number };
export type LaidFlow = {
  f: string;
  t: string;
  label?: string;
  dashed?: boolean;
  loop?: boolean;
  path: string;
  lx: number;
  ly: number;
};
export function halfW(n: BpmnNode) {
  return n.type === "gateway"
    ? 28
    : n.type === "start" || n.type === "end"
      ? 17
      : n.type === "doc"
        ? 56
        : 62;
}
export function halfH(n: BpmnNode) {
  return n.type === "gateway"
    ? 28
    : n.type === "start" || n.type === "end"
      ? 17
      : n.type === "doc"
        ? 26
        : 30;
}

export function computeLayout(def: BpmnDef) {
  const { lanes, nodes, flows } = def;
  let ncols = 0;
  nodes.forEach((n) => {
    if (n.col + 1 > ncols) ncols = n.col + 1;
  });
  let loopN = 0;
  flows.forEach((f) => {
    if (f.loop) loopN++;
  });
  const width = GUT + ncols * COL_W + 16;
  const height = TOP + lanes.length * LANE_H + 20 + loopN * 18 + 14;

  const li: Record<string, number> = {};
  lanes.forEach((l, i) => (li[l.id] = i));
  const nb: Record<string, BpmnNode> = {};
  nodes.forEach((n) => (nb[n.id] = n));

  const CX = (n: BpmnNode) => GUT + n.col * COL_W + COL_W / 2;
  const CY = (n: BpmnNode) => TOP + li[n.lane] * LANE_H + LANE_H / 2;

  const laidNodes: LaidNode[] = nodes.map((n) => ({ ...n, x: CX(n), y: CY(n) }));

  let loopI = 0;
  const laidFlows: LaidFlow[] = flows.map((f) => {
    const a = nb[f.f];
    const b = nb[f.t];
    const x1 = CX(a),
      y1 = CY(a),
      x2 = CX(b),
      y2 = CY(b);
    let p = "",
      lx = 0,
      ly = 0;

    if (f.loop) {
      loopI++;
      const ch = TOP + lanes.length * LANE_H + 16 + (loopI - 1) * 18;
      p = `M${x1},${y1 + halfH(a)} L${x1},${ch} L${x2},${ch} L${x2},${y2 + halfH(b)}`;
      lx = (x1 + x2) / 2;
      ly = ch - 5;
    } else if (a.lane === b.lane && x2 > x1) {
      p = `M${x1 + halfW(a)},${y1} L${x2 - halfW(b)},${y2}`;
      lx = (x1 + halfW(a) + x2 - halfW(b)) / 2;
      ly = y1 - 9;
    } else if (x1 === x2) {
      const sg = y2 > y1 ? 1 : -1;
      p = `M${x1},${y1 + sg * halfH(a)} L${x2},${y2 - sg * halfH(b)}`;
      lx = x1 + 9;
      ly = (y1 + y2) / 2;
    } else if (x2 > x1) {
      const mx = x2 - halfW(b) - 18;
      p = `M${x1 + halfW(a)},${y1} L${mx},${y1} L${mx},${y2} L${x2 - halfW(b)},${y2}`;
      lx = mx;
      ly = (y1 + y2) / 2;
    } else {
      const sg2 = y2 > y1 ? 1 : -1;
      const my = y1 + sg2 * (LANE_H / 2 - 6);
      p = `M${x1},${y1 + sg2 * halfH(a)} L${x1},${my} L${x2},${my} L${x2},${y2 - sg2 * halfH(b)}`;
      lx = (x1 + x2) / 2;
      ly = my - 5;
    }
    return { ...f, path: p, lx, ly };
  });

  return { width, height, laidNodes, laidFlows };
}
