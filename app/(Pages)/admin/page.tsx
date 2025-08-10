
import { Metadata } from 'next'
import React from 'react'
import Body from './Components/Body'

export const metadata: Metadata = {
  title: 'Your Api Data controll',
  description: "Your Api is all here make it secure or controll data here  , Portfolio Helper is here to help you for api "
}

const page = () => {
  return (
    <div className='bg-black shadow-2xl min-h-[90dvh] rounded-2xl'>
      <h2 className='text-center text-xl md:2xl font-semibold py-4 border-b border-solid border-gray-800'>
        Manage<span className='text-orange-400'>User</span>
      </h2>
      <Body />
    </div>
  )
}

export default page