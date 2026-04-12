'use client'
import OptionTabs from '@/components/ui/OptionTabs'
import { Coins, LogOutIcon, MapPin, MessageSquareTextIcon, SettingsIcon, StoreIcon, Ticket, User, Wallet } from 'lucide-react'
import React from 'react'

const ProfilePage = () => {
    const coins = 2

  return (
    <>
        <div className='w-full h-[20%] flex flex-row justify-center items-center px-2'>
            <div className='bg-white w-full h-[85%] rounded-2xl flex flex-row shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-100'>
                <div className='border-r border-orange-400/40 w-[40%] h-full flex flex-col justify-center items-center gap-2'>
                    <div className='bg-linear-to-b from-gray-200 to-gray-300 w-20 h-20 rounded-full flex items-center justify-center shadow-inner'>
                        <User className='text-gray-600 size-10'/>
                    </div>
                    <h1 className='text-sm text-gray-600 font-medium'>Login</h1>
                </div>
                <div className='w-[60%] h-full justify-center pl-4 flex flex-col gap-2'>
                    <h1 className='text-gray-800 font-bold text-xl'>Coins</h1>
                    <div className='h-10 flex flex-row gap-2 items-center'>
                        <Coins className='text-yellow-500 size-7'/>

                        <div className='min-w-15 h-full bg-gray-50 rounded-xl border border-gray-200 flex justify-center items-center px-3'>
                            <p className='text-xl font-bold text-gray-800'>{coins}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full h-[80%] px-2 flex justify-center'>
            <div className='bg-white w-full h-[70%] shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-2xl overflow-y-auto pb-1'>
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