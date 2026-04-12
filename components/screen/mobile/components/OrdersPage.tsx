'use client'
import IconBadge from '@/components/ui/IconBadge'
import Image from 'next/image'
import { 
  BellIcon, Package, Truck, CheckCircle, Clock, Search, 
  RotateCcw, Eye, MapPin, Phone, Mail, ChevronDown, X 
} from 'lucide-react'
import React, {useState} from 'react'

const orders = [
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

const returns = [
  { id: 'RET-001', date: 'Apr 9, 2026', status: 'Pending', item: 'Cordless Drill', amount: 3200, image: '/images/drill.png', reason: 'Defective product' },
  { id: 'RET-002', date: 'Apr 1, 2026', status: 'Approved', item: 'Safety Helmet', amount: 450, image: '/images/hat.png', reason: 'Wrong item delivered' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' }
    case 'Shipped': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' }
    case 'Processing': return { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' }
    case 'Pending': return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' }
    case 'Approved': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' }
    default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' }
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Delivered': return CheckCircle
    case 'Shipped': return Truck
    case 'Processing': return Package
    default: return Clock
  }
}

const filterOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const OrdersPage = () => {
    const [isOrder, setIsOrder] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeFilter, setActiveFilter] = useState('All')
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
    
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
              filteredOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status)
                const statusStyle = getStatusColor(order.status)
                const isExpanded = expandedOrder === order.id
                
                return (
                  <div key={order.id} className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className='p-4'>
                      <div className='flex justify-between items-start mb-3'>
                        <div>
                          <p className='text-xs text-gray-500'>{order.date}</p>
                          <p className='text-sm font-bold text-gray-800'>{order.id}</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.text}`}>
                          <StatusIcon size={12} />
                          {order.status}
                        </span>
                      </div>
                      
                      {(order.status === 'Processing' || order.status === 'Shipped') && (
                        <div className='mb-4 p-3 bg-gray-50 rounded-xl'>
                          <div className='flex justify-between text-xs text-gray-600 mb-2'>
                            <span className='font-medium'>Order Progress</span>
                            <span className='font-bold'>{order.progress ?? 0}%</span>
                          </div>
                          <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${order.status === 'Shipped' ? 'bg-blue-500' : 'bg-orange-500'}`}
                              style={{ width: `${order.progress ?? 0}%` }}
                            />
                          </div>
                          <div className='flex justify-between text-[10px] text-gray-400 mt-2'>
                            <span className={(order.progress ?? 0) >= 10 ? 'text-orange-500' : ''}>Placed</span>
                            <span className={(order.progress ?? 0) >= 40 ? 'text-orange-500' : ''}>Processing</span>
                            <span className={(order.progress ?? 0) >= 70 ? 'text-blue-500' : ''}>Shipped</span>
                            <span className={(order.progress ?? 0) >= 100 ? 'text-green-500' : ''}>Delivered</span>
                          </div>
                        </div>
                      )}

                      {order.status === 'Shipped' && order.trackingNumber && (
                        <div className='mb-3 px-3 py-2 bg-blue-50 rounded-lg flex items-center justify-between'>
                          <div>
                            <p className='text-xs text-blue-600 font-medium'>Tracking Number</p>
                            <p className='text-sm text-blue-800 font-bold'>{order.trackingNumber}</p>
                          </div>
                          <div className='text-right'>
                            <p className='text-xs text-blue-600'>Est. Delivery</p>
                            <p className='text-sm text-blue-800 font-medium'>{order.estimatedDelivery}</p>
                          </div>
                        </div>
                      )}

                      <div className='flex gap-2 mb-3'>
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx} className='relative w-14 h-14 bg-gray-100 rounded-lg overflow-hidden group'>
                            <Image src={item.image} width={56} height={56} alt={item.name} className='w-full h-full object-cover' />
                            <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                              <p className='text-[10px] text-white font-medium text-center px-1'>{item.name.split(' ').slice(0,2).join(' ')}</p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className='w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center'>
                            <span className='text-xs font-bold text-gray-500'>+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>

                      <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
                        <div className='flex items-center gap-3'>
                          <span className='text-sm text-gray-500'>{order.items.length} item(s)</span>
                          <span className='text-xs text-gray-400'>{order.paymentMethod}</span>
                        </div>
                        <span className='text-lg font-bold text-orange-500'>₱{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className='border-t border-gray-100'>
                      <button 
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
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
                            <p className='text-sm text-gray-700'>{order.shippingAddress}</p>
                          </div>
                          
                          <div className='grid grid-cols-2 gap-2'>
                            {order.items.map((item, idx) => (
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
                      <button className='flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 border-r border-gray-100'>
                        <Eye size={16} />
                        Track Order
                      </button>
                      <button className='flex-1 py-3 text-sm font-medium text-orange-500 hover:bg-orange-50 flex items-center justify-center gap-1.5'>
                        <RotateCcw size={16} />
                        Reorder
                      </button>
                    </div>
                  </div>
                )
              })
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
              returns.map((ret) => {
                const statusStyle = getStatusColor(ret.status)
                return (
                  <div key={ret.id} className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                    <div className='p-4'>
                      <div className='flex gap-3 mb-4'>
                        <div className='w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0'>
                          <Image src={ret.image} width={80} height={80} alt={ret.item} className='w-full h-full object-cover' />
                        </div>
                        <div className='flex-1'>
                          <div className='flex justify-between items-start'>
                            <div>
                              <p className='text-xs text-gray-500'>{ret.date}</p>
                              <p className='text-sm font-bold text-gray-800'>{ret.id}</p>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.text}`}>
                              <Clock size={12} />
                              {ret.status}
                            </span>
                          </div>
                          <p className='text-base font-semibold text-gray-800 mt-2'>{ret.item}</p>
                          <p className='text-xs text-gray-500 mt-1'>Reason: {ret.reason}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                        <div className='flex items-center gap-2'>
                          <span className='text-xs text-gray-500'>Refund Amount</span>
                          {ret.status === 'Approved' && (
                            <span className='px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded-full'>Refunded</span>
                          )}
                        </div>
                        <span className='text-lg font-bold text-gray-800'>₱{ret.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {ret.status === 'Pending' && (
                      <div className='flex border-t border-gray-100'>
                        <button className='flex-1 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5 border-r border-gray-100'>
                          <Eye size={16} />
                          View Details
                        </button>
                        <button className='flex-1 py-3 text-sm font-medium text-red-500 hover:bg-red-50 flex items-center justify-center gap-1.5'>
                          Cancel Request
                        </button>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default OrdersPage