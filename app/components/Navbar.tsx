'use client'
import React from 'react'
import { useNavData } from '../contexts/useNavbar'
import Link from 'next/link'
import { IoClose, IoMenu } from 'react-icons/io5'


const Navbar = () => {

    const isOpen = useNavData((s)=>s.isOpen)
    const setIsopen = useNavData((s)=>s.setIsopen)
  return (
    <div className='z-30 flex bg-black justify-between items-center px-4 md:px-8 fixed top-0 left-0 right-0 h-14 border-b border-solid border-gray-600'>
        <Link className='text-lg font-semibold text-gray-200 select-none' href={'/'}>Portfolio <span className='text-orange-500'>Helper</span> </Link>
        <button onClick={()=>{
            setIsopen(!isOpen)
        }}>
            {isOpen?
            <IoClose size={'1.4rem'} className='cursor-pointer'/>:
            <IoMenu size={'1.4rem'} className='cursor-pointer'/>    
        }
        </button>
    </div>
  )
}

export default Navbar