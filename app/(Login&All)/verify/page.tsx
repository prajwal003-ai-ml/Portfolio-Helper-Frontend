import React from 'react'

const page = () => {
    return (
        <div className='w-full' >
            <div className='flex flex-col items-center justify-center h-full'>
                <h1 className='text-2xl font-bold mb-4'>Verify Your Account</h1>
                
                <p className='text-gray-600 mb-6'>Please check your email for the verification link.</p>
                <button className='px-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
                    Resend Verification Email
                </button>
                <button className='px-4 py-2 my-3 w-full bg-[#80808015] text-white rounded hover:bg-[#80808042]'>
                   Logout
                </button>
            </div>
        </div>
    )
}

export default page