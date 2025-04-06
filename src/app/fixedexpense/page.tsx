
import { FixedExpense } from '@/components/FixedExpenses/FixedExpenses'
import React from 'react'
import type { Metadata } from "next";
import CustomProvider from '@/CustomProvider/CustomProvider';


export const metadata: Metadata = {
    title: "Add Your Monthly Fixed Expenses",
    description:
        "Add Your Monthly Fixed Expenses – Rent, Bills, Subscriptions & More",
};
const FixedExpenses = () => {

    return (
        <>
            <CustomProvider>

                <FixedExpense />
            </CustomProvider>
        </>
    )
}

export default FixedExpenses