'use client'
import React from 'react'
import { useLogoutStore } from '../contexts/UseLogout'
import Logout from '../components/Logout'

const Wrapper = ({children}:{children:React.ReactNode}) => {
    const isOpen = useLogoutStore(s=>s.isOpen)
  return (
    <div>
        {
            isOpen&&
            <Logout/>
        }
        {children}
    </div>
  )
}

export default Wrapper