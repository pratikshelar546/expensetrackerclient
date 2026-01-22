import { tableRow } from '@/assets/commanInterface/ComonInterface';

/**
 * Interface for user balance information
 */
interface UserBalance {
  userId: string;
  userName: string;
  balance: number; // Positive = should receive, Negative = should pay
}

/**
 * Interface for settlement transaction
 */
export interface Settlement {
  from: string;
  to: string;
  amount: number;
}

/**
 * Interface for settlement result
 */
export interface SettlementResult {
  userBalances: Record<string, { name: string; spent: number; share: number; balance: number }>;
  totalAmount: number;
  averageShare: number;
  settlements: Settlement[];
}

/**
 * Round to 2 decimal places to handle floating-point precision issues
 */
const roundToTwo = (value: number): number => {
  return Math.round(value * 100) / 100;
};

/**
 * Calculate expense settlements using Splitwise-style greedy algorithm
 * 
 * @param expenses - Array of expense objects
 * @param participants - Optional array of participant user IDs. If not provided, 
 *                      all users who have expenses will be considered participants
 * @returns SettlementResult with balances and transactions
 */
export const calculateSettlements = (
  expenses: tableRow[],
  participants?: string[]
): SettlementResult => {
  // Edge case: No expenses
  if (!expenses || expenses.length === 0) {
    return {
      userBalances: {},
      totalAmount: 0,
      averageShare: 0,
      settlements: [],
    };
  }

  // Step 1: Calculate total spent per user
  const userSpending = new Map<string, { name: string; total: number }>();
  
  expenses.forEach((expense) => {
    const userId = (expense as any).userId || expense.userName || 'unknown';
    const userName = expense.userName || 'Unknown User';
    const price = expense.price || 0;
    
    if (userSpending.has(userId)) {
      const current = userSpending.get(userId)!;
      current.total = roundToTwo(current.total + price);
    } else {
      userSpending.set(userId, { name: userName, total: roundToTwo(price) });
    }
  });

  // Step 2: Determine participants
  // If participants list is provided, include all participants (even if they have 0 expenses)
  // Otherwise, use all users who have expenses
  const participantSet = new Set<string>();
  
  if (participants && participants.length > 0) {
    participants.forEach((userId) => participantSet.add(userId));
  } else {
    userSpending.forEach((_, userId) => participantSet.add(userId));
  }

  // Ensure all participants are in userSpending map (for users with 0 expenses)
  participantSet.forEach((userId) => {
    if (!userSpending.has(userId)) {
      userSpending.set(userId, { name: 'Unknown User', total: 0 });
    }
  });

  // Edge case: Need at least 2 participants
  if (participantSet.size < 2) {
    const userBalances: Record<string, { name: string; spent: number; share: number; balance: number }> = {};
    userSpending.forEach((user, userId) => {
      userBalances[userId] = {
        name: user.name,
        spent: user.total,
        share: user.total,
        balance: 0,
      };
    });

    return {
      userBalances,
      totalAmount: roundToTwo(Array.from(userSpending.values()).reduce((sum, u) => sum + u.total, 0)),
      averageShare: roundToTwo(Array.from(userSpending.values()).reduce((sum, u) => sum + u.total, 0)),
      settlements: [],
    };
  }

  // Step 3: Calculate total amount and average share per person
  const totalAmount = roundToTwo(
    Array.from(userSpending.values()).reduce((sum, user) => sum + user.total, 0)
  );
  const participantCount = participantSet.size;
  const averageShare = roundToTwo(totalAmount / participantCount);

  // Step 4: Calculate net balance for each user (Amount Spent - Share)
  const balances: UserBalance[] = [];
  const userBalances: Record<string, { name: string; spent: number; share: number; balance: number }> = {};

  participantSet.forEach((userId) => {
    const user = userSpending.get(userId)!;
    const balance = roundToTwo(user.total - averageShare);
    
    userBalances[userId] = {
      name: user.name,
      spent: user.total,
      share: averageShare,
      balance: balance,
    };

    // Only include users with non-zero balance (within precision tolerance)
    if (Math.abs(balance) >= 0.01) {
      balances.push({
        userId,
        userName: user.name,
        balance: balance,
      });
    }
  });

  // Step 5: Greedy Algorithm - Match largest debtor with largest creditor
  // Sort: Creditors (positive balance) descending, Debtors (negative balance) ascending
  const creditors = balances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance);
  const debtors = balances.filter((b) => b.balance < 0).sort((a, b) => a.balance - b.balance);

  const settlements: Settlement[] = [];
  let creditorIndex = 0;
  let debtorIndex = 0;

  // Match largest debtor with largest creditor
  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex];
    const debtor = debtors[debtorIndex];

    // Skip if balance is near zero (precision handling)
    if (Math.abs(creditor.balance) < 0.01) {
      creditorIndex++;
      continue;
    }
    if (Math.abs(debtor.balance) < 0.01) {
      debtorIndex++;
      continue;
    }

    // Calculate settlement amount
    const settlementAmount = roundToTwo(
      Math.min(Math.abs(debtor.balance), creditor.balance)
    );

    // Record transaction
    settlements.push({
      from: debtor.userName,
      to: creditor.userName,
      amount: settlementAmount,
    });

    // Update balances
    debtor.balance = roundToTwo(debtor.balance + settlementAmount);
    creditor.balance = roundToTwo(creditor.balance - settlementAmount);

    // Move pointers if balance is settled
    if (Math.abs(debtor.balance) < 0.01) {
      debtorIndex++;
    }
    if (Math.abs(creditor.balance) < 0.01) {
      creditorIndex++;
    }
  }

  return {
    userBalances,
    totalAmount,
    averageShare,
    settlements,
  };
};
