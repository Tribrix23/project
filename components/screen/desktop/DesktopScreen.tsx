'use client'
import React, {useState} from 'react'
import HomePage from './components/HomePage'

const DesktopScreen = () => {
  const [active, setActive] = useState(0)

  const renderPage = () => {
    switch(active) {
      case 0:
        return <HomePage active={active} setActive={setActive}/>
      case 1:
        return <div className="w-full h-full flex items-center justify-center text-gray-500">Shop Page Coming Soon</div>
      case 2:
        return <div className="w-full h-full flex items-center justify-center text-gray-500">Cart Page Coming Soon</div>
      case 3:
        return <div className="w-full h-full flex items-center justify-center text-gray-500">Profile Page Coming Soon</div>
      default:
        return <HomePage active={active} setActive={setActive}/>
    }
  }

  return (
    <div className='w-full h-full overflow-hidden'>
      {renderPage()}
    </div>
  )
}

export default DesktopScreen