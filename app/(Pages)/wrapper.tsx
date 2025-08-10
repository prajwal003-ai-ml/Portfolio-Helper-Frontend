'use client'
import React, { useEffect, useState } from 'react'
import { useLogoutStore } from '../contexts/UseLogout'
import Logout from '../components/Logout'
import { useUserdata } from '../contexts/userdata'

import LoadingComponent from '../components/Loading'
import { useRouter } from 'next/navigation'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const isOpen = useLogoutStore(s => s.isOpen)

  const isAuthorized = useUserdata(s => s.IsAuthorized)
  const user = useUserdata(s => s.user)

  const [Loading, setLoading] = useState(true)

  const navigate = useRouter()

  useEffect(() => {
    if (!isAuthorized) {
      navigate.push('/login')
      setLoading(false)
    } else if (!user.IsVerified) {
      navigate.push('/verify')
      setLoading(false)
    }else{
      setLoading(false)
    }
  }, [isAuthorized])

  if (Loading) {
    return <LoadingComponent />
  }

  return (
    <div>
      {
        isOpen &&
        <Logout />
      }
      {children}
    </div>
  )
}

export default Wrapper