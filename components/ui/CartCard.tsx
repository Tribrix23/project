'use client'
import React from 'react'
import Image from 'next/image'
import { Trash2, Minus, Plus } from 'lucide-react'

export type CartItem = {
  name: string
  category: string
  price: number
  quantity: number
  image: string
}

export type CartCardProps = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
  onIncrease?: () => void
  onDecrease?: () => void
  onRemove?: () => void
}

const CartCard: React.FC<CartCardProps> = ({
  id,
  name,
  category,
  price,
  quantity,
  image,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className='bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3'>
      <div className='w-20 h-20 bg-gray-100 rounded-xl shrink-0 overflow-hidden'>
        <Image src={image} width={80} height={80} alt={name} className='w-full h-full object-cover' />
      </div>
      <div className='flex-1 flex flex-col justify-between'>
        <div>
          <p className='text-xs text-gray-500'>{category}</p>
          <p className='text-sm font-semibold text-gray-800'>{name}</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-base font-bold text-orange-500'>₱{price.toLocaleString()}</p>
          <div className='flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1'>
            <button 
              onClick={onDecrease}
              className='w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:bg-gray-50'
            >
              <Minus size={12} />
            </button>
            <span className='text-sm font-medium w-6 text-center'>{quantity}</span>
            <button 
              onClick={onIncrease}
              className='w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full shadow-sm text-white hover:bg-orange-600'
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
      <button 
        onClick={onRemove}
        className='self-start p-2 text-gray-400 hover:text-red-500 transition-colors'
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}

export default CartCard