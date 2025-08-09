import Link from 'next/link'
import React from 'react'


interface data {
    Email:string
}
const GetInTouch = ({Email="#"}:data) => {
  return (
    <div className='bg-gray-900 rounded py-10 mb-4 px-2 flex justify-center items-center flex-col gap-2'>
        <h2 className='text-xl font-semibold'> GetI<span className='text-orange-400'>nTouch</span></h2>
        <Link href={`mailto:${Email}`} className='py-2 text-sm font-semibold bg-orange-600 hover:shadow-2xl shadow-amber-700 px-20 rounded '>
        Mail Me
        </Link>
    </div>
  )
}

export default GetInTouch