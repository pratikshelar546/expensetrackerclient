"use client"
import { expenseField } from '@/assets/commanInterface/ComonInterface';
import MergeExpenseModal from '@/components/ManageExpenses/MergeExpense/MergeExpenseModal';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoGitMergeOutline } from 'react-icons/io5';
import { MdAdd, MdDelete } from 'react-icons/md';

const FLoatingButton = ({ field, fetchAllExpenses }: { field: expenseField, fetchAllExpenses: (fieldId: string) => Promise<void>; }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    // const data
    const actions = [
        { icon: <MdDelete />, name: 'Delete Expense pool', visibility: field.fieldType === "Primary" ? true : true },
        { icon: <MdAdd />, name: 'Add expense', visibility: field.fieldType === "Primary" ? true : true },
        { icon: <IoGitMergeOutline />, name: 'Merge Fixed expenses', onclick: () => setOpen(open => !open), visibility: field.fieldType === "Primary" ? false : true },
        { icon: <MdAdd />, name: 'Add Fixed expenses', onclick: () => router.push("/fixedexpense"), visibility: field.fieldType === "Primary" ? false : true },

    ];
    return (
        <>
            {open && <MergeExpenseModal open={open} setOpen={setOpen} fieldId={field._id} fetchAllExpenses={fetchAllExpenses} />}
            <SpeedDial ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 70, right: 30 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    action.visibility && <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onclick}
                    // sx={{}}
                    />
                ))}
            </SpeedDial>
        </>
        // <div className='text-white bottom-28 right-7 absolute z-50 '>
        //     <div className='relative border border-white rounded-full w-16 h-16 flex justify-center items-center ' title='hoer'>
        //         <Tooltip title="Add Fixed expenses" slots={{
        //             transition: Zoom,
        //         }}>

        //             <FaPlus size={"2em"} className=' hover:rotate-90 duration-500 transition' />
        //         </Tooltip>

        //     </div>
        // </div>
    )
}

export default FLoatingButton