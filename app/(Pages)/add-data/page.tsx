
import { Metadata } from 'next'
import React from 'react'
import Body from './Components/Body'

export const metadata:Metadata ={
  title:'Add Your Details',
  description:'Add-Details page for the Portfolio helper,Add your  details completely to make it work perfect , this Details will be available to you via api ,',
}

const page = () => {
  return (
    <div className='bg-black shadow-2xl min-h-[90dvh] rounded-2xl px-3'>
      <h2 className='text-center text-xl md:2xl font-semibold py-4 border-b border-solid border-gray-800'>
        Add Or <span className='text-orange-400'>Manage Data</span>
      </h2>
      <Body/>
    </div>
  )
}

export default page