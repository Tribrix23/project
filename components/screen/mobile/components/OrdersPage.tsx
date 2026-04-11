'use client'
import IconBadge from '@/components/ui/IconBadge'
import IconCard from '@/components/ui/IconCard'
import { BellIcon, SearchIcon } from 'lucide-react'
import React, {useState} from 'react'

const OrdersPage = () => {
    const [isOrder, setIsOrder] = useState(true)
  return (
    <>
        <div className='w-full h-[8%] flex flex-col shrink-0 select-none'>
          <header className='w-full h-full flex flex-row justify-between'>
              <div className='w-[50%] h-full flex flex-row items-center pl-7'>
                <h1 className='font-bold text-black text-xl'>Orders</h1>
              </div>
              <div className='flex justify-end w-[40%] h-full'>
                <IconBadge icon={BellIcon} />
              </div>
          </header>
      </div>
        <div className='w-full h-[22%] flex flex-row items-center px-5 justify-evenly'>
            <IconCard width={40} styles={`${isOrder ? 'bg-orange-500/50' : 'bg-white'}`} height={40} text='Orders' img='/images/truck.png' w={95} oC={() => setIsOrder(true)}/>
            <IconCard width={40} styles={`${!isOrder ? 'bg-orange-500/50' : 'bg-white'}`} height={40} text='Returns' img='/images/return.png' w={75} oC={() => setIsOrder(false)}/>
        </div>
    </>
  )
}

export default OrdersPage