
import React from 'react'
import Body from './Components/Body'

const page = () => {

  return (
    <div className='bg-black shadow-2xl min-h-[90dvh] rounded-2xl'>
      <h2 className='text-center text-xl md:2xl font-semibold py-4 border-b border-solid border-gray-800'>
        Manage <span className='text-orange-400'>Project</span>
      </h2>
      <Body />
    </div>
  )
}

export default page