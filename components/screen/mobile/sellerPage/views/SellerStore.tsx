'use client'
import React from 'react'
import Image from 'next/image'
import {
  MapPin, Phone, Mail, Star, Package, ShoppingBag,
  Bell, Settings, Edit, Share2, TrendingUp, TrendingDown,
  DollarSign, Users, Eye, Heart, MessageCircle, ArrowUpRight,
  ArrowDownRight, Calendar, Clock, ChevronRight, Filter,
  Plus, Minus, CheckCircle, XCircle, Percent,
  Menu, MoreVertical, GripVertical, AlertCircle,
  MoreHorizontal, Store
} from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'

type SellerStoreProps = {
  onNavigate?: (page: string) => void
  storeData: any | null
  loading: boolean
  error: string | null
}

type StoreData = {
  sellerStore: {
    id: string
    owner_id: string
    name: string
    description: string
    business_type: string
    province: string
    city: string
    barangay: string
    street: string
    zipcode: string
    status: string
    created_at?: string
    updated_at?: string
  } | null
  profile: {
    first_name: string
    middle_name: string | null
    last_name: string
    email: string
    phone: string | null
  } | null
}

const SkeletonHeader = () => (
  <div className='w-full shrink-0 bg-linear-to-br from-orange-600 via-orange-500 to-orange-600 z-20 relative'>
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
      <div className='absolute -bottom-5 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl'></div>
    </div>
    <header className='w-full h-auto py-3 px-4 flex flex-row justify-between items-center relative z-10'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-white/20 rounded-xl animate-pulse'></div>
        <div className='flex flex-col gap-1'>
          <div className='h-4 w-24 bg-white/30 rounded animate-pulse'></div>
          <div className='h-2 w-16 bg-white/20 rounded animate-pulse'></div>
        </div>
      </div>
      <div className='flex items-center gap-0.5'>
        <div className='w-9 h-9 bg-white/15 rounded-xl animate-pulse'></div>
        <div className='w-9 h-9 bg-white/15 rounded-xl animate-pulse'></div>
      </div>
    </header>
  </div>
)

const SkeletonStoreHero = () => (
  <div className='w-full bg-linear-to-br from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden shrink-0'>
    <div className='absolute inset-0 overflow-hidden'>
      <div className='absolute top-10 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-10 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl'></div>
    </div>
    <div className='w-full py-6 px-4 flex items-start gap-4 relative z-10'>
      <div className='w-20 h-20 bg-white/20 rounded-full animate-pulse'></div>
      <div className='flex-1 min-w-0'>
        <div className='h-5 bg-white/30 rounded animate-pulse mb-2 w-48'></div>
        <div className='h-3 bg-white/20 rounded animate-pulse mb-3 w-32'></div>
        <div className='flex items-center gap-2'>
          <div className='h-6 w-16 bg-white/20 rounded-lg animate-pulse'></div>
          <div className='h-6 w-14 bg-white/20 rounded-lg animate-pulse'></div>
          <div className='h-6 w-12 bg-white/20 rounded-lg animate-pulse'></div>
          <div className='h-6 w-14 bg-white/20 rounded-lg animate-pulse'></div>
        </div>
      </div>
    </div>
  </div>
)

const SkeletonButtons = () => (
  <div className='w-full px-4 py-3 shrink-0 bg-white border-b border-gray-100'>
    <div className='flex gap-3 justify-center'>
      <div className='flex-1 h-11 bg-gray-200 rounded-xl animate-pulse'></div>
      <div className='flex-1 h-11 bg-gray-200 rounded-xl animate-pulse'></div>
    </div>
  </div>
)

const SkeletonAnalyticsCard = () => (
  <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
    <div className='flex items-center justify-between mb-3'>
      <div className='w-10 h-10 bg-gray-200 rounded-xl animate-pulse'></div>
      <div className='h-3 w-12 bg-gray-200 rounded animate-pulse'></div>
    </div>
    <div className='h-4 bg-gray-200 rounded animate-pulse mb-2 w-16'></div>
    <div className='h-6 bg-gray-200 rounded animate-pulse mb-3 w-24'></div>
    <div className='flex items-center gap-1'>
      <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse'></div>
      <div className='h-3 w-12 bg-gray-200 rounded animate-pulse'></div>
    </div>
  </div>
)

const SkeletonQuickAction = () => (
  <div className='flex flex-col items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100'>
    <div className='w-11 h-11 bg-gray-200 rounded-xl animate-pulse'></div>
    <div className='h-3 w-12 bg-gray-200 rounded animate-pulse'></div>
  </div>
)

const SkeletonProductCard = () => (
  <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
    <div className='relative h-32 bg-gray-200 animate-pulse'></div>
    <div className='p-3'>
      <div className='h-4 w-16 bg-gray-200 rounded-full animate-pulse mb-2'></div>
      <div className='h-4 bg-gray-200 rounded animate-pulse mb-1 w-32'></div>
      <div className='h-5 bg-gray-200 rounded animate-pulse mb-2 w-16'></div>
      <div className='flex items-center gap-1'>
        <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse'></div>
        <div className='h-3 w-8 bg-gray-200 rounded animate-pulse'></div>
      </div>
    </div>
  </div>
)

const SkeletonActivityItem = () => (
  <div className='flex items-start gap-3 py-2'>
    <div className='w-9 h-9 bg-gray-200 rounded-full animate-pulse'></div>
    <div className='flex-1'>
      <div className='h-4 bg-gray-200 rounded animate-pulse mb-1 w-32'></div>
      <div className='h-3 bg-gray-200 rounded animate-pulse w-24'></div>
    </div>
    <div className='h-3 w-12 bg-gray-200 rounded animate-pulse'></div>
  </div>
)

const SkeletonStoreInfoItem = () => (
  <div className='flex items-center gap-4 p-4'>
    <div className='w-11 h-11 bg-gray-200 rounded-xl animate-pulse'></div>
    <div className='flex-1'>
      <div className='h-3 bg-gray-200 rounded animate-pulse mb-1 w-24'></div>
      <div className='h-4 bg-gray-200 rounded animate-pulse w-40'></div>
    </div>
    <div className='w-5 h-5 bg-gray-200 rounded animate-pulse'></div>
  </div>
)

const SellerStore = ({ onNavigate, storeData, loading, error }: SellerStoreProps) => {
  const getFormattedName = (profile: StoreData['profile']): string => {
    if (!profile) return 'Store Owner'
    const { first_name, middle_name, last_name } = profile
    const hasFirstName = first_name && first_name.trim()
    const hasLastName = last_name && last_name.trim()
    if (!hasFirstName && !hasLastName) return 'Store Owner'

    const firstLetter = middle_name && middle_name.trim() ? middle_name.charAt(0).toUpperCase() : ''
    const middleInitial = firstLetter ? `${firstLetter}.` : ''
    const name = `${first_name || ''} ${middleInitial} ${last_name || ''}`.trim()
    return name || 'Store Owner'
  }

  if (loading) {
    return (
      <div className='w-full h-full flex flex-col relative overflow-hidden bg-gray-50'>
        <SkeletonHeader />
        <SkeletonStoreHero />
        <SkeletonButtons />
        <div className='flex-1 overflow-scroll pb-20'>
          <div className='w-full px-4 pt-4'>
            <div className='flex items-center justify-between mb-3'>
              <div className='h-5 bg-gray-200 rounded animate-pulse w-40'></div>
              <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <SkeletonAnalyticsCard />
              <SkeletonAnalyticsCard />
              <SkeletonAnalyticsCard />
              <SkeletonAnalyticsCard />
            </div>
          </div>

          <div className='w-full px-4 mt-4'>
            <div className='h-5 bg-gray-200 rounded animate-pulse mb-3 w-32'></div>
            <div className='grid grid-cols-4 gap-2'>
              <SkeletonQuickAction />
              <SkeletonQuickAction />
              <SkeletonQuickAction />
              <SkeletonQuickAction />
            </div>
            </div>

           <div className='w-full px-4 mt-4'>
             <div className='flex items-center justify-between mb-3'>
               <div className='flex items-center gap-2'>
                 <div className='h-5 bg-gray-200 rounded animate-pulse w-32'></div>
                 <div className='h-4 w-4 bg-gray-200 rounded-full animate-pulse'></div>
               </div>
               <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>
             </div>
             <div className='grid grid-cols-2 gap-3'>
               <SkeletonProductCard />
               <SkeletonProductCard />
               <SkeletonProductCard />
               <SkeletonProductCard />
             </div>
           </div>
 
           <div className='w-full px-4 mt-4'>
             <div className='flex items-center justify-between mb-3'>
               <div className='flex items-center gap-2'>
                 <div className='h-5 bg-gray-200 rounded animate-pulse w-40'></div>
                 <div className='w-2 h-2 bg-gray-200 rounded-full animate-pulse'></div>
               </div>
               <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>
             </div>
             <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
               <SkeletonActivityItem />
               <SkeletonActivityItem />
               <SkeletonActivityItem />
               <SkeletonActivityItem />
             </div>
           </div>

           <div className='w-full px-4 mt-4 mb-4'>
             <div className='flex items-center justify-between mb-3'>
               <div className='h-5 bg-gray-200 rounded animate-pulse w-24'></div>
               <div className='h-4 w-12 bg-gray-200 rounded animate-pulse'></div>
             </div>
             <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
               <SkeletonStoreInfoItem />
               <SkeletonStoreInfoItem />
               <SkeletonStoreInfoItem />
             </div>
           </div>
           </div>
      </div>
    )
  }

  if (error || !storeData?.sellerStore) {
    return (
      <div className='w-full h-full flex flex-col relative overflow-hidden bg-gray-50'>
        <SkeletonHeader />
        <div className='flex-1 flex items-center justify-center'>
          <div className='text-center p-6'>
            <div className='w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3'>
              <AlertCircle className='w-8 h-8 text-red-500' />
            </div>
            <p className='text-gray-600 font-medium'>{error || 'Store not found'}</p>
          </div>
        </div>
      </div>
    )
  }

  const { sellerStore, profile } = storeData
  const storeName = sellerStore.name || 'My Store'
  const isVerified = sellerStore.status === 'APPROVED'
  const storeRating = 4.8
  const totalSales = 156
  const storeViews = 2856
  const favorites = 489

  const fullAddress = sellerStore
    ? [sellerStore.street, sellerStore.barangay, sellerStore.city, sellerStore.province, sellerStore.zipcode].filter(Boolean).join(', ')
    : 'No address provided'

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden bg-gray-50'>
      <div className='w-full shrink-0 bg-linear-to-br from-orange-600 via-orange-500 to-orange-600 z-20 relative'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
          <div className='absolute -bottom-5 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl'></div>
        </div>
        <header className='w-full h-auto py-3 px-4 flex flex-row justify-between items-center relative z-10'>
          <div className='flex items-center gap-3'>
            <div className='relative'>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold text-white tracking-wide'>Construco</h1>
              <div className='flex items-center gap-1'>
                <span className='text-[10px] text-orange-100 uppercase tracking-widest'>My Store</span>
                <span className='text-orange-200 text-xs'>•</span>
                {isVerified ? (
                  <span className='relative px-2 py-0.5 bg-green-500 rounded-full overflow-hidden'>
                    <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-badge-shimmer'></div>
                    <span className='text-[10px] font-bold text-white uppercase relative z-10 flex items-center gap-1'>
                      <CheckCircle size={10} className='text-white' />
                      Verified
                    </span>
                  </span>
                ) : (
                  <span className='text-[10px] text-orange-100'>{sellerStore.status}</span>
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center gap-0.5'>
            <button className='p-2.5 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all'>
              <Bell size={18} className='text-white' />
            </button>
            <button className='p-2.5 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all'>
              <MoreVertical size={18} className='text-white' />
            </button>
          </div>
        </header>
      </div>

      <div className='w-full bg-linear-to-br from-orange-600 via-orange-500 to-orange-600 relative overflow-hidden shrink-0'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-10 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-10 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl'></div>
        </div>

        <div className='w-full py-6 px-4 flex items-start gap-4 relative z-10'>
          <div className='relative shrink-0 group'>
            <div className='w-20 h-20 rounded-full bg-white/20 backdrop-blur-md p-1 shadow-2xl flex items-center justify-center'>
              <Store size={36} className='text-white' />
            </div>
            {isVerified && (
              <div className='absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg'>
                <CheckCircle size={10} className='text-white' />
              </div>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <h2 className='text-xl font-bold text-white truncate'>{storeName}</h2>
            </div>
            <div className='flex items-center gap-1 text-orange-100 text-xs mb-3'>
              <MapPin size={12} />
              <span className='truncate'>{fullAddress || 'No address set'}</span>
            </div>

            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10'>
                <Star className='text-yellow-300 fill-yellow-300' size={12} />
                <span className='text-white font-bold text-xs'>{storeRating}</span>
                <span className='text-orange-200 text-[10px]'>(256)</span>
              </div>
              <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10'>
                <Package className='text-white' size={12} />
                <span className='text-white font-bold text-xs'>{totalSales}</span>
              </div>
              <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10'>
                <ShoppingBag className='text-white' size={12} />
                <span className='text-white font-bold text-xs'>89</span>
              </div>
            </div>
          </div>
        </div>
      </div>

       <div className='w-full px-4 py-3 shrink-0 bg-white border-b border-gray-100'>
         <div className='flex gap-3 justify-center'>
           <button className='flex-1 flex items-center justify-center gap-2 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95'>
             <Plus size={16} />
             Add Product
           </button>
           <button className='flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all active:scale-95'>
             <Share2 size={16} />
             Share Store
           </button>
         </div>
       </div>

       <div className='w-full px-4 mt-4'>
         <div className='flex items-center justify-between mb-3'>
           <div className='flex items-center gap-2'>
             <h2 className='text-lg font-bold text-gray-800'>My Products</h2>
           </div>
         </div>
         <div className='flex flex-col items-center justify-center py-12 px-4 text-center'>
           <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
             <Package className='text-gray-400' size={28} />
           </div>
           <p className='text-gray-500 text-sm mb-1'>No products yet</p>
           <p className='text-gray-400 text-xs'>Add your first product to get started</p>
         </div>
       </div>
    </div>
  )
}

export default SellerStore
