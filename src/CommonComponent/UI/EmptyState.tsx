import React from 'react';
import { CreditCard, PiggyBank, Receipt } from 'lucide-react';
import * as motion from "framer-motion/client";
const EmptyState = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gray-800/50 rounded-xl border border-gray-700 shadow-inner mt-10">
            <div className="relative mb-8">
                <div className="absolute -left-12 -top-8 opacity-20">
                    <Receipt className="w-16 h-16 text-purple-400" />
                </div>
                <PiggyBank className="w-20 h-20 text-purple-500 mb-2" />
                <div className="absolute -right-12 -bottom-8 opacity-20">
                    <CreditCard className="w-16 h-16 text-purple-400" />
                </div>
            </div>
            <h3 className="md:text-2xl text-lg font-bold text-white mb-3">No Expense Pools Yet</h3>
            <p className="text-gray-400 max-w-md mb-8 md:text-lg text-sm">
                Create your first expense pool to start tracking your expenses.
                You can organize different areas of your life into separate pools.
            </p>
            <div className="space-y-4">
                <p className="text-gray-500 md:text-lg text-sm">
                    Examples: Household, Travel, Business, Personal
                </p>
            </div>
        </motion.div>
    );
};

export default EmptyState;