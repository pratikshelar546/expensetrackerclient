"use client"
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useRouter } from 'next/navigation';
import { IoGitMergeOutline } from 'react-icons/io5';
import { MdAdd, MdDelete } from 'react-icons/md';

const FLoatingButton = () => {
    const router = useRouter();
    // const data
    const actions = [
        { icon: <MdDelete />, name: 'Delete Expense pool' },
        { icon: <MdAdd />, name: 'Add expense' },
        { icon: <IoGitMergeOutline />, name: 'Merge Fixed expenses', onclick: () => router.push("/fixedexpense") },
        { icon: <MdAdd />, name: 'Add Fixed expenses', onclick: () => router.push("/fixedexpense") },

    ];
    return (
        <>
            <SpeedDial ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 70, right: 30 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
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