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
      <Home Name='[Your Name]' Image='https://otakukart.com/wp-content/uploads/2023/12/Gojo-Satoru-2.jpg' Title='[Title Here]' />
      <About Image="https://tse1.mm.bing.net/th/id/OIP.YGc5ZMk_CWUB9CuIVJlPJwHaEK?pid=Api&P=0&h=220"
        About="[ I’m a passionate web developer who loves turning ideas into interactive, user-friendly digital experiences. Skilled in modern technologies and always eager to learn, I aim to create applications that are both functional and visually engaging. This section is just a placeholder — replace it with your own story soon! ]"
        Links={{ Facebook: '#', Github: "#", LinkedIn: '#' }} />
      <CheckMyResume DocxLink='#' />
      <Skill Skills={[]} />
      <Projects Projects={[{
        Image: '#',
        Details: "This is dummy details details is all about your project this is necessary part so please fill up",
        Reason: 'Usually here you write what is the reason to make that projects',
        Github: '#',
        Live: '#',
        TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
        Name: '[Project Name]'
      }, {
        Image: '#',
        Details: "This is dummy details details is all about your project this is necessary part so please fill up",
        Reason: 'Usually here you write what is the reason to make that projects',
        Github: '#',
        Live: '#',
        TechStack: ['stack1', 'stack2', 'stack3', 'stack4'],
        Name: '[Project Name]'
      }, {
        Image: '#',
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