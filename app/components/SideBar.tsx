'use client'
import React from 'react'
import { useNavData } from '../contexts/useNavbar'
import Link from 'next/link'
import { IoLogOut } from 'react-icons/io5'
import { useLogoutStore } from '../contexts/UseLogout'

const SideBar = () => {
   const isOpen = useNavData(s => s.isOpen)
   const setisOpen = useNavData(s => s.setIsopen)

   const setLogoutOpen = useLogoutStore(s => s.setIsopen)

   const HandleLogoutOpen = () => {
      setLogoutOpen(true)
   }
   return (
      <div onClick={()=>{
         setisOpen(false)
      }} className={`fixed z-20 ${isOpen ? 'flex' : 'hidden'}  right-0 shadow-2xl top-0 left-0 bottom-0 `}>
         <div onClick={(e)=>{e.stopPropagation()}} className='w-[20rem] flex justify-between pb-6 flex-col bg-black shadow-gray-800 pt-16'>
            <div className='flex-1 flex gap-2 items-center flex-col font-semibold text-sm text-gray-300 '>
               <Link href={'/add-projects'} className='bg-[#8080802d] hover:bg-[#80808048] p-2 flex justify-center items-center w-[19rem] rounded-2xl'>
                  Add Projects
               </Link>
               <Link href={'/add-data'} className='bg-[#8080802d] hover:bg-[#80808048] p-2 flex justify-center items-center w-[19rem] rounded-2xl'>
                  Manage Data
               </Link>
               <Link href={'/portfolio'} className='bg-[#8080802d] hover:bg-[#80808048] p-2 flex justify-center items-center w-[19rem] rounded-2xl'>
                  Public Portfolio
               </Link>

            </div>
            <div className='pt-8 border-t border-gray-600 border-solid flex justify-center items-center'>
               <button onClick={HandleLogoutOpen} className='w-[19rem] bg-[#f3f0f01a] p-2 rounded hover:bg-gray-950 cursor-pointer flex justify-center items-center gap-1'>
                  Logout <IoLogOut size={'1.2rem'} />
               </button>
            </div>
         </div>
      </div>
   )
}

export default SideBar