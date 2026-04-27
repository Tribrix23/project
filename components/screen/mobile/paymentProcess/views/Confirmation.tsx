'use client'
import React, { useState } from 'react'
import { CheckCircle2, Home, ShoppingBag, ArrowRight, Share2, Download, Smartphone, CreditCard, Truck, Package } from 'lucide-react'
import { CiMoneyBill } from 'react-icons/ci'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

type OrderDetails = {
  orderId: string
  date: string
  paymentMethod: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

const ConfirmationTab = () => {
  const [orderDetails] = useState<OrderDetails>({
    orderId: 'ORD-2024-78432',
    date: new Date().toLocaleDateString('en-PH', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    paymentMethod: 'gcash',
    items: [
      {
        id: 1,
        name: 'Portland Cement',
        category: 'Cement & Concrete',
        price: 285,
        quantity: 10,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200'
      },
      {
        id: 2,
        name: 'Steel Bar #4',
        category: 'Steel Materials',
        price: 450,
        quantity: 20,
        image: 'https://images.unsplash.com/photo-1504917594977-af2738926b08?w=200'
      },
      {
        id: 3,
        name: 'Gravel',
        category: 'Aggregates',
        price: 85,
        quantity: 50,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200'
      }
    ],
    subtotal: 9250,
    shipping: 350,
    total: 9600
  })

  const recommendations = [
    {
      id: 1,
      name: 'Sand (Fine)',
      category: 'Aggregates',
      price: 120,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200'
    },
    {
      id: 2,
      name: 'Steel Bar #3',
      category: 'Steel Materials',
      price: 380,
      image: 'https://images.unsplash.com/photo-1504917594977-af2738926b08?w=200'
    },
    {
      id: 3,
      name: 'Hollow Blocks',
      category: 'Masonry',
      price: 15,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200'
    },
    {
      id: 4,
      name: 'Steel Wire #18',
      category: 'Wire & Binding',
      price: 95,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'
    }
  ]

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'gcash':
        return Smartphone
      case 'credit':
        return CreditCard
      case 'cod':
        return CiMoneyBill
      default:
        return CreditCard
    }
  }

  const getPaymentLabel = (method: string) => {
    switch (method) {
      case 'gcash':
        return 'GCash'
      case 'credit':
        return 'Credit/Debit Card'
      case 'cod':
        return 'Cash on Delivery'
      case 'wallet':
        return 'Shop Wallet'
      default:
        return method
    }
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const PaymentIcon = getPaymentIcon(orderDetails.paymentMethod)

  return (
    <div className='w-full h-full flex flex-col bg-[#F5F3EB]'>
      <main className='flex-1 overflow-y-auto px-4 pb-6'>
        <div className='py-8'>
          <div className='text-center mb-8'>
            <div className='w-20 h-20 bg-linear-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30 animate-in zoom-in duration-300'>
              <CheckCircle2 size={48} className='text-white' />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>Order Confirmed!</h1>
            <p className='text-gray-500 text-sm'>Thank you for your purchase</p>
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-6'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between'>
              <span className='text-xs font-semibold text-gray-600 uppercase'>Order Details</span>
              <span className='text-xs text-gray-400'>#{orderDetails.orderId}</span>
            </div>
            <div className='p-4 space-y-3'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center'>
                  <Package size={16} className='text-orange-500' />
                </div>
                <div className='flex-1'>
                  <p className='text-xs text-gray-400'>Order Date</p>
                  <p className='text-sm font-medium text-gray-800'>{orderDetails.date}</p>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center'>
                  <PaymentIcon size={16} className='text-orange-500' />
                </div>
                <div className='flex-1'>
                  <p className='text-xs text-gray-400'>Payment Method</p>
                  <p className='text-sm font-medium text-gray-800'>{getPaymentLabel(orderDetails.paymentMethod)}</p>
                </div>
                <span className='px-2 py-1 bg-green-50 text-green-600 text-[10px] font-medium rounded-full'>Paid</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center'>
                  <Truck size={16} className='text-orange-500' />
                </div>
                <div className='flex-1'>
                  <p className='text-xs text-gray-400'>Delivery</p>
                  <p className='text-sm font-medium text-gray-800'>Earliest ( Same day - 3 days )</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-6'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100'>
              <span className='text-xs font-semibold text-gray-600 uppercase'>Items Ordered</span>
            </div>
            <div className='divide-y divide-gray-50 overflow-y-auto'>
              {orderDetails.items.map((item) => (
                <div key={item.id} className='flex items-center gap-3 p-3'>
                  <div className='w-10 h-10 bg-gray-100 rounded-lg overflow-hidden'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-800 truncate'>{item.name}</p>
                    <p className='text-xs text-gray-400'>×{item.quantity}</p>
                  </div>
                  <p className='text-sm font-semibold text-gray-700'>₱{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className='px-4 py-3 bg-gray-50 space-y-1.5'>
              <div className='flex justify-between text-xs'>
                <span className='text-gray-500'>Subtotal</span>
                <span className='text-gray-600'>₱{orderDetails.subtotal.toLocaleString()}</span>
              </div>
              <div className='flex justify-between text-xs'>
                <span className='text-gray-500'>Shipping</span>
                <span className='text-gray-600'>₱{orderDetails.shipping}</span>
              </div>
              <div className='flex justify-between text-sm font-bold pt-1.5 border-t border-gray-200'>
                <span className='text-gray-800'>Total</span>
                <span className='text-orange-600'>₱{orderDetails.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className='flex gap-3 mb-6'>
            <button className='flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl font-medium text-sm hover:bg-gray-700 transition-colors'>
              <Share2 size={18} />
              Share
            </button>
            <button className='flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors'>
              <Download size={18} />
              Receipt
            </button>
          </div>

          <button 
            onClick={handleGoHome}
            className='w-full flex items-center justify-center gap-2 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-orange-500/20 hover:from-orange-600 hover:to-orange-700 transition-all mb-8'
          >
            <Home size={20} />
            Back to Home
          </button>

          <div>
            <div className='flex items-center gap-2 mb-3'>
              <ShoppingBag size={16} className='text-orange-500' />
              <h2 className='text-sm font-bold text-gray-700 uppercase'>You Might Also Like</h2>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              {recommendations.map((item) => (
                <div 
                  key={item.id} 
                  className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer'
                >
                  <div className='h-20 bg-gray-100'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>
                  <div className='p-2.5'>
                    <p className='text-[10px] text-gray-400 uppercase'>{item.category}</p>
                    <p className='text-sm font-medium text-gray-800 truncate'>{item.name}</p>
                    <p className='text-sm font-bold text-orange-500 mt-1'>₱{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ConfirmationTab