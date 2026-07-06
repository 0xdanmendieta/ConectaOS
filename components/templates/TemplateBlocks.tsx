import { Info } from "lucide-react";
import { Card } from "@/components/ui/Primitives";
import type { TemplateBlock } from "@/lib/types";

export function TemplateBlocks({ blocks }: { blocks: TemplateBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
        if (b.type === "fields") {
          return (
            <Card key={i} className="overflow-hidden">
              <dl className="divide-y divide-line/70">
                {b.rows.map((r, j) => (
                  <div key={j} className="grid grid-cols-1 sm:grid-cols-[minmax(160px,240px)_1fr]">
                    <dt className="bg-porcelain px-4 py-3 text-[13px] font-semibold text-purple-deep">
                      {r.label}
                    </dt>
                    <dd className="whitespace-pre-line px-4 py-3 text-[13px] text-graphite">
                      {r.value || <span className="text-muted/50">—</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          );
        }
        if (b.type === "table") {
          return (
            <Card key={i} className="overflow-hidden">
              <div className="overflow-x-auto scroll-slim">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-porcelain text-left">
                      {b.headers.map((h, k) => (
                        <th key={k} className="label-caps whitespace-nowrap px-4 py-2.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, k) => (
                      <tr key={k} className="border-t border-line align-top">
                        {row.map((cell, m) => (
                          <td key={m} className="px-4 py-3 text-graphite">
                            {cell || <span className="text-muted/40">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          );
        }
        if (b.type === "callout") {
          return (
            <div key={i} className="flex gap-3 rounded-xl2 border border-lavender-light bg-lavender-bg/60 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-purple" />
              <div>
                <div className="text-[13px] font-bold text-purple-deep">{b.tag}</div>
                <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-graphite">
                  {b.text}
                </p>
              </div>
            </div>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line rounded-xl2 border border-line bg-white p-4 text-[13px] leading-relaxed text-graphite">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
