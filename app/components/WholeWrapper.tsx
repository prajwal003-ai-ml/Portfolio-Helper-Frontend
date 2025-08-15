'use client'
import React, { useEffect, useState } from 'react'
import api from '../axios'
import LoadingComponent from './Loading'
import { User, useUserdata } from '../contexts/userdata'

const WholeWrapper = ({children}:{children:React.ReactNode}) => {

    const [Loading, setLoading] = useState(true)

    const setUser = useUserdata(s=>s.setUser)

    const setIsAUthorized = useUserdata(s=>s.setAuthorized) 

    useEffect(()=>{
        api.get('/auth/me').then((d)=>{
            const data:User  = d.data.data
            setUser(data)
            setIsAUthorized(true)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setLoading(false)
        })

    },[])

    if(Loading) return <LoadingComponent/>
  return (
    <div>{children}</div>
  )
}

export default WholeWrapper