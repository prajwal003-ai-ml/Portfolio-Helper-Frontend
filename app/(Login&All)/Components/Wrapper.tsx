'use client'
import LoadingComponent from '@/app/components/Loading'
import { useUserdata } from '@/app/contexts/userdata'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const [Loading, setLoading] = useState(true)

    const isAuthorized = useUserdata(s => s.IsAuthorized)
    const user = useUserdata(s => s.user)

    const navigate = useRouter()

    const pathName = usePathname()

    useEffect(() => {
        if (!isAuthorized) {
            if (pathName == '/verify') {
                navigate.push('/login')
                setLoading(false)
            } else {
                  setLoading(false)
            }
        } else {
            if (user.IsVerified) {
                navigate.push('/admin')
                setLoading(false)
            } else {
                navigate.push('/verify')
                setLoading(false)
            }
        }
    }, [isAuthorized, user.IsVerified])

    if (Loading) { return <LoadingComponent /> }
    return (
        <div>{children}</div>
    )
}

export default Wrapper