
import { Metadata } from 'next'
import React from 'react'
import Body from './components/Body'

export const metadata:Metadata ={
  title:'Add Your Project',
  description:'Add-Project page for the Portfolio helper,Add your project details completely to make it work perfect , this project will be available to you via api ,',
}

const page = () => {
  return (
    <div className='bg-black shadow-2xl min-h-[90dvh] rounded-2xl'>
      <h2 className='text-center text-xl md:2xl font-semibold py-4 border-b border-solid border-gray-800'>
        Add <span className='text-orange-400'>Projects</span>
      </h2>
      <Body/>
    </div>
  )
}

export default page