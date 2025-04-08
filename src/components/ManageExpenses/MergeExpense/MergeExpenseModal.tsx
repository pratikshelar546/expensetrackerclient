"use client"
import DynamicModal from '@/CommonComponent/DynamicModal'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../../Hooks'
import { getField } from '@/Redux/Slices/FieldSlice'
import { useSession } from 'next-auth/react'
import { getAllExpenses } from '@/Redux/Slices/ExpensesSlice'
import { tableRow } from '@/assets/commanInterface/ComonInterface'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import formatDate from '@/Hooks/useFormatDate'
import { FaPlus } from 'react-icons/fa'
import { IoRemove } from 'react-icons/io5'
import axios from 'axios'
import { toast } from 'react-toastify'
const MergeExpenseModal = ({ open, setOpen, fieldId, fetchAllExpenses }: { open: boolean, setOpen: React.Dispatch<SetStateAction<boolean>>, fieldId: string, fetchAllExpenses: (fieldId: string) => Promise<void>; }) => {
    return (
        <>
            {open && <DynamicModal open={open} setOpen={setOpen} title='Merge Fixed Expenses into Expense Pool' btnAction={() => { }} component={<FixedExpenseList fieldId={fieldId} setOpen={setOpen} fetchAllExpenses={fetchAllExpenses} />} />}
        </>
    )
}

export default MergeExpenseModal


function FixedExpenseList({ fieldId, setOpen, fetchAllExpenses }: { fieldId: string, setOpen: React.Dispatch<SetStateAction<boolean>>, fetchAllExpenses: (fieldId: string) => Promise<void> }) {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const [expenses, setExpeses] = useState<tableRow[]>([]);
    const [mergeExpense, setMergeExpense] = useState<tableRow[]>([])
    const [selectedRow, setSelectedRow] = useState([])
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
                                    <IoRemove />
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

    const handleMergeExpense = async () => {
        // console.log('click'); NEXT_PUBLIC_API_URL
        const data = {
            fieldId: fieldId,
            expenseList: selectedRow
        }
        const mergedExpenses = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}expenses/mergeExpense`, data)
        console.log(mergedExpenses);
        if (mergedExpenses.data.success) {

            toast.success(mergedExpenses?.data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setOpen((open) => !open);
            fetchAllExpenses(fieldId)
        }
        // if()

    }
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
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        // @ts-ignore
                        setSelectedRow(newRowSelectionModel);
                    }}
                />}
                <div className='w-full flex justify-end gap-4 mt-5'>
                    <button className='flex px-6 py-2 text-lg font-medium hover:bg-red-500 rounded-lg border border-white hover:border-none'>Cancel</button>
                    <button disabled={selectedRow?.length === 0} className={`flex px-6 py-2 text-lg font-medium bg-blue-700 hover:bg-blue-500 rounded-lg outline-none text-white ${selectedRow?.length === 0 && ' cursor-not-allowed bg-blue-300 text-black'}`} onClick={handleMergeExpense}>Merge</button>
                    {/* <button className='flex px-4 py-3 text-lg font-medium hover:bg-blue-400 rounded-lg border border-white hover:border-none'>Merge All</button> */}
                </div>
            </div>
        </>
    )
}