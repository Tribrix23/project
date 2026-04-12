'use client'
import IconBadge from '@/components/ui/IconBadge'
import { HomeIcon, ReceiptIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import OrdersPage from './components/OrdersPage'
import CartPage from './components/CartPage'

const MobileScreen = () => {
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState(true)

  const shouldCollapse = active === 1 || active === 2

  useEffect(() => {
    if (shouldCollapse) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [active])

  const handleTabPress = (index: number) => {
    if (index === 1 || index === 2) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
    setActive(index)
  }

  const handleContentClick = () => {
    if (shouldCollapse && expanded) {
      setExpanded(false)
    }
  }

  const handleCircleClick = () => {
    setExpanded(true)
  }

  const navStyle: React.CSSProperties = {
    transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: shouldCollapse && !expanded 
      ? 'translateX(35%) scale(0.35)' 
      : 'translateX(0) scale(1)',
    opacity: shouldCollapse && !expanded ? 0 : 1,
    transformOrigin: 'right center',
    pointerEvents: shouldCollapse && !expanded ? 'none' : 'auto',
  }

  const circleStyle: React.CSSProperties = {
    transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: shouldCollapse && !expanded ? 'translateX(0)' : 'translateX(130%)',
    pointerEvents: shouldCollapse && !expanded ? 'auto' : 'none',
  }

  const getCircleIcon = () => {
    if (active === 1) return <ReceiptIcon className="text-white size-6"/>
    return <ShoppingCartIcon className="text-white size-6"/>
  }

  const getCircleColor = () => {
    if (active === 1) return 'bg-blue-500'
    return 'bg-orange-500'
  }

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <div 
        className='flex-1 overflow-hidden' 
        onClick={handleContentClick}
      >
        {active === 0 && <HomePage/>}
        {active === 1 && <OrdersPage/>}
        {active === 2 && <CartPage/>}
        {active === 3 && <ProfilePage/>}
      </div>

      <div className='w-full h-20 bottom-25 absolute pointer-events-none flex justify-center items-center'>
        <div style={navStyle} className='w-full h-full absolute flex justify-center items-center pointer-events-none'>
          <div className="w-[85%] h-full rounded-full bg-linear-to-b from-white/40 to-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative overflow-hidden pointer-events-auto">
            <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/20 to-white/40 opacity-40 flex flex-row items-center justify-evenly"/>
            <div
              className="mx-1 absolute top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-full bg-white/60 backdrop-blur-md shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{ left: `calc(${active * 25}% + 6px)` }}
            />
            <div className="w-full h-full flex items-center justify-evenly relative z-10">
              <IconBadge icon={HomeIcon} text='Home' textDesign={`${active === 0 ? 'text-orange-500' : 'text-black'}`} design={`${active === 0 ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress(0)}/>
              <IconBadge icon={ReceiptIcon} text='Orders' textDesign={`${active === 1 ? 'text-orange-500' : 'text-black'}`} design={`${active === 1 ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress(1)}/>
              <IconBadge icon={ShoppingCartIcon} text='Cart' textDesign={`${active === 2 ? 'text-orange-500' : 'text-black'}`} design={`${active === 2 ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress(2)}/>
              <IconBadge icon={UserIcon} text='Profile' textDesign={`${active === 3 ? 'text-orange-500' : 'text-black'}`} design={`${active === 3 ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress(3)}/>
            </div>
          </div>
        </div>

        <div style={circleStyle} className='absolute right-4 pointer-events-none'>
          <button 
            onClick={handleCircleClick}
            className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform duration-200 ${getCircleColor()}`}
          >
            {getCircleIcon()}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobileScreen