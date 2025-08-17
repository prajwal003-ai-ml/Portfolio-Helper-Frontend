'use client'
import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { useUserdata } from '@/app/contexts/userdata'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'



const page = () => {

    const [Loading, setLoading] = useState(false)
    const [Password, setPassword] = useState('')


    const navigate = useRouter()

    const params = useParams()





    const HandleSendEmail = async () => {
        if (Loading) {
            return
        }
        try {
            const get = await api.post(`/auth/change-password/${params.token}`,{
                password:Password
            })


            toast.success('Please Now Login With New Password')
            navigate.push('/login')
           
        } catch (error) {
            toast.error('Something went Wrong Try Again')

            navigate.push('/login')
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full' >
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-2xl font-bold mb-4'>Change Password</h1>
                <p className='text-gray-600 mb-6'>Please Do Not Change Your Link , Please !!</p>
                <input
                    type="password"
                    placeholder="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 w-full p-2 border border-gray-300 rounded outline-none "
                />
                <button onClick={HandleSendEmail} className='px-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
                    {Loading ? "Changing" : " Change Password"}
                </button>

            </div>
        </div>
    )
}

export default page