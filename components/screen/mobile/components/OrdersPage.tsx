'use client'
import IconBadge from '@/components/ui/IconBadge'
import OrderCard, { OrderItem } from '@/components/ui/OrderCard'
import ReturnCard from '@/components/ui/ReturnCard'
import { BellIcon, Package, Clock, Search, X, RotateCcw } from 'lucide-react'
import React, {useState} from 'react'

type Order = {
  id: string
  date: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  total: number
  items: OrderItem[]
  shippingAddress: string
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: string
  progress?: number
}

type Return = {
  id: string
  date: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed'
  item: string
  amount: number
  image: string
  reason: string
}

const orders: Order[] = [
  { 
    id: 'ORD-001', 
    date: 'Apr 10, 2026', 
    status: 'Delivered', 
    total: 400, 
    items: [
      { name: 'Professional Hammer', price: 3500, image: '/images/hammer.png' },
      { name: 'Safety Helmet', price: 2000, image: '/images/hat.png' }
    ],
    shippingAddress: '123 Main St, Manila',
    paymentMethod: 'GCash'
  },
  { 
    id: 'ORD-002', 
    date: 'Apr 8, 2026', 
    status: 'Shipped', 
    total: 3200, 
    progress: 66,
    trackingNumber: 'TRK-2026-002',
    estimatedDelivery: 'Apr 14, 2026',
    items: [
      { name: 'Cordless Drill Set', price: 3200, image: '/images/drill.png' }
    ],
    shippingAddress: '456 Oak Ave, Quezon City',
    paymentMethod: 'Credit Card'
  },
  { 
    id: 'ORD-003', 
    date: 'Apr 5, 2026', 
    status: 'Processing', 
    total: 1250, 
    progress: 25,
    items: [
      { name: 'Screwdriver Set', price: 450, image: '/images/screw.png' },
      { name: 'Tape Measure', price: 400, image: '/images/hammer.png' },
      { name: 'Level Tool', price: 400, image: '/images/hammer.png' }
    ],
    shippingAddress: '789 Pine Rd, Makati',
    paymentMethod: 'Cash on Delivery'
  },
  { 
    id: 'ORD-004', 
    date: 'Apr 2, 2026', 
    status: 'Delivered', 
    total: 8900, 
    items: [
      { name: 'Power Drill', price: 8900, image: '/images/drill.png' }
    ],
    shippingAddress: '321 Elm St, Tagaytay',
    paymentMethod: 'GCash'
  },
]

const returns: Return[] = [
  { id: 'RET-001', date: 'Apr 9, 2026', status: 'Pending', item: 'Cordless Drill', amount: 3200, image: '/images/drill.png', reason: 'Defective product' },
  { id: 'RET-002', date: 'Apr 1, 2026', status: 'Approved', item: 'Safety Helmet', amount: 450, image: '/images/hat.png', reason: 'Wrong item delivered' },
]

const filterOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const OrdersPage = () => {
    const [isOrder, setIsOrder] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('All')
    
    const filteredOrders = orders.filter(o => {
      const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFilter = activeFilter === 'All' || o.status === activeFilter
      return matchesSearch && matchesFilter
    })
    
  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
      <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0 z-20'>
        <h1 className='text-xl font-bold text-gray-800'>Orders</h1>
        <div className='relative'>
          <IconBadge icon={BellIcon} size={6} w={7} badge number={3} design="text-gray-600" color='red'/>
        </div>
      </header>

      <div className='w-full px-4 py-3 space-y-3 bg-white shadow-sm'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={18} />
          <input 
            type='text'
            placeholder='Search orders...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-200'
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className='absolute right-3 top-1/2 -translate-y-1/2'>
              <X size={16} className='text-gray-400' />
            </button>
          )}
        </div>
        
        <div className='flex gap-2 bg-gray-100 p-1 rounded-xl'>
          <button 
            onClick={() => setIsOrder(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${isOrder ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setIsOrder(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${!isOrder ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500'}`}
          >
            Returns
          </button>
        </div>
      </div>

      {isOrder && (
        <div className='w-full px-4 py-2 bg-white border-b border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide'>
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeFilter === filter ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <main className='flex-1 overflow-scroll px-4 pb-44'>
        {isOrder ? (
          <div className='space-y-3 pt-3'>
            {filteredOrders.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <Package size={40} className='text-gray-300' />
                </div>
                <p className='text-gray-500 font-medium text-base'>No orders found</p>
                <p className='text-gray-400 text-sm mt-1'>Try adjusting your search or filter</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveFilter('All')}}
                  className='mt-4 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full'
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  date={order.date}
                  status={order.status}
                  total={order.total}
                  items={order.items}
                  shippingAddress={order.shippingAddress}
                  paymentMethod={order.paymentMethod}
                  trackingNumber={order.trackingNumber}
                  estimatedDelivery={order.estimatedDelivery}
                  progress={order.progress}
                />
              ))
            )}
          </div>
        ) : (
          <div className='space-y-3 pt-3'>
            {returns.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-16 text-center'>
                <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                  <RotateCcw size={40} className='text-gray-300' />
                </div>
                <p className='text-gray-500 font-medium text-base'>No returns</p>
                <p className='text-gray-400 text-sm mt-1'>You have no return requests</p>
              </div>
            ) : (
              returns.map((ret) => (
                <ReturnCard
                  key={ret.id}
                  id={ret.id}
                  date={ret.date}
                  status={ret.status}
                  item={ret.item}
                  amount={ret.amount}
                  image={ret.image}
                  reason={ret.reason}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default OrdersPage