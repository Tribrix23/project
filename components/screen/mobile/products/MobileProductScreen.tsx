'use client'
import React, { useState } from 'react'
import DisplayProducts from './pages/DisplayProducts'
import Details from './pages/Details'

const MobileProductScreen = () => {
    const [page, setPage] = useState<number>(1)
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        {page === 0 && (
             <DisplayProducts/>
        )}
        {page === 1 && (
             <Details/>
        )}
    </div>
  )
}

export default MobileProductScreen