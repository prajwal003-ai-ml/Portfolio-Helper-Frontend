import React from 'react'
import ProjectCard from './ProjectCard';

interface Projectdata {
    Image: string;
    Details: string;
    Reason: string;
    Github: string;
    Live: string;
    TechStack: string[]
}

interface data {
    Projects: Projectdata[]
}

const Projects = ({ Projects = [{
    Image: '#',
    Details: "This is dummy details details is all about your project this is necessary part so please fill up",
    Reason: 'Usually here you write what is the reason to make that projects',
    Github: '#',
    Live: '#',
    TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
}, {
    Image: '#',
    Details: "This is dummy details details is all about your project this is necessary part so please fill up",
    Reason: 'Usually here you write what is the reason to make that projects',
    Github: '#',
    Live: '#',
    TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
}, {
    Image: '#',
    Details: "This is dummy details details is all about your project this is necessary part so please fill up",
    Reason: 'Usually here you write what is the reason to make that projects',
    Github: '#',
    Live: '#',
    TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
}] }: data) => {
    return (
        <div className='py-6 '>
            <h2 className='text-xl font-semibold py-5 text-center'>
                Mine <span className='text-orange-400'>Projects</span>
            </h2>
            <div className=' flex justify-center items-center gap-3 flex-wrap'>
                {
                    Projects.map((itm, idx) => <ProjectCard idx={idx} Github={itm.Github} Details={itm.Details} key={idx} TechStack={itm.TechStack} Reason={itm.Reason} Image={itm.Image} Live={itm.Live} />)
                }
            </div>
        </div>
    )
}

export default Projects