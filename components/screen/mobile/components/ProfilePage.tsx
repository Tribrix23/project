'use client'
import OptionTabs from '@/components/ui/OptionTabs'
import Image from 'next/image'
import { 
  Coins, LogOutIcon, MapPin, MessageSquareTextIcon, SettingsIcon, 
  StoreIcon, Ticket, User, Wallet, BellIcon, HeartIcon, HelpCircle, 
  Shield, Star, Camera, ShoppingBag, FileText, LogIn
} from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type UserData = {
  name: string
  email: string
  memberSince: string
  level: string
}

type ProfilePageProps = {
  isLoggedIn: boolean
  user: UserData
  onLogout?: () => void
}

const ProfilePage = ({ isLoggedIn, user, onLogout }: ProfilePageProps) => {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
      await supabase.auth.signOut()
      onLogout?.()
      router.push('/')
    }

  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
      <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0'>
        <h1 className='text-xl font-bold text-gray-800'>Profile</h1>
        <div className='flex items-center gap-3'>
          <button className='p-2 rounded-full hover:bg-gray-100'>
            <BellIcon size={20} className='text-gray-600' />
          </button>
          <button className='p-2 rounded-full hover:bg-gray-100'>
            <SettingsIcon size={20} className='text-gray-600' />
          </button>
        </div>
      </header>

      <main className='flex-1 overflow-scroll px-4 pb-44'>
        <div className='py-4'>
          <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <div className='w-20 h-20 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg'>
                  <User className='text-white size-10'/>
                </div>
                <button className='absolute bottom-0 right-0 w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center border-2 border-white'>
                  <Camera size={12} className='text-white' />
                </button>
              </div>
              <div className='flex-1'>
                <h2 className='text-lg font-bold text-gray-800'>{user.name}</h2>
                <p className='text-sm text-gray-500'>{user.email}</p>
                <div className='flex items-center gap-2 mt-2'>
                  <span className='px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded-full'>
                    {user.level} Member
                  </span>
                  <span className='text-xs text-gray-400'>Since {user.memberSince}</span>
                </div>
              </div>
            </div>
            
            <div className='mt-5 pt-4 border-t border-gray-100 flex gap-4'>
              <div className='flex-1 bg-orange-50 rounded-xl p-3 text-center'>
                <div className='flex items-center justify-center gap-1 mb-1'>
                  <Coins className='text-yellow-500' size={18} />
                  <span className='text-xl font-bold text-gray-800'>0</span>
                </div>
                <p className='text-xs text-gray-500'>Coins</p>
              </div>
              <div className='flex-1 bg-gray-50 rounded-xl p-3 text-center'>
                <HeartIcon className='text-red-400 mx-auto mb-1' size={18} />
                <span className='text-xl font-bold text-gray-800'>0</span>
                <p className='text-xs text-gray-500'>Wishlist</p>
              </div>
              <div className='flex-1 bg-gray-50 rounded-xl p-3 text-center'>
                <Ticket className='text-purple-500 mx-auto mb-1' size={18} />
                <span className='text-xl font-bold text-gray-800'>0</span>
                <p className='text-xs text-gray-500'>Coupons</p>
              </div>
            </div>
          </div>
        </div>

        <div className='py-2 space-y-1'>
          <p className='text-xs font-medium text-gray-400 px-2 uppercase tracking-wider mb-2'>Account</p>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <OptionTabs icons={User} text='Edit Profile' borderDown={true} />
            <OptionTabs icons={Wallet} text='Payment Methods' borderDown={true} />
            <OptionTabs icons={MapPin} text='Addresses' borderDown={true} />
            <OptionTabs icons={BellIcon} text='Notifications' borderDown={false} />
          </div>
        </div>

        <div className='py-2 space-y-1'>
          <p className='text-xs font-medium text-gray-400 px-2 uppercase tracking-wider mb-2'>Shopping</p>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <OptionTabs icons={ShoppingBag} text='My Orders' borderDown={true} />
            <OptionTabs icons={HeartIcon} text='Wishlist' borderDown={true} />
            <OptionTabs icons={Ticket} text='Coupons' borderDown={true} />
            <OptionTabs icons={Star} text='Reviews' borderDown={false} />
          </div>
        </div>

        <div className='py-2 space-y-1'>
          <p className='text-xs font-medium text-gray-400 px-2 uppercase tracking-wider mb-2'>Support</p>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <OptionTabs icons={HelpCircle} text='Help Center' borderDown={true} />
            <OptionTabs icons={Shield} text='Privacy Policy' borderDown={true} />
            <OptionTabs icons={FileText} text='Terms & Conditions' borderDown={false} />
          </div>
        </div>

        <div className='py-2 space-y-1'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <OptionTabs icons={StoreIcon} text='Become a Seller' borderDown={true} />
            <OptionTabs icons={MessageSquareTextIcon} text='Messages' borderDown={true}/>
            {isLoggedIn ? (
              <OptionTabs icons={LogOutIcon} text='Logout' textDesign='text-red-500' design='text-red-500' borderDown={false} onClick={handleLogout} />
            ) : (
              <OptionTabs icons={LogIn} text='Login' textDesign='text-green-600' design='text-green-600' borderDown={false} onClick={() => router.push('/auth')} />
            )}
          </div>
        </div>

        <div className='py-6 text-center'>
          <p className='text-xs text-gray-400'>Constructo v1.0.0</p>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage