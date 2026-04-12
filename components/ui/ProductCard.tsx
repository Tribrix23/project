'use client'
import { HeartIcon } from 'lucide-react'
import React from 'react'

const ProductCard = () => {
  return (
    <div className='bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer'>
      <div className='h-32 bg-gray-100 relative'>
        <button className='absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50'>
            <HeartIcon size={14} className='text-gray-400'/>
        </button>
      </div>
      <div className='p-3'>
        <p className='text-xs text-gray-500'>Category</p>
        <p className='text-sm font-semibold text-gray-800 mt-0.5'>Professional Tool</p>
        <p className='text-base font-bold text-orange-500 mt-2'>₱5,500</p>
      </div>
    </div>
  )
}

export default ProductCard