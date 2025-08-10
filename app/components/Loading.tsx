import React from 'react'
import { BiLoader } from 'react-icons/bi'

const LoadingComponent = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <BiLoader className='animate-spin' size={'3rem'} />
    </div>
  )
}

export default LoadingComponent