'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SkillCard from './SkillCard';
import { IoLogoGithub, IoLogoWebComponent } from 'react-icons/io5';
import Link from 'next/link';
import TechCard from './TechCard';

interface data {
    Image: string;
    Details: string;
    Reason: string;
    Github: string;
    Live: string;
    TechStack: string[]
    idx: number;
}

const ProjectCard = ({ Image = '#', idx, Details = 'This is dummy details details is all about your project this is necessary part so please fill up', Github = "#", Live = "#", Reason = "Usually here you write what is the reason to make that projects", TechStack = ['stack1', 'stack2', 'stack3', 'stack4'] }: data) => {
    return (
        <motion.div initial={{
            opacity: 0,
            y: 80
        }}
            whileInView={{
                opacity: 1,
                y: 0,

                transition: {
                    duration: .5,
                    delay: .4 * idx,
    
                }
            }}

          className='flex flex-col gap-1 w-full sm:w-[26rem] bg-gray-950 rounded  py-3 px-1 h-full'
        >
            <img src={Image} alt="." className='bg-gray-800 rounded h-80 w-full object-center object-cover ' />
            <p className='text-justify  px-1 text-sm text-gray-200'>
                {Details}
            </p>
            {
                Reason?.length > 1 &&
                <div className='px-1'>
                    <h2 className='text-xl font-semibold my-2'>
                        Rea<span className='text-orange-400'>son</span>
                        <p className='text-justify font-light text-sm text-gray-200'>
                            {Reason}
                        </p>
                    </h2>
                </div>
            }
            <div className='flex flex-wrap gap-2 px-1 mb-4'>
                {TechStack?.map((itm, idx) => <TechCard Skill={itm} idx={idx} key={idx} />)}
            </div>
            <div className='flex justify-between px-1'>
                <Link href={Github} className='cursor-pointer text-sm p-2 px-6 rounded bg-gray-900 hover:bg-gray-800 transition-all duration-200 flex justify-center items-center'>
                    <IoLogoGithub size={'1.3rem'} />Github
                </Link>
                <Link href={Live} className='cursor-pointer text-sm p-2 px-6 rounded bg-gray-900 hover:bg-gray-800 transition-all duration-200 flex justify-center items-center'>
                    <IoLogoWebComponent size={'1.3rem'} />Demo Link
                </Link>
            </div>
        </motion.div>
    )
}

export default ProjectCard