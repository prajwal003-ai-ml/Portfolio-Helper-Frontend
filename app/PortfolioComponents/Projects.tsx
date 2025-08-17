import React from 'react'
import ProjectCard from './ProjectCard';

interface Projectdata {
    image: string;
    details: string;
    reason: string;
    github: string;
    live: string;
    techstacks: string[]
    name:string
}

interface data {
    Projects: Projectdata[]
}

const Projects = ({ Projects  }: data) => {

    console.log(Projects)
    return (
        <div className='py-6 '>
            <h2 className='text-xl font-semibold py-5 text-center'>
                Mine <span className='text-orange-400'>Projects</span>
            </h2>
            <div className=' flex justify-center items-center gap-3 flex-wrap'>
                {
                    Projects.map((itm, idx) => <ProjectCard Name={itm.name} idx={idx} Github={itm.github} Details={itm.details} key={idx} TechStack={itm.techstacks || []} Reason={itm.reason || ""} Image={itm.image || "https://media.istockphoto.com/photos/3d-text-of-demo-picture-id869939818?k=20&m=869939818&s=612x612&w=0&h=pK2UEkd2lzlacsTEO4zhK3HUDVYq9ZMcCv6J6yNWaZU="} Live={itm.live} />)
                }
            </div>
            <div className=' flex justify-center items-center gap-3 flex-wrap'>
               {
                Projects.length<=0 &&
                <div className='text-center text-lg text-gray-400 h-48 py-8 border-solid border w-full flex-1 rounded-xl flex justify-center items-center'>
                    NO PROJECTS TO SHOW
                </div>
               }
            </div>
        </div>
    )
}

export default Projects