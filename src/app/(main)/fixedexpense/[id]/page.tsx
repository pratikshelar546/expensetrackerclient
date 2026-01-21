import ExpensePool from '@/components/FixedExpenses/ExpensePool/ExpensePool'
import CustomProvider from '@/CustomProvider/CustomProvider'
import React from 'react'

const FixedExpensePoolPage = ({ params }: { params: { id: string } }) => {
    return (
        <>
        <CustomProvider>

            <ExpensePool fieldId={params.id} />
        </CustomProvider>
        </>
    )
}

export default FixedExpensePoolPage