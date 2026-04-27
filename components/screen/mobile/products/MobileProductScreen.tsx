'use client'
import React, { useState, useEffect } from 'react'
import DisplayProducts from './views/DisplayProducts'
import Details from './views/Details'
import { createClient } from '@/lib/supabase/client'

type UserData = {
  name: string
  email: string
  memberSince: string
  level: string
}

const MobileProductScreen = () => {
    const [page, setPage] = useState<number>(0)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState<UserData>({
      name: 'Guest User',
      email: 'guest@example.com',
      memberSince: '2025',
      level: 'Bronze'
    })
    const supabase = createClient()

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

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        {page === 0 && (
             <DisplayProducts setS={() => setPage(1)}/>
        )}
        {page === 1 && (
             <Details goBack={() => setPage(0)} isLoggedIn={isLoggedIn} user={userData}/>
        )}
    </div>
  )
}

export default MobileProductScreen