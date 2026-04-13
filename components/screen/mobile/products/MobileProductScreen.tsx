'use client'
import React, { useState } from 'react'
import DisplayProducts from './pages/DisplayProducts'
import Details from './pages/Details'

const MobileProductScreen = () => {
    const [page, setPage] = useState<number>(0)
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        {page === 0 && (
             <DisplayProducts setS={() => setPage(1)}/>
        )}
        {page === 1 && (
             <Details goBack={() => setPage(0)}/>
        )}
    </div>
  )
}

export default MobileProductScreen