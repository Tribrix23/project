'use client'
import ProductCard from '@/components/ui/ProductCard'
import { SearchIcon, X, Clock, TrendingUp, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState, useRef, useEffect } from 'react'

type SearchTabProps = {
  goBack: () => void,
  showDetails: () => void,
}

const SearchTab = ({ goBack, showDetails }: SearchTabProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<{
    id: string
    productName: string
    category: string
    price: number
    image_url: string | null
    rating?: number
    reviewCount?: number
    sold?: number
    count?: number
  }>([])
  const [productsLoading, setProductsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setProductsLoading(true)
    try {
      const response = await fetch('/api/fetchProducts')
      const result = await response.json()
      if (response.ok) {
        setProducts(result.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch products:', err)
    } finally {
      setProductsLoading(false)
    }
  }

  const categories = ['All', 'Tools', 'Materials', 'Hardware', 'Safety', 'Electrical']
  const recentSearches = ['Power Drill', 'Cement', 'Hammer', 'Safety Helmet', 'Screwdriver']
  const popularSearches = ['Building Materials', 'Hand Tools', 'Power Tools', 'Fasteners']

  const Search = (query : string) => {
    router.push(`/search?q=${query}`)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      Search(searchQuery)
    }
  }


  return (
    <div className='w-full h-full flex flex-col bg-white'>
      <div className='w-full px-4 py-3 bg-white flex items-center gap-3'>
        <button onClick={goBack} className='p-2 hover:bg-gray-100 rounded-full'>
          <ArrowLeft size={20} className='text-gray-700'/>
        </button>
        <div className='flex-1 relative'>
          <input 
            ref={inputRef}
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKey}
            className='bg-gray-100 w-full h-11 rounded-full pl-11 pr-20 text-sm text-black outline-none focus:ring-2 focus:ring-orange-300'
          />
          <SearchIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' size={20}/>
          <button type="button" className='absolute right-3 top-1/2 -translate-y-1/2 font-semibold text-orange-500 text-sm' onClick={() => Search(searchQuery)}>Search</button>
        </div>
      </div>

      <div className='w-full px-4 overflow-x-auto pb-2'>
        <div className='flex gap-2 min-w-max'>
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                index === 0 
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
        <div className='mb-4'>
          <div className='flex items-center gap-2 mb-3'>
            <Clock size={16} className='text-gray-400'/>
            <h3 className='text-sm font-semibold text-gray-600'>Recent Searches</h3>
          </div>
          <div className='flex flex-wrap gap-2'>
            {recentSearches.map((term, index) => (
              <button 
                key={index}
                onClick={() => setSearchQuery(term)}
                className='px-3 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full border border-gray-200 hover:bg-gray-100'
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <div className='flex items-center gap-2 mb-3'>
            <TrendingUp size={16} className='text-orange-500'/>
            <h3 className='text-sm font-semibold text-gray-600'>Popular Searches</h3>
          </div>
          <div className='flex flex-wrap gap-2'>
            {popularSearches.map((term, index) => (
              <button 
                key={index}
                onClick={() => setSearchQuery(term)}
                className='px-3 py-1.5 bg-orange-50 text-orange-600 text-sm rounded-full border border-orange-200 hover:bg-orange-100'
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className='mb-3'>
          <h3 className='text-base font-bold text-gray-800 mb-3'>Popular Products</h3>
          <div className='grid grid-cols-2 gap-3'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                category={product.category}
                name={product.productName}
                price={`₱${Number(product.price).toLocaleString()}`}
                image={product.image_url || undefined}
                rating={product.rating}
                reviewCount={product.reviewCount}
                sold={product.sold}
                count={product.count}
                onC={showDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchTab