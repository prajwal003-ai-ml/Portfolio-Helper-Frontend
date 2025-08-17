'use client'
import api from '@/app/axios'
import LoadingComponent from '@/app/components/Loading'
import { useUserdata } from '@/app/contexts/userdata'
import { Information } from '@/app/contexts/UseUserInfo'
import About from '@/app/PortfolioComponents/About'
import CheckMyResume from '@/app/PortfolioComponents/CheckMyResume'
import Footer from '@/app/PortfolioComponents/Footer'
import GetInTouch from '@/app/PortfolioComponents/GetInTouch'
import Home from '@/app/PortfolioComponents/Home'
import Projects from '@/app/PortfolioComponents/Projects'
import Skill from '@/app/PortfolioComponents/Skill'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoShare } from 'react-icons/io5'
import { toast } from 'react-toastify'

const page = () => {

  const [data, setdata] = useState<Information>({ name: "", about: "", aboutimage: "", contact: "", email: "", facebook: "", github: "", homeimage: "", id: 0, instagram: "", linkedin: "", resume: "", skills: [], title: "", twitter: "", uid: 0, whatsapp: "" })

  const [ProjectsAl, setProjects] = useState([])

  const [Loading, setLoading] = useState(true)

  const navigate = useRouter()

  const user = useUserdata(s => s.user)



  useEffect(() => {
    api.get('get-data')
      .then((res) => {
        const data = res.data
        setdata(data.data)
        setProjects(data.Project)

        console.log(data)
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

      <Projects Projects={ProjectsAl || []} />

      <GetInTouch Email={data?.email || "#"} />

       <Footer Facebook={data?.facebook || "#"} Github={data?.github || "#"} Instagram={data?.instagram || "#"} LinkedIn={data?.linkedin || "#"} Phone={data?.aboutimage || "#"} Twitter={data?.twitter || "#"} Whatsapp={data?.whatsapp || "#"}  />



      <div onClick={() => {
        navigator.clipboard.writeText(`https://portfolio-helper.vercel.app//my-portfolio/${user.Token}`)
          .then(() => {
            toast('Copied In Clipboard')
          })
          .catch(err => {
            console.error("Failed to copy: ", err);
          });
        navigate.push(`/my-portfolio/${user.Token}`)
      }} className='fixed bottom-6 flex justify-center gap-1 items-center text-blue-600 right-6 cursor-pointer z-40 bg-gray-900  w-14 md:w-[7rem] p-3 h-14 px-0 md:px-4 rounded-full md:rounded-2xl'>
        <span className='text-sm font-semibold text-gray-200 hidden md:block'>
          Share</span> <IoShare size={'1rem'} />
      </div>
    </div>
  )
}

export default page