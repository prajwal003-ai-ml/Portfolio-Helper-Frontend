import Link from 'next/link'
import React from 'react'
interface data {
    DocxLink:string
}

const CheckMyResume = ({DocxLink='#'}:data) => {
  return (
    <div className='my-6 p-8 flex flex-col gap-2 justify-center items-center bg-gray-900 rounded'>
        <h2 className='font-semibold text-gray-200 mb-2 text-sm'>Wanna Know About Me , Click Below</h2>
        <Link href={DocxLink} download className='p-2 px-6 rounded cursor-pointer text-sm font-semibold hover:shadow-2xl shadow-orange-400 bg-orange-400 text-gray-100'>
            Download Resume
        </Link>
    </div>
  )
}

export default CheckMyResume