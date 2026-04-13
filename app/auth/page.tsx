import MobileAuthPage from '@/components/screen/mobile/authentication/MobileAuthPage'
import React from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"

const page = () => {
  return (
    <div className="w-full h-full md:hidden">
        <MobileAuthPage/>
    </div>
  )
}

export default page