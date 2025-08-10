import React from 'react'
import Home from './PortfolioComponents/Home'
import About from './PortfolioComponents/About'
import CheckMyResume from './PortfolioComponents/CheckMyResume'
import Skill from './PortfolioComponents/Skill'
import Projects from './PortfolioComponents/Projects'
import GetInTouch from './PortfolioComponents/GetInTouch'
import Footer from './PortfolioComponents/Footer'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <div className='flex fixed top-0 left-0 right-0  bg-black z-30 items-center justify-between p-2 md:p-3 border-b border-solid border-gray-800'>
        <h2 className='sm:text-lg text-sm md:text-2xl font-semibold cursor-pointer'>
          [Your <span className='text-orange-700'>Name]</span>
        </h2>
        <p className='font-semibold text-xs md:text-sm'>
          Create API/Backend  <Link href='/login' className='text-orange-700'>Now, For Portfolio</Link>
        </p>
      </div>
      <Home Name='[Your Name]' Image='https://otakukart.com/wp-content/uploads/2023/12/Gojo-Satoru-2.jpg' Title='[Title Here]' />
      <About Image="https://tse1.mm.bing.net/th/id/OIP.YGc5ZMk_CWUB9CuIVJlPJwHaEK?pid=Api&P=0&h=220"
        About="[ I’m a passionate web developer who loves turning ideas into interactive, Who created this beautiful website so that users can easily navigate and find the information they need. and you guys dont have to make backend for your every portfolio just login and create api for your portfolio ]"
        Links={{ Facebook: '#', Github: "#", LinkedIn: '#' }} />
      <CheckMyResume DocxLink='#' />
      <Skill Skills={[]} />
      <Projects Projects={[{
        Image: 'https://tse2.mm.bing.net/th/id/OIP.c1hwlGS59mUoZYNvEDZIBAHaEI?pid=Api&P=0&h=220',
        Details: "This is dummy details details is all about your project this is necessary part so please fill up",
        Reason: 'Usually here you write what is the reason to make that projects',
        Github: '#',
        Live: '#',
        TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
        Name: '[Project Name]'
      }, {
        Image: 'https://wallpapers.com/images/hd/gojo-satoru-side-profile-3xdwa05tznpyotz9.jpg',
        Details: "This is dummy details details is all about your project this is necessary part so please fill up",
        Reason: 'Usually here you write what is the reason to make that projects',
        Github: '#',
        Live: '#',
        TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
        Name: '[Project Name]'
      }, {
        Image: 'https://wallpaperaccess.com/full/10062263.jpg',
        Details: "This is dummy details details is all about your project this is necessary part so please fill up",
        Reason: 'Usually here you write what is the reason to make that projects',
        Github: '#',
        Live: '#',
        TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
        Name: '[Project Name]'
      }]} />
      <GetInTouch Email="#" />
      <Footer Facebook='#' Github="#" Instagram="#" LinkedIn="#" Phone="9800000000" Twitter="#" Whatsapp="9800000000" Youtube="#" />
    </div>
  )
}

export default page