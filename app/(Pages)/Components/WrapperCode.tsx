'use client'
import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { useApiStore } from '@/app/contexts/useApiDataStore'
import React, { useEffect, useState } from 'react'





const WrapperCode = ({ children }: { children: React.ReactNode }) => {


    const [Loading, setLoading] = useState(true)

    const setData = useApiStore(s=>s.setData)

    useEffect(()=>{
        api.get
    },[])




    if (Loading) {
        return <LoadingComponent />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default WrapperCode