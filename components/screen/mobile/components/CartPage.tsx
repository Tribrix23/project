'use client'
import CartCard from '@/components/ui/CartCard'
import { ShoppingBag, LogIn } from 'lucide-react'
import React, { useState } from 'react'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  
  const isLoggedIn = false

  const handleIncrease = (id: number) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const handleDecrease = (id: number) => {
    setCartItems(items => items.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ))
  }

  const handleRemove = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

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
        {!isLoggedIn ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <LogIn size={40} className='text-gray-300' />
            </div>
            <p className='text-gray-500 font-medium text-base'>Login to view your cart</p>
            <p className='text-gray-400 text-sm mt-1'>Please login first to add items</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
              <ShoppingBag size={40} className='text-gray-300' />
            </div>
            <p className='text-gray-500 font-medium text-base'>Your cart is empty</p>
            <p className='text-gray-400 text-sm mt-1'>Add some items to get started</p>
          </div>
        ) : (
          <div className='space-y-3'>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className='absolute bottom-10 left-0 right-0 bg-white rounded-t-3xl shadow-lg border border-gray-100 p-4 pb-19'>
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
      )}
    </div>
  )
}

export default CartPage