'use client'
import React, {useState} from 'react'
import HomePage from './components/HomePage'

const DesktopScreen = () => {
  const [active, setActive] = useState(0)

  return (
    <div className='w-full h-full'>
      {active === 0 && <HomePage active={active} setActive={setActive}/>}
    </div>
  )
}

export default DesktopScreen