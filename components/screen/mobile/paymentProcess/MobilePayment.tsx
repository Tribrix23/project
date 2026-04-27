import React from 'react'
import PaymentTab from './views/PaymentTab'
import Confirmation from './views/Confirmation'

const MobilePayment = () => {
  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <PaymentTab/>
    </div>
  )
}

export default MobilePayment