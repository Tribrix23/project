'use client'
import IconBadge from '@/components/ui/IconBadge'
import { HomeIcon, ReceiptIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import React, {useState, useEffect} from 'react'
import HomePage from './views/HomePage'
import ProfilePage from './views/ProfilePage'
import OrdersPage from './views/OrdersPage'
import CartPage from './views/CartPage'
import SearchTab from './views/SearchTab'
import Details from './views/Details'
import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'

type UserData = {
  name: string
  email: string
  memberSince: string
  level: string
}

const pageRoutes: Record<string, number> = {
  home: 0,
  orders: 1,
  cart: 2,
  profile: 3,
  search: 5,
  details: 7,
}

const MobileScreen = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [expanded, setExpanded] = useState(true)
  const [prevPage, setPrevPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    name: 'Guest User',
    email: 'guest@example.com',
    memberSince: '2025',
    level: 'Bronze'
  })
  const supabase = createClient()

  const currentPage = searchParams.get('page') || 'home'
  const active = pageRoutes[currentPage] ?? 0

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userId = session.user.id
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, middle_name, last_name')
          .eq('id', userId)
          .single()
        
        const fname = profile?.first_name || ''
        const mname = profile?.middle_name?.[0] ? profile.middle_name[0].toUpperCase() + '.' : ''
        const lname = profile?.last_name || ''
        
        const fullName = [fname, mname, lname].filter(Boolean).join(' ')
        
        setIsLoggedIn(true)
        setUserData({
          name: fullName || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          memberSince: new Date().getFullYear().toString(),
          level: 'Bronze'
        })
      }
    })
  }, [supabase])

  const navigateTo = (page: string) => {
    setPrevPage(currentPage)
    router.push(`?page=${page}`)
  }

  const goBack = () => {
    navigateTo(prevPage)
  }
 
  const shouldCollapse = active === 1 || active === 2

  useEffect(() => {
    if (shouldCollapse) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [active])

  const handleTabPress = (page: string) => {
    if (page === 'orders' || page === 'cart') {
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

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserData({
      name: 'Guest User',
      email: 'guest@example.com',
      memberSince: '2025',
      level: 'Bronze'
    })
    navigateTo('home')
  }

  const navStyle: React.CSSProperties = {
    transition: 'all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: shouldCollapse && !expanded 
      ? 'translateX(35%) scale(0.35)' 
      : 'translateX(0) scale(1)',
    opacity: shouldCollapse && !expanded ? 0 : 1,
    transformOrigin: 'right center',
    pointerEvents: shouldCollapse && !expanded ? 'none' : 'auto',
    display: currentPage === 'search' || currentPage === 'details' ? 'none' : 'flex'
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
    return 'bg-blue-500'
  }

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      <div 
        className='flex-1 overflow-hidden' 
        onClick={handleContentClick}
      >
        {currentPage === 'home' && <HomePage onNavigate={navigateTo}/>}
        {currentPage === 'orders' && <OrdersPage isLoggedIn={isLoggedIn} user={userData}/>}
        {currentPage === 'cart' && <CartPage isLoggedIn={isLoggedIn} user={userData}/>}
        {currentPage === 'profile' && <ProfilePage isLoggedIn={isLoggedIn} user={userData} onLogout={handleLogout}/>}
        {currentPage === 'search' && <SearchTab goBack={() => navigateTo('home')} showDetails={() => navigateTo('details')}/>}
        {currentPage === 'details' && <Details goBack={goBack} isLoggedIn={isLoggedIn} user={userData}/>}
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
              <IconBadge icon={HomeIcon} text='Home' textDesign={`${currentPage === 'home' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'home' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('home')}/>
              <IconBadge icon={ReceiptIcon} text='Orders' textDesign={`${currentPage === 'orders' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'orders' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('orders')}/>
              <IconBadge icon={ShoppingCartIcon} text='Cart' textDesign={`${currentPage === 'cart' ? 'text-orange-500' : 'text-black'}`} design={`${currentPage === 'cart' ? 'text-orange-500' : 'text-black'}`} oC={() => handleTabPress('cart')}/>
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

export default MobileScreen