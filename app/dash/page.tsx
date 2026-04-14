import MobileDashboardScreen from '@/components/screen/mobile/dash/MobileDashboardScreen'
import React from 'react'

const page = () => {
  return (
    <div className="w-full h-full md:hidden">
        <MobileDashboardScreen/>
    </div>
  )
}

export default page