'use client'
import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { Information } from '@/app/contexts/UseUserInfo'
import About from '@/app/PortfolioComponents/About'
import CheckMyResume from '@/app/PortfolioComponents/CheckMyResume'
import Footer from '@/app/PortfolioComponents/Footer'
import GetInTouch from '@/app/PortfolioComponents/GetInTouch'
import Home from '@/app/PortfolioComponents/Home'
import Projects from '@/app/PortfolioComponents/Projects'
import Skill from '@/app/PortfolioComponents/Skill'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoShare } from 'react-icons/io5'
import { toast } from 'react-toastify'

const Body = () => {

    const [data, setdata] = useState<Information>({ name: "", about: "", aboutimage: "", contact: "", email: "", facebook: "", github: "", homeimage: "", id: 0, instagram: "", linkedin: "", resume: "", skills: [], title: "", twitter: "", uid: 0, whatsapp: "" })

    const [ProjectsAll, setProjects] = useState([])

    const [Loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        api.get(`get-all/${params.token}`)
            .then((res) => {
                const data = res.data
                setdata(data.data)
                setProjects(data.Project)
            }).
            catch(() => {
                toast.error('Failed to Fetch Sorry')
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (Loading) return <LoadingComponent />
    return (
        <div>
            <Home
                Image={data?.homeimage || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg"}
                Name={data?.name || 'YOUR NAME'}
                Title={data?.title || "TITLE HERE"}
            />

            <About About={data?.about || "[ I’m a passionate web developer who loves turning ideas into interactive, user-friendly digital experiences. Skilled in modern technologies and always eager to learn, I aim to create applications that are both functional and visually engaging. This section is just a placeholder — replace it with your own story soon! ]"} Links={{ Facebook: data?.facebook || '#', Github: data?.github || "#", LinkedIn: data?.linkedin || '#' }} Image={data?.aboutimage || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?cs=srgb&dl=pexels-pixabay-415829.jpg&fm=jpg"} />


            <CheckMyResume DocxLink={data?.resume || '#'} />

            <Skill Skills={data?.skills || []} />

            <Projects Projects={ProjectsAll || []} />

            <GetInTouch Email={data?.email || "#"} />

            <Footer Facebook={data?.facebook || "#"} Github={data?.github || "#"} Instagram={data?.instagram || "#"} LinkedIn={data?.linkedin || "#"} Phone={data?.aboutimage || "#"} Twitter={data?.twitter || "#"} Whatsapp={data?.whatsapp || "#"} />

        </div>
    )
}

export default Body