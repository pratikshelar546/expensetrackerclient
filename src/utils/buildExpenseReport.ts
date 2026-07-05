import { EXPENSE_CATEGORIES, getCategoryDotClass } from "@/constants/expenseCategories";
import { ExpenseReportData } from "@/assets/commanInterface/ComonInterface";

export function formatReportAmount(amount: number) {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function buildPivotTable(report: ExpenseReportData) {
  const categories = [...EXPENSE_CATEGORIES];
  const columnTotals = categories.map(
    (category) => report.columnTotals[category] || 0
  );

  const rows = report.pools.map((pool) => ({
    ...pool,
    cells: categories.map((category) => pool.categoryTotals[category] || 0),
  }));

  return {
    categories,
    rows,
    columnTotals,
    grandTotal: report.grandTotal,
  };
}

export function buildCategorySummary(report: ExpenseReportData) {
  const items = EXPENSE_CATEGORIES.map((category) => ({
    category,
    total: report.columnTotals[category] || 0,
    dotClass: getCategoryDotClass(category),
  }))
    .filter((item) => item.total > 0)
    .sort((a, b) => b.total - a.total);

  return {
    items,
    grandTotal: report.grandTotal,
  };
}
