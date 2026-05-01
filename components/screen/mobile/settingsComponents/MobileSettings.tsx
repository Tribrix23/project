'use client'
import React from 'react'
import SellerAplly from './views/SellerAplly'
import Address from './views/Address'
import { useSearchParams } from 'next/navigation'
import ShowAddresses from './views/ShowAddresses'

const MobileSettings = () => {
  const searchParams = useSearchParams();
  const settings = searchParams.get('c');

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
      {settings === 'seller' && <SellerAplly />}
      {settings === 'addr' && <Address />}
      {settings === 'sddr' && <ShowAddresses/>}
    </div>
  )
}

export default MobileSettings