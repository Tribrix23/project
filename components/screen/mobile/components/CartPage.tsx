'use client'
import Image from 'next/image'
import React from 'react'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'

const cartItems = [
  { id: 1, name: 'Professional Hammer', category: 'Tools', price: 5500, quantity: 1, image: '/images/hammer.png' },
  { id: 2, name: 'Cordless Drill Set', category: 'Power Tools', price: 3200, quantity: 2, image: '/images/drill.png' },
  { id: 3, name: 'Safety Helmet', category: 'Safety', price: 450, quantity: 3, image: '/images/hat.png' },
]

const CartPage = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 150
  const total = subtotal + shipping

  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
      <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm'>
        <h1 className='text-xl font-bold text-gray-800'>My Cart</h1>
        <span className='text-sm text-gray-500'>{cartItems.length} items</span>
      </header>

      <main className='flex-1 overflow-scroll p-4 pb-32'>
        <div className='space-y-3'>
          {cartItems.map((item) => (
            <div key={item.id} className='bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3'>
              <div className='w-20 h-20 bg-gray-100 rounded-xl shrink-0 overflow-hidden'>
                <Image src={item.image} width={80} height={80} alt={item.name} className='w-full h-full object-cover' />
              </div>
              <div className='flex-1 flex flex-col justify-between'>
                <div>
                  <p className='text-xs text-gray-500'>{item.category}</p>
                  <p className='text-sm font-semibold text-gray-800'>{item.name}</p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='text-base font-bold text-orange-500'>₱{item.price.toLocaleString()}</p>
                  <div className='flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1'>
                    <button className='w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600'>
                      <Minus size={12} />
                    </button>
                    <span className='text-sm font-medium w-6 text-center'>{item.quantity}</span>
                    <button className='w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full shadow-sm text-white'>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
              <button className='self-start p-2 text-gray-400 hover:text-red-500'>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>

      <div className='absolute bottom-20 left-0 right-0 bg-white rounded-t-3xl shadow-lg border border-gray-100 p-4 pb-8'>
        <div className='space-y-2 mb-4'>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-500'>Subtotal</span>
            <span className='text-gray-800 font-medium'>₱{subtotal.toLocaleString()}</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-500'>Shipping</span>
            <span className='text-gray-800 font-medium'>₱{shipping.toLocaleString()}</span>
          </div>
          <div className='flex justify-between text-base font-bold pt-2 border-t border-gray-100'>
            <span>Total</span>
            <span className='text-orange-500'>₱{total.toLocaleString()}</span>
          </div>
        </div>
        <button className='w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors'>
          <ShoppingBag size={20} />
          Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage