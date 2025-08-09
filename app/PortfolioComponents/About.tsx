'use client'
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import React from 'react'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa';

interface aboutData {
    Image: string;
    About: string;
    Links: {
        Facebook: string,
        Github: string,
        LinkedIn: string,
    }
}

const About = ({
    Image = "https://tse1.mm.bing.net/th/id/OIP.YGc5ZMk_CWUB9CuIVJlPJwHaEK?pid=Api&P=0&h=220",
    About = "[ I’m a passionate web developer who loves turning ideas into interactive, user-friendly digital experiences. Skilled in modern technologies and always eager to learn, I aim to create applications that are both functional and visually engaging. This section is just a placeholder — replace it with your own story soon! ]",
    Links = { Facebook: '#', Github: "#", LinkedIn: '#' }
}: aboutData) => {

    const imageVariants: Variants = {
        initial: { opacity: 0, y: 80 },
        final: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9 }
        }
    };

    const aboutParent: Variants = {
        initial: { opacity: 0, y: -80 },
        final: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                when: "beforeChildren", // run before icon animation
                staggerChildren: 0.3
            }
        }
    };

    const aboutChild: Variants = {
        initial: { opacity: 0, y: 50 },
        final: { opacity: 1, y: 0 }
    };

    const iconParent: Variants = {
        initial: {},
        final: {
            transition: {
                staggerChildren: 0.6 // icons stagger
            }
        }
    };

    const iconChild: Variants = {
        initial: { opacity: 0, y: 40 },
        final: { opacity: 1, y: 0 }
    };

    return (
        <div className='min-h-[80dvh] flex gap-2 justify-center items-center flex-wrap'>
            <motion.div variants={imageVariants} initial='initial' whileInView='final'>
                <img src={Image} alt="error your image" className='h-96 w-[29rem] rounded-xl object-cover' />
            </motion.div>

            <motion.div
                variants={aboutParent}
                initial="initial"
                whileInView="final"
                viewport={{ once: true }}
                className='max-w-[26rem] text-justify font-semibold text-xs text-gray-200'
            >
                <motion.h2 variants={aboutChild} className='font-semibold text-2xl'>
                    About <span className='text-orange-400'>Me</span>
                </motion.h2>

                <motion.p variants={aboutChild}>
                    {About}
                </motion.p>

                <motion.div
                    variants={iconParent}
                    className='pt-3 flex items-center gap-3'
                >
                    <motion.div variants={iconChild}>
                        <Link href={Links.Facebook}>
                            <FaFacebookF size={'1.7rem'} className='bg-blue-500 rounded' />
                        </Link>
                    </motion.div>
                    <motion.div variants={iconChild}>
                        <Link href={Links.Github}>
                            <FaGithub className='bg-black rounded' size={'1.7rem'} />
                        </Link>
                    </motion.div>
                    <motion.div variants={iconChild}>
                        <Link href={Links.LinkedIn}>
                            <FaLinkedinIn className='bg-indigo-600 rounded' size={'1.7rem'} />
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default About;
