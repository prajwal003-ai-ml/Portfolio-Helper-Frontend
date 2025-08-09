'use client'
import React, { useRef } from "react";
import { motion , Variants} from 'framer-motion'

interface Data {
    Name: string;
    Title: string;
    Image: string;
}

const containerVariants:Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4,
            delayChildren: 0.3
        }
    }
};

const itemVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const imageVariants:Variants = {
    hidden: { opacity: 0,x:100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const Home = ({
    Name = "[Your Name]",
    Image = "https://otakukart.com/wp-content/uploads/2023/12/Gojo-Satoru-2.jpg",
    Title = "[Title Here]",
}: Data) => {

    const refMe = useRef<HTMLImageElement>(null)

    const HandleHover = (e: React.MouseEvent<HTMLImageElement>) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const xMove = (rect.height / 2 - y) / 10
        const yMove = (x-rect.width / 2 ) / 10

        el.style.transform = `rotateX(${xMove}deg) rotateY(${yMove}deg)`
    }

    return (
        <div className="border-b border-solid border-gray-700 pb-6">
            <motion.div
                className="min-h-[78dvh] flex gap-4 flex-col md:flex-row justify-center md:justify-between md:px-6 items-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
            >
                {/* Text Section */}
                <motion.div variants={containerVariants} initial='hidden' whileInView={'visible'} className="flex flex-col items-center md:items-start">
                    <motion.h3
                        variants={itemVariants}
                        className="font-semibold text-sm md:text-[1.1rem] text-gray-400"
                    >
                        Hello, I am
                    </motion.h3>
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-semibold flex gap-2"
                    >
                        <span>{Name.split(' ')[0]}</span>
                        <span className="text-orange-400">
                            {Name.split(' ').slice(1).join(' ')}
                        </span>
                    </motion.h1>
                    <motion.h2
                        variants={itemVariants}
                        className="font-semibold text-gray-400"
                    >
                        I am {Title}
                    </motion.h2>
                </motion.div>

                {/* Image */}
                <motion.div
                    className="prespeciveNess"
                    variants={imageVariants}
                    initial='hidden'
                    whileInView={'visible'}
                >
                    <motion.img
                        onMouseMove={HandleHover}
                        ref={refMe}
                        src={Image}
                        alt="Image here"
                        className="h-96 w-[29rem] bg-gray-700 rounded-2xl cursor-pointer transition-all duration-100"
                    />
                </motion.div>
            </motion.div>

            {/* Bottom Text */}
            <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center font-semibold text-xs text-gray-700 mt-6"
            >
                This is Based On Your Data Developed BY Prajwal
            </motion.h3>
        </div>
    );
};

export default Home;
