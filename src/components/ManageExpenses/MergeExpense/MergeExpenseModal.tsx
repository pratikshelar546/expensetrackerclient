"use client"
import DynamicModal from '@/CommonComponent/DynamicModal'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../Hooks'
import { getField } from '@/Redux/Slices/FieldSlice'
import { useSession } from 'next-auth/react'
import { getAllExpenses } from '@/Redux/Slices/ExpensesSlice'
import { tableRow } from '@/assets/commanInterface/ComonInterface'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import formatDate from '@/Hooks/useFormatDate'
import { FaPlus } from 'react-icons/fa'
import { IoRemove } from 'react-icons/io5'
const MergeExpenseModal = ({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
    return (
        <>
            {open && <DynamicModal open={open} setOpen={setOpen} title='Merge Fixed Expenses into Expense Pool' btnTitle='Merge' btnAction={() => { }} component={<FixedExpenseList />} />}
        </>
    )
}

export default MergeExpenseModal


function FixedExpenseList() {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const [expenses, setExpeses] = useState<tableRow[]>([]);
    const [mergeExpense, setMergeExpense] = useState<tableRow[]>([])
    const fetchExpenses = async () => {
        const field = await dispatch(getField({ token: session?.user?.token || "", fieldType: "Primary" }))
        const data = await dispatch(getAllExpenses(field?.payload[0]?._id));
        // console.log(data);

        if (getAllExpenses.fulfilled.match(data)) {

            setExpeses(data?.payload.expensesList)
        }
    }
    useEffect(() => {
        fetchExpenses();
    }, [])
    // console.log(expenses);

    const column = [
        { field: 'desc', headerName: "Description", flex: 1 },
        {
            field: 'price', headerName: "Amount", flex: 1,
            valueFormatter: (params: Number) => (
                params?.toLocaleString('en-IN')
            )
        },
        {
            field: 'date', headerName: "Date", flex: 1,
            valueFormatter: (params: Date) => {
                return formatDate(params)
            },
            // renderCell: () => {

            // }
        },
        { field: 'category', headerName: "Category", flex: 1 },
        {
            field: '_id',
            headerName: 'Add',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const isMerged = mergeExpense.some(
                    (expense) => expense._id === params.row._id
                );

                const handleClick = () => {
                    setMergeExpense((prev) => {
                        if (isMerged) {
                            // Remove item if already present
                            return prev.filter((expense) => expense._id !== params.row._id);
                        } else {
                            // Add item if not present
                            return [...prev, params.row];
                        }
                    });
                };

                return (
                    <div className='flex justify-center items-center h-full'>

                        <button
                            onClick={handleClick}
                            className="flex gap-2 justify-center items-center text-sm font-medium text-white "
                        >
                            {isMerged ? (
                                <>
                                    <IoRemove  />
                                    <span>Remove</span>
                                </>
                            ) : (
                                <>
                                    <FaPlus />
                                    <span>Add</span>
                                </>
                            )}
                        </button>
                    </div>
                );
            },
        }

    ]
    console.log(mergeExpense);

    return (
        <>
            <div className='h-full max-h-[400px] w-full'>

                {expenses?.length > 0 && <DataGrid columns={column} rows={expenses} initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                    pageSizeOptions={[10]}
                    getRowId={(row) => row._id}
                />}
            </div>
        </>
    )
}