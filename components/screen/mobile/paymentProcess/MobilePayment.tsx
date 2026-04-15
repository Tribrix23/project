import React from 'react'
import PaymentTab from './components/PaymentTab'
import Confirmation from './components/Confirmation'

const MobilePayment = () => {
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <PaymentTab/>
    </div>
  )
}

export default MobilePayment