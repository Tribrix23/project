'use client'
import { useSearchParams } from 'next/navigation'
import PaymentTab from './views/PaymentTab'
import ConfirmationTab from './views/Confirmation'
import Succeed from './views/Succeed'
import Failed from './views/Failed'

const MobilePayment = () => {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')

  if (q === 'cnf') {
    return (
      <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <ConfirmationTab />
      </div>
    )
  }

  if (q === 'sd') {
    return (
      <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <Succeed />
      </div>
    )
  }

  if (q === 'fd') {
    return (
      <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <Failed />
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <PaymentTab/>
    </div>
  )
}

export default MobilePayment