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
  count: number
}

export type CartCardProps = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
  selected?: boolean
  onIncrease?: () => void
  onDecrease?: () => void
  onRemove?: () => void
  onToggleSelect?: () => void
  count: number
}

const CartCard: React.FC<CartCardProps> = ({
  id: _id,
  name,
  category,
  price,
  quantity,
  image,
  selected = false,
  onIncrease,
  onDecrease,
  onRemove,
  onToggleSelect,
  count,
}) => {
  const handleDecrease = () => {
    if (quantity <= 1) return;
    onDecrease?.();
  };

  const handleIncrease = () => {
    if (quantity >= count) return;
    onIncrease?.();
  };

  return (
    <div className={`bg-white rounded-2xl p-3 shadow-sm border flex gap-3 ${selected ? 'border-orange-500' : 'border-gray-100'}`}>
      <div className='flex items-center pl-1'>
        <input
          type='checkbox'
          checked={selected}
          onChange={onToggleSelect}
          className='w-5 h-5 text-orange-500 rounded focus:ring-orange-500'
          aria-label={`Select ${name}`}
        />
      </div>
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
              onClick={handleDecrease}
              className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:bg-gray-50 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Minus size={12} />
            </button>
            <span className='text-sm font-medium w-6 text-center'>{quantity}</span>
            <button 
              onClick={handleIncrease}
              className={`w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full shadow-sm text-white hover:bg-orange-600 ${quantity >= count ? 'opacity-50 cursor-not-allowed' : ''}`}
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
  );
}

export default CartCard