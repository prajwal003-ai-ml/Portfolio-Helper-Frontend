import React from 'react'
import SkillCard from './SkillCard'

interface Data {
  Skills: string[]
}

const Skill = ({ Skills }: Data) => {
  const hasSkills = Skills && Skills.length > 0
  const items = hasSkills ? Skills : Array(9).fill('Skills Here')

  return (
    <div className="flex justify-center items-center py-12 border-t border-solid border-gray-700 flex-wrap gap-3">
      {items.map((itm, idx) => (
        <SkillCard Skill={itm} key={idx} idx={idx} />
      ))}
    </div>
  )
}

export default Skill
