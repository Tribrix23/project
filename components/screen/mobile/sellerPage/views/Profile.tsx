'use client'

import React, { useState, useEffect } from 'react'
import { 
  User, Mail, Phone, MapPin, LogOut, 
  AlertCircle, Store, ChevronRight
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type ProfileData = {
  id: string
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  email: string
  phone: string | null
}

type StoreData = {
  id: string
  owner_id: string
  name: string
  description: string | null
  business_type: string | null
  province: string | null
  city: string | null
  barangay: string | null
  street: string | null
  zipcode: string | null
  status: string
  created_at?: string
  updated_at?: string
}

type ApiResponse = {
  profile: ProfileData
  store: StoreData
}

const SkeletonProfileHeader = () => (
  <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100'>
    <div className='flex items-center gap-4'>
      <div className='relative w-16 h-16 rounded-full bg-gray-200 animate-pulse'></div>
      <div className='flex-1'>
        <div className='h-4 bg-gray-200 rounded-md animate-pulse mb-2 w-2/3'></div>
        <div className='h-2 bg-gray-200 rounded-md animate-pulse mb-3 w-1/2'></div>
      </div>
    </div>
  </div>
)

const SkeletonInfoItem = () => (
  <div className='p-4'>
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 bg-gray-200 rounded-full animate-pulse'></div>
      <div className='flex-1'>
        <div className='h-3 bg-gray-200 rounded-md animate-pulse mb-1 w-24'></div>
        <div className='h-2 bg-gray-200 rounded-md animate-pulse w-32'></div>
      </div>
    </div>
  </div>
)

const SkeletonStoreItem = () => (
  <div className='p-4'>
    <div className='flex items-center gap-4'>
      <div className='w-11 h-11 bg-gray-200 rounded-xl animate-pulse'></div>
      <div className='flex-1'>
        <div className='h-3 bg-gray-200 rounded-md animate-pulse mb-1 w-24'></div>
        <div className='h-3 bg-gray-200 rounded-md animate-pulse w-40'></div>
      </div>
    </div>
  </div>
)

const Profile = ({ goBack }: { goBack?: () => void }) => {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [store, setStore] = useState<StoreData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/seller/profile')
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch profile data')
        }
        
        const data: ApiResponse = await response.json()
        setProfile(data.profile)
        setStore(data.store)
      } catch (err: any) {
        console.error('Error fetching profile data:', err)
        setError(err.message || 'Failed to load profile data')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [])

  const handleLogout = async () => {
    // In a real app, you would call a logout API endpoint
    // For now, we'll just redirect to home
    router.push('/')
  }

  const getFullName = (p: ProfileData | null): string => {
    if (!p) return 'Seller'
    const { first_name, middle_name, last_name } = p
    const parts = [
      first_name?.trim(),
      middle_name?.trim() ? `${middle_name.trim().charAt(0)}.` : '',
      last_name?.trim()
    ].filter(Boolean)
    return parts.join(' ') || 'Seller'
  }

  if (loading) {
    return (
      <div className='w-full h-full flex flex-col bg-gray-50'>
        <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0'>
          <h1 className='text-xl font-bold text-gray-800'>Seller Profile</h1>
          {goBack && (
            <button onClick={goBack} className='p-2 rounded-full hover:bg-gray-100'>
              <ChevronRight size={20} className='text-gray-600' rotate={180} />
            </button>
          )}
        </header>
        <main className='flex-1 overflow-scroll px-4 pb-16'>
          <div className='py-6'>
            <SkeletonProfileHeader />
            <div className='mt-6 space-y-4'>
              {[1, 2, 3, 4, 5].map(() => (
                <SkeletonInfoItem key={Math.random()} />
              ))}
            </div>
            <div className='mt-6'>
              <h2 className='text-lg font-bold text-gray-800 mb-3'>Store Information</h2>
              <div className='space-y-3'>
                {[1, 2, 3, 4].map(() => (
                  <SkeletonStoreItem key={Math.random()} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <div className='py-4 text-center'>
          <p className='text-xs text-gray-400'>Constructo v1.0.0</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='w-full h-full flex flex-col bg-gray-50'>
        <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0'>
          <h1 className='text-xl font-bold text-gray-800'>Seller Profile</h1>
          {goBack && (
            <button onClick={goBack} className='p-2 rounded-full hover:bg-gray-100'>
              <ChevronRight size={20} className='text-gray-600' rotate={180} />
            </button>
          )}
        </header>
        <main className='flex-1 overflow-scroll px-4 pb-16'>
          <div className='flex min-h-[calc(100%-16rem)] items-center justify-center'>
            <div className='text-center p-6'>
              <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3'>
                <AlertCircle className='w-8 h-8 text-red-500' />
              </div>
              <p className='text-gray-600 font-medium'>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className='mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600'
              >
                Retry
              </button>
            </div>
          </div>
        </main>
        <div className='py-4 text-center'>
          <p className='text-xs text-gray-400'>Constructo v1.0.0</p>
        </div>
      </div>
    )
  }

  if (!profile || !store) {
    return (
      <div className='w-full h-full flex flex-col bg-gray-50'>
        <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0'>
          <h1 className='text-xl font-bold text-gray-800'>Seller Profile</h1>
          {goBack && (
            <button onClick={goBack} className='p-2 rounded-full hover:bg-gray-100'>
              <ChevronRight size={20} className='text-gray-600' rotate={180} />
            </button>
          )}
        </header>
        <main className='flex-1 overflow-scroll px-4 pb-16'>
          <div className='flex min-h-[calc(100%-16rem)] items-center justify-center'>
            <div className='text-center p-6'>
              <div className='w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3'>
                <Store size={24} className='text-orange-500' />
              </div>
              <p className='text-gray-500 text-lg'>Profile not set up</p>
              <p className='text-gray-400 mt-2'>Please complete your seller profile</p>
              <button 
                onClick={() => router.push('/settings?c=seller')}
                className='mt-4 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600'
              >
                Set Up Profile
              </button>
            </div>
          </div>
        </main>
        <div className='py-4 text-center'>
          <p className='text-xs text-gray-400'>Constructo v1.0.0</p>
        </div>
      </div>
    )
  }

  return (
<div className='w-full h-full flex flex-col bg-gray-50'>
       <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0'>
         <h1 className='text-xl font-bold text-gray-800'>Seller Profile</h1>
         {goBack && (
           <button onClick={goBack} className='p-2 rounded-full hover:bg-gray-100'>
             <ChevronRight size={20} className='text-gray-600' rotate={180} />
           </button>
         )}
       </header>
       <main className='flex-1 overflow-scroll px-4 pb-16'>
         <div className='py-6'>
           {/* Profile Header */}
           <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100'>
             <div className='flex items-center gap-4'>
               <div className='relative'>
                 <div className='w-16 h-16 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center'>
                   <Store size={24} className='text-white' />
                 </div>
               </div>
               <div className='flex-1'>
                 <h2 className='text-lg font-bold text-gray-800 truncate'>
                   {getFullName(profile)}
                 </h2>
                 <p className='text-sm text-gray-500'>{profile.email}</p>
               </div>
             </div>
           </div>

{/* Account Information */}
           <div className='mt-6'>
             <h2 className='text-lg font-bold text-gray-800 mb-3'>Account Information</h2>
             <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100'>
               <div className='space-y-4'>
                 <div className='flex items-center gap-3 p-4'>
                   <User size={18} className='text-orange-500' />
                   <div className='flex-1'>
                     <p className='text-sm font-medium text-gray-600'>Full Name</p>
                     <p className='text-base font-semibold text-gray-800'>
                       {getFullName(profile)}
                     </p>
                   </div>
                 </div>
                 <div className='flex items-center gap-3 p-4 border-t border-gray-100'>
                   <Mail size={18} className='text-orange-500' />
                   <div className='flex-1'>
                     <p className='text-sm font-medium text-gray-600'>Email Address</p>
                     <p className='text-base font-semibold text-gray-800'>{profile.email}</p>
                   </div>
                 </div>
                 <div className='flex items-center gap-3 p-4 border-t border-gray-100'>
                   <Phone size={18} className='text-orange-500' />
                   <div className='flex-1'>
                     <p className='text-sm font-medium text-gray-600'>Phone Number</p>
                     <p className='text-base font-semibold text-gray-800'>
                       {profile.phone || 'Not provided'}
                     </p>
                   </div>
                 </div>
               </div>
             </div>
           </div>

{/* Store Information */}
           <div className='mt-6'>
             <h2 className='text-lg font-bold text-gray-800 mb-3'>Store Information</h2>
             <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100'>
               <div className='space-y-4'>
                 <div className='flex items-center gap-3 p-4'>
                   <Store size={18} className='text-orange-500' />
                   <div className='flex-1'>
                     <p className='text-sm font-medium text-gray-600'>Store Name</p>
                     <p className='text-base font-semibold text-gray-800'>{store.name}</p>
                   </div>
                 </div>
                 <div className='flex items-center gap-3 p-4 border-t border-gray-100'>
                   <MapPin size={18} className='text-orange-500' />
                   <div className='flex-1'>
                     <p className='text-sm font-medium text-gray-600'>Address</p>
                     <p className='text-base font-semibold text-gray-800'>
                       {[store.street, store.barangay, store.city, store.province, store.zipcode]
                         .filter(Boolean)
                         .join(', ') || 'Not provided'}
                     </p>
                   </div>
                 </div>
                 <div className='flex items-center gap-3 p-4 border-t border-gray-100'>
                   <AlertCircle size={18} className='text-orange-500' />
                   <div className='flex-1'>
                     <p className='text-sm font-medium text-gray-600'>Business Type</p>
                     <p className='text-base font-semibold text-gray-800'>{store.business_type || 'Not specified'}</p>
                   </div>
                 </div>
               </div>
             </div>
           </div>

{/* Action Buttons */}
         <div className='px-4 pb-6'>
           <div className='space-y-3'>
             <button 
               onClick={() => router.push('/')}
               className='w-full flex items-center justify-center gap-2 py-3 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors'
             >
               <Store size={18} className='text-orange-500' />
               Buyer Mode
             </button>
             <button 
               onClick={handleLogout}
               className='w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-medium hover:bg-red-100 transition-colors'
             >
               <LogOut size={18} className='text-red-500' />
               Logout
             </button>
           </div>
         </div>
        </div>
      </main>

      <div className='py-4 text-center'>
        <p className='text-xs text-gray-400'>Constructo v1.0.0</p>
      </div>
    </div>
  )

}

export default Profile