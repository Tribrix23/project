'use client'
import { HeartIcon, StarIcon } from 'lucide-react'
import React from 'react'

type ProductCardProps = {
  category?: string
  name?: string
  price?: string
  image?: string
  rating?: number
  reviewCount?: number
  sold?: number
  showRating?: boolean,
  onC?: () => void
}

const ProductCard = ({ 
  category = 'Category', 
  name = 'Product Name', 
  price = '₱0', 
  image,
  rating = 0,
  reviewCount = 0,
  sold = 0,
  showRating = false,
  onC
}: ProductCardProps) => {
  return (
    <div className='bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1' onClick={onC}>
      <div className='h-32 bg-gray-100 relative'>
        {image ? (
          <img src={image} alt={name} className='w-full h-full object-cover' />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gray-100'>
            <span className='text-gray-300 text-3xl'>📦</span>
          </div>
        )}
        <button className='absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-50 hover:scale-110 transition-all'>
            <HeartIcon size={14} className='text-gray-400 hover:text-red-500 transition-colors'/>
        </button>
      </div>
      <div className='p-3'>
        <p className='text-xs text-gray-500 truncate'>{category}</p>
        <p className='text-sm font-semibold text-gray-800 mt-0.5 line-clamp-2'>{name}</p>
        
        {showRating && rating > 0 && (
          <div className='flex items-center gap-1 mt-2'>
            <div className='flex items-center'>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon 
                  key={star}
                  size={12} 
                  className={star <= Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className='text-xs text-gray-500'>
              {rating.toFixed(1)}
              {reviewCount > 0 && ` (${reviewCount})`}
            </span>
          </div>
        )}
        
        <p className='text-base font-bold text-orange-500 mt-2'>{price}</p>
        
        {sold > 0 && (
          <p className='text-xs text-gray-400 mt-1'>{sold.toLocaleString()} sold</p>
        )}
      </div>
    </div>
  )
}

export default ProductCard