"use client";

import { expenseFieldData, ReportScope } from "@/assets/commanInterface/ComonInterface";
import ReportConfigForm from "@/components/Reports/ReportConfigForm";
import ReportPivotTable from "@/components/Reports/ReportPivotTable";
import CategoryTotalsSummary from "@/components/Reports/CategoryTotalsSummary";

import { getField } from "@/Redux/Slices/FieldSlice";
import { clearReport, generateReport } from "@/Redux/Slices/ReportsSlice";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector ,} from "../../../Hooks";

const ReportsPage = () => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const { report, status: reportStatus } = useAppSelector((state) => state.reports);
  const [pools, setPools] = useState<expenseFieldData[]>([]);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    if (status === "loading" || !token) return;

    const fetchPools = async () => {
      const response = await dispatch(getField({ token }));
      if (getField.fulfilled.match(response)) {
        setPools(response.payload);
      }
    };

    fetchPools();
  }, [dispatch, status, token]);

  const handleGenerate = async (config: {
    scope: ReportScope;
    fieldIds: string[];
    includeTeamPools: boolean;
  }) => {
    if (!token) {
      await signIn("google");
      return;
    }

    const response = await dispatch(
      generateReport({
        token,
        fieldIds: config.fieldIds,
        includeTeamPools: config.includeTeamPools,
      })
    );

    if (generateReport.fulfilled.match(response)) {
      setShowConfig(false);
      toast.success("Report generated successfully");
    } else {
      toast.error("Failed to generate report");
    }
  };

  const handleNewReport = () => {
    dispatch(clearReport());
    setShowConfig(true);
  };

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold text-white">Expense Reports</h2>
        <p className="max-w-md text-gray-400">
          Sign in to generate cross-pool expense reports by category.
        </p>
        <button
          onClick={() => signIn("google")}
          className="rounded-md bg-white px-6 py-3 font-semibold text-black"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="mt-1 text-gray-400">
            View expense totals across pools and categories
          </p>
        </div>
        {report && !showConfig && (
          <button
            onClick={handleNewReport}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm text-white hover:bg-zinc-900"
          >
            New Report
          </button>
        )}
        {!report && !showConfig && (
          <button
            onClick={() => setShowConfig(true)}
            className="rounded-md bg-gradient-to-br from-cyan-600 to-blue-700 px-5 py-2 text-sm font-semibold text-white"
          >
            Generate Report
          </button>
        )}
      </div>

      {!report && !showConfig ? (
        <div className="rounded-2xl border border-slate-800 bg-zinc-950 p-10 text-center">
          <h2 className="text-xl font-semibold text-white">
            Cross-pool expense summary
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-400">
            Generate a report across your expense pools with category-wise
            totals. Team pools are excluded by default.
          </p>
          <button
            onClick={() => setShowConfig(true)}
            className="mt-6 rounded-md bg-gradient-to-br from-cyan-600 to-blue-700 px-6 py-3 font-semibold text-white"
          >
            Generate Report
          </button>
        </div>
      ) : null}

      {showConfig ? (
        <ReportConfigForm
          pools={pools}
          onGenerate={handleGenerate}
          isLoading={reportStatus === "loading"}
        />
      ) : null}

      {report && !showConfig ? (
        <div className="space-y-6">
          <CategoryTotalsSummary report={report} />
          <ReportPivotTable report={report} />
        </div>
      ) : null}
    </div>
  );
};

export default ReportsPage;
