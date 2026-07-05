"use client";

import { ExpenseReportData } from "@/assets/commanInterface/ComonInterface";
import {
  buildPivotTable,
  formatReportAmount,
} from "@/utils/buildExpenseReport";
import React, { useMemo } from "react";

interface ReportPivotTableProps {
  report: ExpenseReportData;
}

const ReportPivotTable: React.FC<ReportPivotTableProps> = ({ report }) => {
  const pivot = useMemo(() => buildPivotTable(report), [report]);

  if (pivot.rows.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-zinc-950 p-8 text-center text-gray-400">
        No expenses found for the selected pools.
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-zinc-950 shadow-xl">
      <div className="border-b border-slate-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Expense Report</h2>
        <p className="mt-1 text-sm text-gray-400">
          Pool totals by category across all selected expense pools
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-900">
              <th className="sticky left-0 z-10 min-w-[160px] border-b border-r border-slate-800 bg-zinc-900 px-4 py-3 text-left font-semibold text-cyan-300">
                Pool
              </th>
              {pivot.categories.map((category) => (
                <th
                  key={category}
                  className="min-w-[120px] border-b border-slate-800 px-3 py-3 text-right font-medium text-gray-300"
                >
                  {category}
                </th>
              ))}
              <th className="min-w-[120px] border-b border-l border-slate-800 bg-zinc-900 px-4 py-3 text-right font-semibold text-emerald-300">
                Pool Total
              </th>
            </tr>
          </thead>
          <tbody>
            {pivot.rows.map((row) => (
              <tr key={row.fieldId} className="hover:bg-zinc-900/60">
                <td className="sticky left-0 z-10 border-b border-r border-slate-800 bg-zinc-950 px-4 py-3 font-medium text-white">
                  <div>{row.fieldName}</div>
                  <div className="text-xs text-gray-500">{row.fieldType}</div>
                </td>
                {row.cells.map((amount, index) => (
                  <td
                    key={`${row.fieldId}-${pivot.categories[index]}`}
                    className="border-b border-slate-800 px-3 py-3 text-right text-gray-300"
                  >
                    {amount > 0 ? formatReportAmount(amount) : "—"}
                  </td>
                ))}
                <td className="border-b border-l border-slate-800 bg-zinc-900/40 px-4 py-3 text-right font-semibold text-white">
                  {formatReportAmount(row.rowTotal)}
                </td>
              </tr>
            ))}
            <tr className="bg-zinc-900 font-semibold">
              <td className="sticky left-0 z-10 border-r border-slate-800 bg-zinc-900 px-4 py-3 text-emerald-300">
                Category Total
              </td>
              {pivot.columnTotals.map((total, index) => (
                <td
                  key={`total-${pivot.categories[index]}`}
                  className="px-3 py-3 text-right text-emerald-200"
                >
                  {total > 0 ? formatReportAmount(total) : "—"}
                </td>
              ))}
              <td className="border-l border-slate-800 px-4 py-3 text-right text-cyan-300">
                {formatReportAmount(pivot.grandTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPivotTable;
