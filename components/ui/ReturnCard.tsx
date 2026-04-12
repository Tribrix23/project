'use client'
import React from 'react'
import Image from 'next/image'
import { Clock, Eye, XCircle, CheckCircle, AlertCircle } from 'lucide-react'

export type ReturnStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed'

export type ReturnCardProps = {
  id: string
  date: string
  status: ReturnStatus
  item: string
  amount: number
  image: string
  reason: string
  onViewDetails?: () => void
  onCancelRequest?: () => void
}

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  Pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
  Approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
  Rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
  Completed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle },
}

const ReturnCard: React.FC<ReturnCardProps> = ({
  id,
  date,
  status,
  item,
  amount,
  image,
  reason,
  onViewDetails,
  onCancelRequest,
}) => {
  const config = statusConfig[status] || statusConfig.Pending
  const StatusIcon = config.icon

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='p-4'>
        <div className='flex gap-3 mb-4'>
          <div className='w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0'>
            <Image src={image} width={80} height={80} alt={item} className='w-full h-full object-cover' />
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-start'>
              <div>
                <p className='text-xs text-gray-500'>{date}</p>
                <p className='text-sm font-bold text-gray-800'>{id}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${config.bg} ${config.text}`}>
                <StatusIcon size={12} />
                {status}
              </span>
            </div>
            <p className='text-base font-semibold text-gray-800 mt-2'>{item}</p>
            <p className='text-xs text-gray-500 mt-1'>Reason: {reason}</p>
          </div>
        </div>
        
        <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-500'>Refund Amount</span>
            {status === 'Approved' && (
              <span className='px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full'>Refunded</span>
            )}
            {status === 'Completed' && (
              <span className='px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-medium rounded-full'>Completed</span>
            )}
          </div>
          <span className='text-lg font-bold text-gray-800'>₱{amount.toLocaleString()}</span>
        </div>
      </div>
      
      {status === 'Pending' && (
        <div className='flex border-t border-gray-100'>
          <button 
            onClick={onViewDetails}
            className='flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 border-r border-gray-100'
          >
            <Eye size={16} />
            View Details
          </button>
          <button 
            onClick={onCancelRequest}
            className='flex-1 py-3 text-sm font-medium text-red-500 hover:bg-red-50 flex items-center justify-center gap-1.5'
          >
            <XCircle size={16} />
            Cancel Request
          </button>
        </div>
      )}
      
      {status === 'Approved' && (
        <div className='flex border-t border-gray-100'>
          <button 
            onClick={onViewDetails}
            className='flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5'
          >
            <Eye size={16} />
            View Details
          </button>
        </div>
      )}
    </div>
  )
}

export default ReturnCard