import React from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Wrapper from './wrapper'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (

    <Wrapper>
      <Navbar />
      <SideBar />
      <div className='min-h-[100dvh] pt-16 px-4 md:px-8'>
        {children}
      </div>
    </Wrapper>

  )
}

export default layout