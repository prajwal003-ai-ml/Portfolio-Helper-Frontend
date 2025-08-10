'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Loading, setLoading] = useState(false)

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    
    setTimeout(() => {
      setLoading(false)
      alert(`Logged in with Email: ${Email} and Password: ${Password}`)
    }, 2000)
  }

  return (
    <div>
      <h2 className='text-2xl text-center font-bold mb-4'>
        Login
      </h2>
      <form onSubmit={HandleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-full p-2 border border-gray-300 rounded outline-none "
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-full p-2 border border-gray-300 rounded outline-none "
        />
        <div className='flex justify-between items-center mb-2'>
          <p className='text-xs text-gray-500'>
            Don't have an account? <Link href='/register' className='text-orange-700'>Register</Link>
          </p>
        </div>
        <button className='w-full p-2 border border-gray-700 rounded bg-[#ffffff18] text-white cursor-pointer hover:bg-[#ffffff2c]' type="submit">
          {Loading ? 'Logging in...' : 'Login'}
        </button>
        <div className='text-sm text-gray-500 mt-2 text-center'>
          <div  className='text-orange-700 cursor-pointer'>Forgot Password?</div>
        </div>
      </form>
    </div>
  )
}

export default page