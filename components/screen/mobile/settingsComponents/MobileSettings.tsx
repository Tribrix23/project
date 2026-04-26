'use client'
import React from 'react'
import SellerAplly from './components/SellerAplly'
import Address from './components/Address'
import { useSearchParams } from 'next/navigation'

const MobileSettings = () => {
  const searchParams = useSearchParams();
  const settings = searchParams.get('c');

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      {settings === 'seller' && <SellerAplly />}
      {settings === 'addr' && <Address />}
    </div>
  )
}

export default MobileSettings