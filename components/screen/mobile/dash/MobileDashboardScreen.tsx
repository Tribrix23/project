'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import Dashboard from './components/Dashboard'
import TotalUsers from './components/TotalUsers'
import Pending from './components/Pending'
import { ArrowLeft } from 'lucide-react'

const MobileDashboardScreen = () => {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get('page') || 'dashboard'
  const filter = searchParams.get('f') || ''

  const handleGoBack = () => {
    if (currentPage === 'users' && filter === 'pending') {
      window.location.href = '/dash?page=users'
    } else {
      window.location.href = '/dash'
    }
  }

  if (currentPage === 'users' && filter === 'pending') {
    return (
      <div className="w-full h-full flex flex-col relative overflow-hidden bg-gray-50">
        <div className="w-full shrink-0 bg-blue-600 z-20 relative">
          <header className="w-full px-4 pt-4 pb-2 relative z-10">
            <div className="flex items-center gap-3">
              <button onClick={handleGoBack} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h1 className="text-xl font-bold text-white tracking-wide">Pending Users</h1>
            </div>
          </header>
        </div>
        <div className="flex-1 overflow-scroll">
          <Pending />
        </div>
      </div>
    )
  }

  if (currentPage === 'users') {
    return (
      <div className="w-full h-full flex flex-col relative overflow-hidden bg-gray-50">
        <div className="w-full shrink-0 bg-blue-600 z-20 relative">
          <header className="w-full px-4 pt-4 pb-2 relative z-10">
            <div className="flex items-center gap-3">
              <button onClick={handleGoBack} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h1 className="text-xl font-bold text-white tracking-wide">Total Users</h1>
            </div>
          </header>
        </div>
        <div className="flex-1 overflow-scroll">
          <TotalUsers />
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <Dashboard/>
    </div>
  )
}

export default MobileDashboardScreen