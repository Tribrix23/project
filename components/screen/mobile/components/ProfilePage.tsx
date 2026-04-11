'use client'
import OptionTabs from '@/components/ui/OptionTabs'
import { Coins, LogOutIcon, MapPin, MessageSquareTextIcon, SettingsIcon, StoreIcon, Ticket, Wallet } from 'lucide-react'
import React from 'react'

const ProfilePage = () => {
    const coins = 2

  return (
    <>
        <div className=' w-full h-[20%] flex flex-row justify-center items-center px-2'>
            <div className='bg-white w-full h-[85%] rounded-xl flex flex-row shadow-[0_0_10px_rgba(0,0,0,0.3)]'>
                <div className='border-r-2 border-orange-500/60 w-[40%] h-full flex flex-col justify-center items-center'>
                    <div className='bg-gray-500/60 w-20 h-20 rounded-full'>

                    </div>
                    <h1 className='text-sm text-black'>Login</h1>
                </div>
                <div className=' w-[60%] h-full justify-center pl-4 flex flex-col gap-2'>
                    <h1 className='text-black font-bold text-xl'>Coins</h1>
                    <div className=' w-30 h-10 flex flex-row gap-2 items-center'>
                        <Coins className='text-yellow-500 size-7'/>

                        <div className='w-21 h-full rounded-2xl border-2 flex justify-center flex-row items-center'>
                            <p className='text-xl text-black'>{coins}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full h-[80%] px-2 flex justify-center '>
            <div className='bg-white w-full h-[70%] shadow-[0_0_10px_rgba(0,0,0,0.3)] rounded-xl overflow-y-auto pb-1'>
                <OptionTabs icons={SettingsIcon} text='Settings'/>
                <OptionTabs icons={MessageSquareTextIcon} text='Messages'/>
                <OptionTabs icons={StoreIcon} text='Start Selling'/>
                <OptionTabs icons={MapPin} text='Location'/>
                <OptionTabs icons={Wallet} text='Payment Method'/>
                <OptionTabs icons={Ticket} text='Coupons'/>
                <OptionTabs icons={LogOutIcon} text='Logout' textDesign='text-red-500' design='text-red-500' borderDown={false}/>
            </div>
        </div>
    </>
  )
}

export default ProfilePage