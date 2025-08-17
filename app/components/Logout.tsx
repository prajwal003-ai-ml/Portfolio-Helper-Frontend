'use client'
import React from 'react'
import { useLogoutStore } from '../contexts/UseLogout'

const Logout = () => {

    const setIsopen = useLogoutStore(s=>s.setIsopen)

    const HandleOutSideClick =()=>{
        setIsopen(false)
    }

    const HandleInnerClick = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation()
    }
  return (
    <div onClick={HandleOutSideClick} className='fixed inset-0 flex justify-center items-center p-4 z-50  backdrop-blur-sm'>
        <div onClick={HandleInnerClick} className='p-3 w-full md:w-[30rem] bg-[#00000085] rounded-xl'>
            <h3 className='text-xl font-semibold text-gray-200'>
                Logout
            </h3>
            <h5 className='text-sm font-semibold py-3 text-gray-300'>
                Do You Want To Logout From Current Session?
            </h5>
            <div className='flex justify-end gap-2 items-center'>
                    <button onClick={HandleOutSideClick} className='text-sm font-semibold p-1 px-4 rounded bg-gray-700 cursor-pointer'>
                        Decline
                    </button>
                    <button onClick={()=>{
                        localStorage.removeItem('token')
                        window.location.reload()
                    }} className='text-sm font-semibold p-1 px-4 rounded bg-blue-900 cursor-pointer'>
                        Logout
                    </button>
            </div>
        </div>
    </div>
  )
}

export default Logout