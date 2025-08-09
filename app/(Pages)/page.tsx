import React from 'react'
import Home from '../PortfolioComponents/Home'
import About from '../PortfolioComponents/About'
import CheckMyResume from '../PortfolioComponents/CheckMyResume'
import Skill from '../PortfolioComponents/Skill'
import Projects from '../PortfolioComponents/Projects'
import GetInTouch from '../PortfolioComponents/GetInTouch'
import Footer from '../PortfolioComponents/Footer'

const page = () => {
  return (
    <div>
      <Home/>
      <About/>
      <CheckMyResume/>
      <Skill/>
      <Projects/>
      <GetInTouch/>
      <Footer/>
    </div>
  )
}

export default page