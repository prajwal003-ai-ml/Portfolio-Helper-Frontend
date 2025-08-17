import Link from 'next/link';
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa6';

interface data {
    Phone: string;
    Whatsapp: string
    Facebook: string
    Instagram: string
    Github: string
    LinkedIn: string
    Twitter: string
}

const Footer = ({ Facebook = '#', Github = "#", Instagram = "#", LinkedIn = "#", Phone = "9800000000", Twitter = "#", Whatsapp = "9800000000" }: data) => {
    return (
        <div className=' border-t border-solid border-gray-700 py-12 '>
            <h3 className='text-center font-semibold text-2xl pb-7'>
                Contact <span className='text-orange-500'>Me</span>
            </h3>
            <div className='flex flex-wrap justify-center items-center gap-4'>
                <Link target='_blank' href={`https://wa.me/${Whatsapp}`} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaWhatsapp size={'1.4rem'} className='text-green-500' /> {Whatsapp}
                </Link>
                <Link href={`#`} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaPhone size={'1.4rem'} className='text-blue-800' /> {Phone}
                </Link>
            </div>
            <div className='flex justify-center items-center flex-wrap gap-7 py-2'>
                <Link target='_blank' href={Facebook} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaFacebook size={'2rem'} className='text-blue-800' /> 
                </Link>
                <Link target='_blank' href={Twitter} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaTwitter size={'2rem'} className='text-gray-900' /> 
                </Link>
                <Link target='_blank' href={LinkedIn} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaLinkedin size={'2rem'} className='text-blue-700' /> 
                </Link>
                <Link target='_blank' href={Github} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaGithub size={'2rem'} className='text-slate-900' /> 
                </Link>
                <Link target='_blank' href={Instagram} className='text-gray-400 font-black text-sm flex justify-center items-center'>
                    <FaInstagram size={'2rem'} className='text-red-600' /> 
                </Link>
            </div>
        </div>
    )
}

export default Footer