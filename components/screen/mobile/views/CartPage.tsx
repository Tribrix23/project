'use client'
import CartCard from '@/components/ui/CartCard'
import { ShoppingBag, LogIn } from 'lucide-react'
import React, { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

type UserData = {
  name: string
  email: string
  memberSince: string
  level: string
}

type CartPageProps = {
  isLoggedIn: boolean
  user: UserData
}

const CartPage = ({ isLoggedIn }: CartPageProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

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

  const handleRemove = async (id: number) => {
    try {
      const res = await fetch('/api/deleteCart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: id }),
      })
      if (res.ok) {
        setCartItems(items => items.filter(item => item.id !== id))
        setSelectedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }
    } catch (err) {
      console.error('Failed to remove item:', err)
    }
  }

  const handleToggleSelect = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)))
    }
  }

  const fetchCartItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const res = await fetch('/api/cart')
      if (!res.ok) return

      const result = await res.json()
      setCartItems(result.data ?? [])
    } catch (err) {
      console.error('Failed to fetch cart items:', err)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems()
    }
  }, [isLoggedIn, fetchCartItems])

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
        ) : isLoading ? (
          <div className='space-y-3'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 animate-pulse'>
                <div className='w-20 h-20 bg-gray-200 rounded-xl shrink-0' />
                <div className='flex-1 flex flex-col justify-between'>
                  <div>
                    <div className='h-3 bg-gray-200 rounded w-16 mb-2' />
                    <div className='h-4 bg-gray-200 rounded w-32' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='h-5 bg-gray-200 rounded w-20' />
                    <div className='flex items-center gap-2'>
                      <div className='w-6 h-6 bg-gray-200 rounded-full' />
                      <div className='w-6 h-4 bg-gray-200 rounded' />
                      <div className='w-6 h-6 bg-gray-200 rounded-full' />
                    </div>
                  </div>
                </div>
                <div className='w-8 h-8 bg-gray-200 rounded-full self-start' />
              </div>
            ))}
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
            <div className='flex items-center justify-between px-2'>
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={selectedItems.size === cartItems.length && cartItems.length > 0}
                  onChange={handleSelectAll}
                  className='w-5 h-5 text-orange-500 rounded focus:ring-orange-500'
                />
                <span className='text-sm font-medium text-gray-700'>Select All</span>
              </label>
              <span className='text-sm text-gray-500'>
                {selectedItems.size > 0 && `${selectedItems.size} selected`}
              </span>
            </div>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                id={item.id}
                name={item.name}
                category={item.category}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                selected={selectedItems.has(item.id)}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
                onRemove={() => handleRemove(item.id)}
                onToggleSelect={() => handleToggleSelect(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className='absolute bottom-10 left-0 right-0 bg-white rounded-t-3xl shadow-lg border border-gray-100 p-4 pb-19'>
          <button className='w-full bg-orange-500 text-white py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors'>
            <ShoppingBag size={20} />
            Checkout {selectedItems.size > 0 && `(${selectedItems.size})`}
          </button>
        </div>
      )}
    </div>
  )
}

export default CartPage