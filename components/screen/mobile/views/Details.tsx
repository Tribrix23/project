'use client'
import IconBadge from '@/components/ui/IconBadge'
import { HeartIcon, StarIcon, ArrowLeft, ShoppingCart, MessageCircle, Store, Shield, Truck, RotateCcw, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useRouter, useSearchParams } from 'next/navigation'

type ProductDetails = {
  id: number
  productName: string
  category: string
  price: number | string
  image_url?: string
  rating?: number
  reviewCount?: number
  sold?: number
  storeName?: string
  storeRating?: number
  description?: string
  details?: string[]
  sellerStore?: {
    id?: number
    name?: string
  }
}

const mockProduct: ProductDetails = {
  id: 1,
  productName: 'Professional Tool - Heavy Duty Hammer Drill Set with Case',
  category: 'Tools',
  price: 5500,
  image_url: undefined,
  rating: 4.8,
  reviewCount: 124,
  sold: 2340,
  storeName: 'Hardware Pro Store',
  storeRating: 4.9,
  description: 'Professional-grade hammer drill with powerful motor and durable construction. Perfect for construction and home improvement projects.',
  details: [
    'Powerful 18V motor',
    '18+1 clutch settings',
    'LED work light',
    'Includes carrying case',
    '2-year warranty'
  ]
}

const mockReviews = [
  { id: 1, user: 'John D.', rating: 5, comment: 'Great quality! Works perfectly for my construction work.', date: '2 weeks ago' },
  { id: 2, user: 'Mike T.', rating: 5, comment: 'Best value for money. Highly recommended!', date: '1 month ago' },
  { id: 3, user: 'Sarah L.', rating: 4, comment: 'Good product, shipping was fast.', date: '1 month ago' },
]

type UserData = {
  name: string
  email: string
  memberSince: string
  level: string
}

type DetailsProps = {
  goBack?: () => void
  isLoggedIn?: boolean
  user?: UserData
  product?: ProductDetails
}

const Details = ({ goBack, isLoggedIn, user, product }: DetailsProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [productData, setProductData] = useState<ProductDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProductDetails = async () => {
      const itemId = searchParams.get('item')
      if (!itemId) {
        // If no item ID in URL, use the passed product prop or mock
        setProductData(product || mockProduct)
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      try {
        // Fetch product details from API
        const response = await fetch(`/api/fetchProductById?id=${itemId}`)
        const result = await response.json()
        if (response.ok) {
          setProductData(result.data || null)
        } else {
          setError(result.error || 'Failed to fetch product details')
          setProductData(product || mockProduct) // Fallback to passed product or mock
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err)
        setError('Failed to fetch product details')
        setProductData(product || mockProduct) // Fallback to passed product or mock
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [searchParams, product])

  const displayProduct = productData || mockProduct
  const storeName = displayProduct.sellerStore?.name || displayProduct.storeName || 'Store Name'

  const handleRequireLogin = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      return false
    }
    return true
  }

  return (
    <div className='h-full flex flex-col bg-white pb-5'>
      <div className='flex-1 overflow-scroll pb-28'>
        <div className='relative'>
          <div className='h-72 bg-gray-100'>
{displayProduct.image_url ? (
               <img src={displayProduct.image_url} alt={displayProduct.productName} className='w-full h-full object-cover' />
             ) : (
              <div className='w-full h-full flex items-center justify-center bg-gray-100'>
                <span className='text-6xl'>📦</span>
              </div>
            )}
          </div>
          <button 
            onClick={goBack}
            className='absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors'
          >
            <ArrowLeft size={20} className='text-gray-700'/>
          </button>
          <button 
            onClick={() => { if (handleRequireLogin()) setIsWishlisted(!isWishlisted) }}
            className={`absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all hover:scale-110 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
          >
            <HeartIcon size={20} className={isWishlisted ? 'fill-red-500' : ''}/>
          </button>
        </div>

        <div className='p-4'>
          <p className='text-xs text-gray-500 mb-1'>{displayProduct.category}</p>
          <h1 className='text-lg font-bold text-gray-800 leading-tight'>{displayProduct.productName}</h1>
          
          <div className='flex items-center gap-4 mt-3'>
            <div className='flex items-center gap-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon 
                  key={star}
                  size={16} 
                  className={star <= Math.round(displayProduct.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
              <span className='text-sm font-medium text-gray-700 ml-1'>{displayProduct.rating}</span>
              <span className='text-xs text-gray-400 ml-1'>({displayProduct.reviewCount} reviews)</span>
            </div>
          </div>
          
          <p className='text-xs text-gray-400 mt-1'>{displayProduct.sold?.toLocaleString()} sold</p>

          <div className='mt-4'>
            <p className='text-2xl font-bold text-orange-500'>₱{typeof displayProduct.price === 'number' ? displayProduct.price.toLocaleString() : displayProduct.price}</p>
          </div>

          <div className='mt-4 border-t border-gray-100 pt-4'>
            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
              <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center'>
                <Store size={24} className='text-orange-500'/>
              </div>
              <div className='flex-1'>
                <p className='text-sm font-semibold text-gray-800'>{storeName}</p>
                <div className='flex items-center gap-1'>
                  <StarIcon size={12} className='text-yellow-400 fill-yellow-400'/>
                  <span className='text-xs text-gray-500'>{displayProduct.storeRating} store rating</span>
                </div>
              </div>
              <button className='px-3 py-1.5 bg-orange-500 text-white text-xs font-medium rounded-full'>
                Visit
              </button>
            </div>
          </div>

          <div className='mt-4 border-t border-gray-100 pt-4'>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>Description</h2>
            <p className='text-sm text-gray-600 leading-relaxed'>{displayProduct.description}</p>
          </div>

          <div className='mt-4 border-t border-gray-100 pt-4'>
            <h2 className='text-base font-semibold text-gray-800 mb-2'>Product Details</h2>
            <ul className='space-y-2'>
              {displayProduct.details?.map((detail, index) => (
                <li key={index} className='text-sm text-gray-600 flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 bg-orange-500 rounded-full'/>
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-4 border-t border-gray-100 pt-4'>
            <h2 className='text-base font-semibold text-gray-800 mb-3'>Reviews</h2>
            <div className='space-y-3'>
              {mockReviews.map((review) => (
                <div key={review.id} className='p-3 bg-gray-50 rounded-xl'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium text-gray-800'>{review.user}</span>
                    <div className='flex items-center'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star}
                          size={12} 
                          className={star <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-sm text-gray-600'>{review.comment}</p>
                  <p className='text-xs text-gray-400 mt-1'>{review.date}</p>
                </div>
              ))}
            </div>
            <button className='w-full mt-3 py-2 text-sm text-orange-500 font-medium text-center'>
              View All Reviews
            </button>
          </div>

          <div className='mt-4 border-t border-gray-100 pt-4'>
            <h2 className='text-base font-semibold text-gray-800 mb-3'>Seller Guarantees</h2>
            <div className='grid grid-cols-2 gap-3'>
              <div className='flex items-center gap-2 p-2'>
                <Shield size={18} className='text-green-500'/>
                <span className='text-xs text-gray-600'>Genuine Product</span>
              </div>
              <div className='flex items-center gap-2 p-2'>
                <Truck size={18} className='text-blue-500'/>
                <span className='text-xs text-gray-600'>Fast Shipping</span>
              </div>
              <div className='flex items-center gap-2 p-2'>
                <RotateCcw size={18} className='text-purple-500'/>
                <span className='text-xs text-gray-600'>Easy Returns</span>
              </div>
              <div className='flex items-center gap-2 p-2'>
                <Store size={18} className='text-orange-500'/>
                <span className='text-xs text-gray-600'>Verified Seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-13 left-0 right-0 bg-white border-t border-gray-200 p-3 flex items-center gap-2'>
        
        <button 
          onClick={() => { if (handleRequireLogin()) { /* add to cart logic */ } }}
          className='flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors'
        >
          <ShoppingCart size={18}/>
          Add Cart
        </button>
        
        <button 
          onClick={() => { if (handleRequireLogin()) { /* buy now logic */ } }}
          className='flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors'
        >
          Buy Now
        </button>
      </div>

      {showLoginPrompt && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50' onClick={() => setShowLoginPrompt(false)}>
          <div className='bg-white rounded-2xl p-6 w-[80%] max-w-sm relative' onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowLoginPrompt(false)}
              className='absolute top-4 right-4 p-1'
            >
              <X size={20} className='text-gray-400'/>
            </button>
            <div className='text-center'>
              <div className='w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <HeartIcon size={32} className='text-orange-500'/>
              </div>
              <h3 className='text-lg font-bold text-gray-800 mb-2'>Login Required</h3>
              <p className='text-sm text-gray-500 mb-6'>
                To use this feature you must login first
              </p>
              <button 
                onClick={() => { router.push('/auth') }}
                className='w-full py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors'
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details