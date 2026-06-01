/** Legacy categories (unchanged) + newer expense categories (aligned with backend enum). */
export const EXPENSE_CATEGORIES = [
  "Transport",
  "Food",
  "Fixed Expense",
  "Other Expenses",
  "Housing & Rent",
  "Groceries",
  "Health & Medical",
  "Utilities & Bills",
  "Shopping",
  "Entertainment",
  "Personal Care",
  "Travel",
  "Subscriptions",
  "SIP",
  "Emergency Fund",
  "Fixed Deposit",
  "Other Investment",
  "Education & Learning",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export type CategoryGroup = "NEEDS" | "WANTS" | "SAVINGS";

export const CATEGORY_GROUPS: Record<
  CategoryGroup,
  { categories: readonly string[]; budgetShare: number; dotClass: string }
> = {
    NEEDS: {
      categories: [
        "Transport",
        "Housing & Rent",
        "Groceries",
        "Health & Medical",
        "Utilities & Bills",
        "Fixed Expense",
      ],
      budgetShare: 0.5,
      dotClass: "bg-emerald-500",
    },
    WANTS: {
      categories: [
        "Food",
        "Shopping",
        "Entertainment",
        "Personal Care",
        "Travel",
        "Other Expenses",
      ],
      budgetShare: 0.3,
      dotClass: "bg-purple-500",
    },
    SAVINGS: {
      categories: [
        "Subscriptions",
        "SIP",
        "Emergency Fund",
        "Fixed Deposit",
        "Other Investment",
        "Education & Learning",
      ],
      budgetShare: 0.2,
      dotClass: "bg-orange-500",
    },
};

export function getCategoryGroup(category: string): CategoryGroup {
  for (const [group, config] of Object.entries(CATEGORY_GROUPS) as [
    CategoryGroup,
    (typeof CATEGORY_GROUPS)[CategoryGroup],
  ][]) {
    if (config.categories.includes(category)) return group;
  }
  return "WANTS";
}

export function getCategoryDotClass(category: string): string {
  return CATEGORY_GROUPS[getCategoryGroup(category)].dotClass;
}