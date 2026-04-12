'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { 
  CheckCircle, Truck, Package, Clock, 
  MapPin, Eye, RotateCcw, ChevronDown,
  Search, X
} from 'lucide-react'

export type OrderItem = {
  name: string
  price: number
  image: string
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'

export type OrderCardProps = {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
  progress?: number
  onViewDetails?: () => void
  onTrackOrder?: () => void
  onReorder?: () => void
}

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  Processing: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Package },
  Shipped: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Truck },
  Delivered: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
  Cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock },
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  date,
  status,
  total,
  items,
  shippingAddress,
  paymentMethod,
  trackingNumber,
  estimatedDelivery,
  progress = 0,
  onViewDetails,
  onTrackOrder,
  onReorder,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const config = statusConfig[status] || statusConfig.Processing
  const StatusIcon = config.icon
  const showProgress = (status === 'Processing' || status === 'Shipped') && progress > 0

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
      <div className='p-4'>
        <div className='flex justify-between items-start mb-3'>
          <div>
            <p className='text-xs text-gray-500'>{date}</p>
            <p className='text-sm font-bold text-gray-800'>{id}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${config.bg} ${config.text}`}>
            <StatusIcon size={12} />
            {status}
          </span>
        </div>
        
        {showProgress && (
          <div className='mb-4 p-3 bg-gray-50 rounded-xl'>
            <div className='flex justify-between text-xs text-gray-600 mb-2'>
              <span className='font-medium'>Order Progress</span>
              <span className='font-bold'>{progress}%</span>
            </div>
            <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
              <div 
                className={`h-full rounded-full transition-all duration-700 ${status === 'Shipped' ? 'bg-blue-500' : 'bg-orange-500'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className='flex justify-between text-[10px] text-gray-400 mt-2'>
              <span className={progress >= 10 ? 'text-orange-500' : ''}>Placed</span>
              <span className={progress >= 40 ? 'text-orange-500' : ''}>Processing</span>
              <span className={progress >= 70 ? 'text-blue-500' : ''}>Shipped</span>
              <span className={progress >= 100 ? 'text-green-500' : ''}>Delivered</span>
            </div>
          </div>
        )}

        {status === 'Shipped' && trackingNumber && (
          <div className='mb-3 px-3 py-2 bg-blue-50 rounded-lg flex items-center justify-between'>
            <div>
              <p className='text-xs text-blue-600 font-medium'>Tracking Number</p>
              <p className='text-sm text-blue-800 font-bold'>{trackingNumber}</p>
            </div>
            {estimatedDelivery && (
              <div className='text-right'>
                <p className='text-xs text-blue-600'>Est. Delivery</p>
                <p className='text-sm text-blue-800 font-medium'>{estimatedDelivery}</p>
              </div>
            )}
          </div>
        )}

        <div className='flex gap-2 mb-3'>
          {items.slice(0, 3).map((item, idx) => (
            <div key={idx} className='relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden group'>
              <Image src={item.image} width={56} height={56} alt={item.name} className='w-full h-full object-cover' />
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <p className='text-[10px] text-white font-medium text-center px-1'>{item.name.split(' ').slice(0,2).join(' ')}</p>
              </div>
            </div>
          ))}
          {items.length > 3 && (
            <div className='w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center'>
              <span className='text-xs font-bold text-gray-500'>+{items.length - 3}</span>
            </div>
          )}
        </div>

        <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
          <div className='flex items-center gap-3'>
            <span className='text-sm text-gray-500'>{items.length} item(s)</span>
            <span className='text-xs text-gray-400'>{paymentMethod}</span>
          </div>
          <span className='text-lg font-bold text-orange-500'>₱{total.toLocaleString()}</span>
        </div>
      </div>
      
      <div className='border-t border-gray-100'>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className='w-full py-2.5 text-sm font-medium text-gray-600 flex items-center justify-center gap-1 hover:bg-gray-50'
        >
          {isExpanded ? 'Hide Details' : 'View Details'}
          <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className='px-4 pb-4 space-y-3'>
            <div className='p-3 bg-gray-50 rounded-xl'>
              <p className='text-xs font-medium text-gray-500 mb-1.5 flex items-center gap-1.5'>
                <MapPin size={12} />
                Shipping Address
              </p>
              <p className='text-sm text-gray-700'>{shippingAddress}</p>
            </div>
            
            <div className='grid grid-cols-2 gap-2'>
              {items.map((item, idx) => (
                <div key={idx} className='p-2 bg-gray-50 rounded-lg flex items-center gap-2'>
                  <div className='w-10 h-10 bg-gray-200 rounded-md overflow-hidden'>
                    <Image src={item.image} width={40} height={40} alt={item.name} className='w-full h-full object-cover' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-xs text-gray-500 truncate'>{item.name}</p>
                    <p className='text-sm font-bold text-gray-800'>₱{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className='flex border-t border-gray-100'>
        <button 
          onClick={onTrackOrder}
          className='flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 border-r border-gray-100'
        >
          <Eye size={16} />
          Track Order
        </button>
        <button 
          onClick={onReorder}
          className='flex-1 py-3 text-sm font-medium text-orange-500 hover:bg-orange-50 flex items-center justify-center gap-1.5'
        >
          <RotateCcw size={16} />
          Reorder
        </button>
      </div>
    </div>
  )
}

export default OrderCard