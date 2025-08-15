'use client'
import React from 'react'
import { useDialogBox } from '../contexts/useDialogBox'

const Dialog = () => {

    const data = useDialogBox(s=>s.data)

    const hide = useDialogBox(s=>s.Hide)

    const isShowing = useDialogBox(s=>s.isShowing)

    return (
        <div onClick={hide} className={`${isShowing?"flex":'hidden'} fixed inset-0  justify-center items-center p-4 z-50  backdrop-blur-sm`}>
            <div onClick={(e)=>{e.stopPropagation()}} className='p-6 w-full md:w-[30rem] bg-[#000000d5] shadow-2xl rounded-xl'>
                <h3 className='text-xl font-semibold text-gray-200'>
                    {data.Title}
                </h3>
                <h5 className='text-sm font-semibold py-3 text-gray-300'>
                   {data.Description}
                </h5>
                <div className='flex justify-end gap-2 items-center'>
                    <button onClick={()=>{
                        data.Reject()
                        hide()
                    }} className='text-sm font-semibold p-1 px-4 rounded bg-gray-700 cursor-pointer'>
                        Decline
                    </button>
                    <button onClick={()=>{
                        data.Accept()
                        hide()
                    }} className='text-sm font-semibold p-1 px-4 rounded bg-blue-900 cursor-pointer'>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dialog