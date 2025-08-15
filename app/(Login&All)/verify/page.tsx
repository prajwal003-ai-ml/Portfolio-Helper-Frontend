'use client'
import api from '@/app/axios'
import React, { useState } from 'react'



const page = () => {

    const [Loading, setLoading] = useState(false)
    const [Message, setMessage] = useState('if its first time just click resend email')

    const HandleSendEmail =async ()=>{
        if(Loading){
            return
        }
        try {
            const get = await api.get('/auth/verify-email-request')
            setMessage("Email Sent Succesfully")
        } catch (error) {
            setMessage('Something Went Wrong')
        }
        finally{
            setLoading(false)
        }
    }
    return (
        <div className='w-full' >
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-2xl font-bold mb-4'>Verify Your Account</h1>
                <h2 className='text-xl font-semibold mb-4 text-orange-600'>{Message}</h2>
                <p className='text-gray-600 mb-6'>Please check your email for the verification link.</p>
                <button onClick={HandleSendEmail} className='px-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
                   {Loading?"Wait Being Sent":" Resend Verification Email"}
                </button>
                <button onClick={()=>{
                    localStorage.removeItem('Token')
                    window.location.reload()
                }} className='px-4 py-2 my-3 w-full bg-[#80808015] text-white rounded hover:bg-[#80808042]'>
                   Logout
                </button>
            </div>
        </div>
    )
}

export default page