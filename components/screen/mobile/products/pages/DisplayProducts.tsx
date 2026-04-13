'use client'
import ProductCard from '@/components/ui/ProductCard'
import { ArrowLeft, SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Product = {
  id: number
  name: string
  category: string
  price: string
  image?: string
  rating?: number
  reviewCount?: number
  sold?: number,
}

type DisplayProductsProps = {
  setS?: () => void,
}

const mockProducts: Product[] = [
  { id: 1, name: 'Professional Tool', category: 'Tools', price: '₱5,500', rating: 4.8, reviewCount: 124, sold: 2340 },
  { id: 2, name: 'Power Drill', category: 'Tools', price: '₱3,200', rating: 4.5, reviewCount: 89, sold: 1560 },
  { id: 3, name: 'Cement (50kg)', category: 'Materials', price: '₱280', rating: 4.2, reviewCount: 312, sold: 8930 },
  { id: 4, name: 'Hammer', category: 'Tools', price: '₱450', rating: 4.7, reviewCount: 56, sold: 890 },
  { id: 5, name: 'Safety Helmet', category: 'Safety', price: '₱350', rating: 4.9, reviewCount: 203, sold: 4520 },
  { id: 6, name: 'Screwdriver Set', category: 'Tools', price: '₱800', rating: 4.3, reviewCount: 45, sold: 670 },
  { id: 7, name: 'Wire Cutter', category: 'Tools', price: '₱520', rating: 4.6, reviewCount: 78, sold: 1230 },
  { id: 8, name: 'Measuring Tape', category: 'Tools', price: '₱150', rating: 4.4, reviewCount: 167, sold: 3210 },
]

const DisplayProducts = ({ setS }: DisplayProductsProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const searchParams = useSearchParams();
  const search = searchParams.get('q')
  const router = useRouter()

  useEffect(() => {
    setSearchQuery(search ?? '')
  }, [])

  const handleSearch = () => {
    router.push(`?q=${searchQuery}`)
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      handleSearch()
    }
  }

  const categories = ['All', 'Tools', 'Materials', 'Safety', 'Hardware', 'Electrical']

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className='w-full h-full flex flex-col bg-white'>
      <div className='w-full px-4 py-3 bg-white flex items-center gap-3 sticky top-0 z-10'>
        <button onClick={() => router.push('/')} className='p-2 hover:bg-gray-100 rounded-full'>
          <ArrowLeft size={20} className='text-gray-700'/>
        </button>
        <div className='flex-1 relative'>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onEnter}
            placeholder='Search products...' 
            className='bg-gray-100 w-full h-11 rounded-full pl-11 pr-20 text-sm text-black outline-none focus:ring-2 focus:ring-orange-300'
          />
          <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20}/>
          <button type="button" className='absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-orange-500 text-sm' onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className='w-full px-4 overflow-x-auto pb-2'>
        <div className='flex gap-2 min-w-max'>
          {categories.map((cat, index) => (
            <button 
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className='flex-1 overflow-scroll pb-20 px-4'>
        <div className='grid grid-cols-2 gap-3'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard 
                key={product.id}
                category={product.category}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                sold={product.sold}
                showRating
                onC={setS}
              />
            ))
          ) : (
            <div className='col-span-2 flex flex-col items-center justify-center py-12'>
              <p className='text-gray-500 text-sm'>No products found</p>
              <p className='text-gray-400 text-xs mt-1'>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayProducts