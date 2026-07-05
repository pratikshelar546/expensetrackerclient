"use client";

import { expenseField, expenseFieldData, ReportScope } from "@/assets/commanInterface/ComonInterface";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";

interface ReportConfigFormProps {
  pools: expenseFieldData[];
  onGenerate: (config: {
    scope: ReportScope;
    fieldIds: string[];
    includeTeamPools: boolean;
  }) => void;
  isLoading: boolean;
}

const ReportConfigForm: React.FC<ReportConfigFormProps> = ({
  pools,
  onGenerate,
  isLoading,
}) => {
  const [scope, setScope] = useState<ReportScope>("overall");
  const [includeTeamPools, setIncludeTeamPools] = useState(false);

  const availablePools = useMemo(() => {
    return pools
      .map((item) => item.expensefields)
      .filter((pool) => pool.fieldType !== "Primary");
  }, [pools]);

  const defaultSelectedIds = useMemo(() => {
    return availablePools
      .filter((pool) => includeTeamPools || pool.fieldType !== "Team")
      .map((pool) => pool._id);
  }, [availablePools, includeTeamPools]);

  const [selectedPoolIds, setSelectedPoolIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPoolIds(defaultSelectedIds);
  }, [defaultSelectedIds]);

  const selectablePools = useMemo(() => {
    return availablePools.filter(
      (pool) => includeTeamPools || pool.fieldType !== "Team"
    );
  }, [availablePools, includeTeamPools]);

  const togglePool = (poolId: string) => {
    setSelectedPoolIds((prev) =>
      prev.includes(poolId)
        ? prev.filter((id) => id !== poolId)
        : [...prev, poolId]
    );
  };

  const handleGenerate = () => {
    onGenerate({
      scope,
      fieldIds: scope === "overall" ? [] : selectedPoolIds,
      includeTeamPools,
    });
  };

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-zinc-950 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white">Generate Expense Report</h2>
      <p className="mt-2 text-sm text-gray-400">
        Choose which pools to include. Team pools are excluded by default.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium text-gray-300">Report scope</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label
              className={cn(
                "flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3",
                scope === "overall"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 bg-black"
              )}
            >
              <input
                type="radio"
                name="report-scope"
                checked={scope === "overall"}
                onChange={() => setScope("overall")}
                className="accent-cyan-500"
              />
              <span className="text-white">Overall (all eligible pools)</span>
            </label>
            <label
              className={cn(
                "flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3",
                scope === "custom"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 bg-black"
              )}
            >
              <input
                type="radio"
                name="report-scope"
                checked={scope === "custom"}
                onChange={() => setScope("custom")}
                className="accent-cyan-500"
              />
              <span className="text-white">Custom pools</span>
            </label>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700 bg-black px-4 py-3">
          <input
            type="checkbox"
            checked={includeTeamPools}
            onChange={(e) => setIncludeTeamPools(e.target.checked)}
            className="accent-cyan-500"
          />
          <span className="text-sm text-gray-300">
            Include group (team) expense pools
          </span>
        </label>

        {scope === "custom" && (
          <div className="rounded-lg border border-slate-800 bg-black p-4">
            <p className="mb-3 text-sm font-medium text-gray-300">
              Select pools (all selected by default)
            </p>
            {selectablePools.length === 0 ? (
              <p className="text-sm text-gray-500">No pools available.</p>
            ) : (
              <div className="grid max-h-56 gap-2 overflow-y-auto sm:grid-cols-2">
                {selectablePools.map((pool) => (
                  <PoolCheckbox
                    key={pool._id}
                    pool={pool}
                    checked={selectedPoolIds.includes(pool._id)}
                    onToggle={() => togglePool(pool._id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={
          isLoading ||
          (scope === "custom" && selectedPoolIds.length === 0) ||
          selectablePools.length === 0
        }
        className="mt-6 w-full rounded-md bg-gradient-to-br from-cyan-600 to-blue-700 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Generating..." : "Generate Report"}
      </button>
    </div>
  );
};

const PoolCheckbox = ({
  pool,
  checked,
  onToggle,
}: {
  pool: expenseField;
  checked: boolean;
  onToggle: () => void;
}) => (
  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-800 px-3 py-2 hover:bg-zinc-900">
    <input
      type="checkbox"
      checked={checked}
      onChange={onToggle}
      className="accent-cyan-500"
    />
    <div className="min-w-0">
      <p className="truncate text-sm text-white">{pool.fieldName}</p>
      <p className="text-xs text-gray-500">{pool.fieldType}</p>
    </div>
  </label>
);

export default ReportConfigForm;
