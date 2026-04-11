'use client'
import IconBadge from '@/components/ui/IconBadge'
import { BellIcon, HomeIcon, ReceiptIcon, SearchIcon, ShoppingBagIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import React, {useState} from 'react'
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import OrdersPage from './components/OrdersPage'
import CartPage from './components/CartPage'

const MobileScreen = () => {
  const [active, setActive] = useState(0)
  return (
    <div className='w-full h-full flex flex-col relative'>
      {active === 0 && (
        <HomePage/>
      )}
      {active === 1 && (
        <OrdersPage/>
      )}
      {active === 2 && (
        <CartPage/>
      )}
      {active === 3 && (
        <ProfilePage/>
      )}

      <div className=' w-full h-20 bottom-25 absolute pointer-events-none flex justify-center items-center'>
        <div className=" w-[85%] h-full rounded-full bg-linear-to-b from-white/40 to-white/10 backdrop-blur-xl border border-white/30
              shadow-[0_8px_32px_rgba(0,0,0,0.15)] relative overflow-hidden pointer-events-auto">
          <div className=" absolute inset-0 bg-linear-to-t from-transparent via-white/20 to-white/40 opacity-40 flex flex-row items-center justify-evenly"/>
          <div
            className="mx-1 absolute top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-full bg-white/60 backdrop-blur-md shadow-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: `calc(${active * 25}% + 6px)`, 
            }}
          />
              <div className="w-full h-full flex items-center justify-evenly relative z-10">
                <IconBadge icon={HomeIcon} text='Home' textDesign={`${active === 0 ? 'text-orange-500' : 'text-black'}`} design={`${active === 0 ? 'text-orange-500' : 'text-black'}`} oC={() => setActive(0)}/>
                <IconBadge icon={ReceiptIcon} text='Orders' textDesign={`${active === 1 ? 'text-orange-500' : 'text-black'}`} design={`${active === 1 ? 'text-orange-500' : 'text-black'}`} oC={() => setActive(1)}/>
                <IconBadge icon={ShoppingCartIcon} text='Cart' textDesign={`${active === 2 ? 'text-orange-500' : 'text-black'}`} design={`${active === 2 ? 'text-orange-500' : 'text-black'}`} oC={() => setActive(2)}/>
                <IconBadge icon={UserIcon} text='Profile' textDesign={`${active === 3 ? 'text-orange-500' : 'text-black'}`} design={`${active === 3 ? 'text-orange-500' : 'text-black'}`} oC={() => setActive(3)}/>
              </div>
          </div>
        </div>
      </div>
  )
}

export default MobileScreen