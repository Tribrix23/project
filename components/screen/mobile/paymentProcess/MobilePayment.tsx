'use client'
import { useSearchParams } from 'next/navigation'
import PaymentTab from './views/PaymentTab'
import ConfirmationTab from './views/Confirmation'

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

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden'>
        <PaymentTab/>
    </div>
  )
}

export default MobilePayment