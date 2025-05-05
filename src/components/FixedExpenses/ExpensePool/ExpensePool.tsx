"use client"
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../Hooks'
import { getFieldById } from '@/Redux/Slices/FieldSlice';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { expenseField, tableRow } from '@/assets/commanInterface/ComonInterface';
import CommanExpensesTable from '@/CommonComponent/ExpenseTable/ExpenseTable';
import ExpensesTable from '@/components/ManageExpenses/ExpensesTable';

const ExpensePool = ({ fieldId }: { fieldId: string }) => {
    const dispatch = useAppDispatch();
    const { data: session, status } = useSession();
    const [field, setField] = useState<expenseField>(
        {
            _id: "",
            fieldId: "",
            fieldName: "",
            RecivedAmount: 0,
            balance: null,
        }
    )
    const [expenseData, setExpenseData] = useState<tableRow[]>([])

    const fetchAllExpenses = async () => {
        if (status === "unauthenticated") {
            return
        }
        if (session?.user.token === null) return
        const response = await dispatch(
            getFieldById({ id: fieldId, token: session?.user?.token })
        )

        if (getFieldById.fulfilled.match(response)) {
            setField(response.payload.field);
            setExpenseData(response.payload.field.expenses as tableRow[])
        }
    }
    useEffect(() => {
        if (status === "unauthenticated") return
        if (status !== "loading") {

            fetchAllExpenses()
        }

    }, [status, fieldId])

    // const handleAddExpense = 
    return <ExpensesTable id={fieldId} />
}

export default ExpensePool