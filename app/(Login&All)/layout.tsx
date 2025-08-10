import { Metadata } from 'next'
import React from 'react'
import Wrapper from './Components/Wrapper'


export const metadata: Metadata = {
  title: 'Portfolio Helper - Auth Page',
  description: 'Login or Register to access your portfolio',
}

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <div className='h-screen w-screen flex items-center justify-center p-3'>
        <div className='p-3 rounded bg-[#ffffff17] shadow-xl border border-solid border-gray-800 md:w-[400px] w-full'>
          {children}
        </div>
      </div>
    </Wrapper>
  )
}

export default layout