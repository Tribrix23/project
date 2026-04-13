import MobileProductScreen from '@/components/screen/mobile/products/MobileProductScreen'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className="w-full h-full md:hidden">
       <Suspense fallback={<div>Loading...</div>}>
          <MobileProductScreen/>
      </Suspense>
    </div>
  )
}

export default page