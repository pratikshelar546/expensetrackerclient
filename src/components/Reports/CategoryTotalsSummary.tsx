"use client";

import { ExpenseReportData } from "@/assets/commanInterface/ComonInterface";
import {
  buildCategorySummary,
  formatReportAmount,
} from "@/utils/buildExpenseReport";
import React, { useMemo } from "react";

interface CategoryTotalsSummaryProps {
  report: ExpenseReportData;
}

const CategoryTotalsSummary: React.FC<CategoryTotalsSummaryProps> = ({
  report,
}) => {
  const summary = useMemo(() => buildCategorySummary(report), [report]);

  if (summary.items.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-zinc-950 shadow-xl">
      <div className="border-b border-slate-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Category-wise Totals</h2>
        <p className="mt-1 text-sm text-gray-400">
          Combined spending per category across all selected pools
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-900">
              <th className="border-b border-slate-800 px-6 py-3 text-left font-semibold text-cyan-300">
                Category
              </th>
              <th className="border-b border-slate-800 px-6 py-3 text-right font-semibold text-cyan-300">
                Total Amount
              </th>
              <th className="border-b border-slate-800 px-6 py-3 text-right font-semibold text-cyan-300">
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {summary.items.map((item) => {
              const share =
                summary.grandTotal > 0
                  ? (item.total / summary.grandTotal) * 100
                  : 0;

              return (
                <tr key={item.category} className="hover:bg-zinc-900/60">
                  <td className="border-b border-slate-800 px-6 py-3 text-white">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${item.dotClass}`}
                      />
                      <span>{item.category}</span>
                    </div>
                  </td>
                  <td className="border-b border-slate-800 px-6 py-3 text-right font-medium text-emerald-200">
                    ₹{formatReportAmount(item.total)}
                  </td>
                  <td className="border-b border-slate-800 px-6 py-3 text-right text-gray-400">
                    {share.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
            <tr className="bg-zinc-900 font-semibold">
              <td className="px-6 py-3 text-emerald-300">Grand Total</td>
              <td className="px-6 py-3 text-right text-cyan-300">
                ₹{formatReportAmount(summary.grandTotal)}
              </td>
              <td className="px-6 py-3 text-right text-gray-400">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTotalsSummary;
