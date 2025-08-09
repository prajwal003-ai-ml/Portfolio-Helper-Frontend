'use client'
import React from 'react'
import { motion } from 'framer-motion'

interface data {
    Skill: string;
    idx: number
}

const TechCard = ({ Skill = '[SkillName]', idx }: data) => {
    return (
        <motion.div initial={{
            opacity: 0,
            y: 40
        }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: .4,
                    delay: .3 * idx
                }
            }}
            viewport={{ once: true }}
            className='py-1 px-5 text-sm rounded-xl cursor-pointer hover:bg-gradient-to-bl transition-shadow duration-300 bg-gradient-to-l via-gray-800  from-gray-600 to-gray-900 glass border border-solid border-gray-800'>{Skill}</motion.div>
    )
}

export default TechCard