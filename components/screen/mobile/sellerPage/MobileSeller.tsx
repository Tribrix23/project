'use client'

import IconBadge from '@/components/ui/IconBadge'
import { Store, MapPin, LayoutDashboard, UserIcon, Package, BarChart3 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import SellerStore from './views/SellerStore'
import Tracking from './views/Tracking'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'
import { useSearchParams, useRouter } from 'next/navigation'

const pageRoutes: Record<string, number> = {
  home: 0,
  tracking: 1,
  dashboard: 2,
  profile: 3,
}

const MobileSeller = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [prevPage, setPrevPage] = useState('home')
  const [expanded, setExpanded] = useState(true)

  const currentPage = searchParams.get('seller') || 'home'
  const active = pageRoutes[currentPage] ?? 0

  const shouldCollapse = active === 1 || active === 2

  useEffect(() => {
    if (shouldCollapse) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [active])

  const navigateTo = (page: string) => {
    setPrevPage(currentPage)
    router.push(`?seller=${page}`)
  }

  const goBack = () => {
    navigateTo(prevPage)
  }

  const handleTabPress = (page: string) => {
    if (page === 'tracking' || page === 'dashboard') {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
    navigateTo(page)
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
    if (active === 1) return <MapPin className="text-white size-6"/>
    return <BarChart3 className="text-white size-6"/>
  }

  const getCircleColor = () => {
    return 'bg-blue-500'
  }

return (
  <div className='w-full h-full flex flex-col relative overflow-hidden'>
    <div 
      className='flex-1 overflow-hidden' 
      onClick={handleContentClick}
    >
      {currentPage === 'home' && <SellerStore onNavigate={navigateTo}/>}
      {currentPage === 'tracking' && <Tracking goBack={goBack}/>}
      {currentPage === 'dashboard' && <Dashboard goBack={goBack}/>}
      {currentPage === 'profile' && <Profile goBack={goBack}/>}
    </div>

    <div className='w-full h-20 bottom-25 absolute pointer-events-none flex justify-center items-center'>
      <div style={navStyle} className=' w-full h-full absolute flex justify-center items-center pointer-events-none'>
        <div className="w-[85%] h-full rounded-full bg-linear-to-b from-white/40 to-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative overflow-hidden pointer-events-auto">
          <div className="absolute inset-0 bg-linear-to-t from-transparent via-white/20 to-white/40 opacity-40 flex flex-row items-center justify-evenly"/>
          <div
            className="mx-1 absolute top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-full bg-white/60 backdrop-blur-md shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ left: `calc(${active * 25}% + 6px)` }}
          />
          <div className="w-full h-full flex items-center justify-evenly relative z-10">
            <IconBadge icon={BarChart3} text='Metrics' textDesign={`${currentPage === 'dashboard' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'dashboard' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('dashboard')}/>
            <IconBadge icon={MapPin} text='Track' textDesign={`${currentPage === 'tracking' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'tracking' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('tracking')}/>
              <IconBadge icon={Store} text='Store' textDesign={`${currentPage === 'home' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'home' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('home')}/>
            <IconBadge icon={UserIcon} text='Profile' textDesign={`${currentPage === 'profile' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'profile' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('profile')}/>
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

export default MobileSeller