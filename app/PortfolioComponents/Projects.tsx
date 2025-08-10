import React from 'react'
import ProjectCard from './ProjectCard';

interface Projectdata {
    Image: string;
    Details: string;
    Reason: string;
    Github: string;
    Live: string;
    TechStack: string[]
    Name:string
}

interface data {
    Projects: Projectdata[]
}

const Projects = ({ Projects  }: data) => {
    return (
        <div className='py-6 '>
            <h2 className='text-xl font-semibold py-5 text-center'>
                Mine <span className='text-orange-400'>Projects</span>
            </h2>
            <div className=' flex justify-center items-center gap-3 flex-wrap'>
                {
                    Projects.map((itm, idx) => <ProjectCard Name={itm.Name} idx={idx} Github={itm.Github} Details={itm.Details} key={idx} TechStack={itm.TechStack} Reason={itm.Reason} Image={itm.Image} Live={itm.Live} />)
                }
            </div>
        </div>
    )
}

export default Projects