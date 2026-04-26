import MobileSettings from '@/components/screen/mobile/settingsComponents/MobileSettings'
import React, { Suspense } from 'react'
import Image from 'next/image'

const LoadingFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-orange-500 gap-3">
    <Image src="/favicon.png" width={64} height={64} alt="" className="animate-pulse" />
    <span className="text-white font-bold text-xl">Constructo</span>
    <span className="text-white/80 text-sm">Loading...</span>
  </div>
)

const page = () => {
  return (
    <div className="w-full h-full md:hidden">
      <Suspense fallback={<LoadingFallback />}>
        <MobileSettings/>
      </Suspense>
    </div>
  )
}

export default page