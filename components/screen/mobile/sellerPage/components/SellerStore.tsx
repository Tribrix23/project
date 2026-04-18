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
  MoreHorizontal
} from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'

type SellerStoreProps = {
  onNavigate?: (page: string) => void
}

const SellerStore = ({ onNavigate }: SellerStoreProps) => {
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
              <Image 
                src='/favicon.png' 
                alt='Construco Logo' 
                width={40} 
                height={40}
                className='w-10 h-10 rounded-xl object-contain bg-white shadow-lg'
              />
              <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white'></div>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold text-white tracking-wide'>Construco</h1>
              <div className='flex items-center gap-1'>
                <span className='text-[10px] text-orange-100 uppercase tracking-widest'>My Store</span>
                <span className='text-orange-200 text-xs'>•</span>
                <span className='text-[10px] text-orange-100'>Verified</span>
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
            <div className='w-20 h-20 rounded-full bg-white p-1 shadow-2xl'>
              <div className='w-full h-full rounded-full overflow-hidden'>
                <Image 
                  src='/images/hat.png' 
                  alt='Store Logo' 
                  width={80} 
                  height={80}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
            <div className='absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg'>
              <CheckCircle size={10} className='text-white' />
            </div>
          </div>
          
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2 mb-1'>
              <h2 className='text-xl font-bold text-white'>BuildMart Store</h2>
              <div className='relative px-2.5 py-1 bg-green-500 rounded-full overflow-hidden shadow-lg'>
                <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-badge-shimmer'></div>
                <span className='text-[10px] font-bold text-white uppercase relative z-10 flex items-center gap-1'>
                  <CheckCircle size={10} className='text-white' />
                  Verified
                </span>
              </div>
            </div>
            <div className='flex items-center gap-1 text-orange-100 text-xs mb-3'>
              <MapPin size={12} />
              <span className='truncate'>123 Construction Ave, Building City</span>
            </div>
            
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10'>
                <Star className='text-yellow-300 fill-yellow-300' size={12} />
                <span className='text-white font-bold text-xs'>4.8</span>
                <span className='text-orange-200 text-[10px]'>(256)</span>
              </div>
              <div className='flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10'>
                <Package className='text-white' size={12} />
                <span className='text-white font-bold text-xs'>156</span>
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
            <Edit size={16} />
            Edit Store
          </button>
          <button className='flex-1 flex items-center justify-center gap-2 py-3 bg-gray-800 text-white rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all active:scale-95'>
            <Share2 size={16} />
            Share Store
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-scroll pb-20'>
        <div className='w-full px-4 pt-4'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-lg font-bold text-gray-800'>Analytics Overview</h2>
            <button className='text-orange-500 text-sm font-medium flex items-center gap-1'>
              This Week <ChevronRight size={16} />
            </button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full'></div>
              <div className='w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3'>
                <DollarSign size={20} className='text-emerald-600' />
              </div>
              <p className='text-xs text-gray-500 mb-1'>Total Sales</p>
              <p className='text-xl font-bold text-gray-800 mb-1'>₱12,450</p>
              <div className='flex items-center gap-1'>
                <TrendingUp size={14} className='text-emerald-500' />
                <span className='text-xs text-emerald-600 font-medium'>+12.5%</span>
              </div>
            </div>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full'></div>
              <div className='w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3'>
                <Eye size={20} className='text-blue-600' />
              </div>
              <p className='text-xs text-gray-500 mb-1'>Store Views</p>
              <p className='text-xl font-bold text-gray-800 mb-1'>2,856</p>
              <div className='flex items-center gap-1'>
                <TrendingUp size={14} className='text-blue-500' />
                <span className='text-xs text-blue-600 font-medium'>+8.2%</span>
              </div>
            </div>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full'></div>
              <div className='w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3'>
                <Heart size={20} className='text-purple-600' />
              </div>
              <p className='text-xs text-gray-500 mb-1'>Favorites</p>
              <p className='text-xl font-bold text-gray-800 mb-1'>489</p>
              <div className='flex items-center gap-1'>
                <TrendingUp size={14} className='text-purple-500' />
                <span className='text-xs text-purple-600 font-medium'>+15.3%</span>
              </div>
            </div>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full'></div>
              <div className='w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3'>
                <MessageCircle size={20} className='text-amber-600' />
              </div>
              <p className='text-xs text-gray-500 mb-1'>Inquiries</p>
              <p className='text-xl font-bold text-gray-800 mb-1'>32</p>
              <div className='flex items-center gap-1'>
                <TrendingDown size={14} className='text-amber-500' />
                <span className='text-xs text-amber-600 font-medium'>-3.1%</span>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full px-4 mt-4'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-lg font-bold text-gray-800'>Quick Actions</h2>
          </div>
          <div className='grid grid-cols-4 gap-2'>
            <button className='flex flex-col items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all active:scale-95 group'>
              <div className='w-11 h-11 bg-linear-to-br from-orange-50 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Plus className='text-orange-600' size={22} />
              </div>
              <span className='text-xs text-gray-600 font-medium'>Add</span>
            </button>
            <button className='flex flex-col items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all active:scale-95 group'>
              <div className='w-11 h-11 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Package className='text-blue-600' size={22} />
              </div>
              <span className='text-xs text-gray-600 font-medium'>Orders</span>
            </button>
            <button className='flex flex-col items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all active:scale-95 group'>
              <div className='w-11 h-11 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Calendar className='text-purple-600' size={22} />
              </div>
              <span className='text-xs text-gray-600 font-medium'>Schedule</span>
            </button>
            <button className='flex flex-col items-center gap-2 p-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all active:scale-95 group'>
              <div className='w-11 h-11 bg-linear-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                <Percent className='text-green-600' size={22} />
              </div>
              <span className='text-xs text-gray-600 font-medium'>Promo</span>
            </button>
          </div>
        </div>

        <div className='w-full px-4 mt-4'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-bold text-gray-800'>My Products</h2>
              <span className='px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full'>4</span>
            </div>
            <button className='text-orange-500 text-sm font-medium flex items-center gap-1'>
              See All <ChevronRight size={16} />
            </button>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group'>
              <div className='relative h-32 bg-gray-100'>
                <Image src='/images/hammer.png' alt='Product' fill className='object-cover group-hover:scale-105 transition-transform' />
                <button className='absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                  <MoreHorizontal size={14} className='text-gray-600' />
                </button>
              </div>
              <div className='p-3'>
                <span className='text-[10px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full'>Tools</span>
                <h3 className='text-sm font-semibold text-gray-800 mt-1.5 line-clamp-1'>Professional Hammer Set</h3>
                <p className='text-lg font-bold text-orange-600 mt-1'>₱450</p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <span className='text-xs font-medium text-gray-700'>4.5</span>
                  <span className='text-xs text-gray-400'>(120)</span>
                </div>
              </div>
            </div>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group'>
              <div className='relative h-32 bg-gray-100'>
                <Image src='/images/cement.png' alt='Product' fill className='object-cover group-hover:scale-105 transition-transform' />
                <button className='absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                  <MoreHorizontal size={14} className='text-gray-600' />
                </button>
              </div>
              <div className='p-3'>
                <span className='text-[10px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full'>Materials</span>
                <h3 className='text-sm font-semibold text-gray-800 mt-1.5 line-clamp-1'>Premium Cement 50kg</h3>
                <p className='text-lg font-bold text-orange-600 mt-1'>₱320</p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <span className='text-xs font-medium text-gray-700'>4.8</span>
                  <span className='text-xs text-gray-400'>(256)</span>
                </div>
              </div>
            </div>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group'>
              <div className='relative h-32 bg-gray-100'>
                <Image src='/images/screw.png' alt='Product' fill className='object-cover group-hover:scale-105 transition-transform' />
                <button className='absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                  <MoreHorizontal size={14} className='text-gray-600' />
                </button>
              </div>
              <div className='p-3'>
                <span className='text-[10px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full'>Hardware</span>
                <h3 className='text-sm font-semibold text-gray-800 mt-1.5 line-clamp-1'>Steel Bolts Kit</h3>
                <p className='text-lg font-bold text-orange-600 mt-1'>₱180</p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <span className='text-xs font-medium text-gray-700'>4.2</span>
                  <span className='text-xs text-gray-400'>(45)</span>
                </div>
              </div>
            </div>
            <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group'>
              <div className='relative h-32 bg-gray-100'>
                <Image src='/images/hat.png' alt='Product' fill className='object-cover group-hover:scale-105 transition-transform' />
                <button className='absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                  <MoreHorizontal size={14} className='text-gray-600' />
                </button>
              </div>
              <div className='p-3'>
                <span className='text-[10px] font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full'>Safety</span>
                <h3 className='text-sm font-semibold text-gray-800 mt-1.5 line-clamp-1'>Safety Helmet</h3>
                <p className='text-lg font-bold text-orange-600 mt-1'>₱280</p>
                <div className='flex items-center gap-1 mt-1'>
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <span className='text-xs font-medium text-gray-700'>4.6</span>
                  <span className='text-xs text-gray-400'>(89)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full px-4 mt-4 mb-4'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-bold text-gray-800'>Recent Activity</h2>
              <span className='w-2 h-2 bg-orange-500 rounded-full'></span>
            </div>
            <button className='text-orange-500 text-sm font-medium flex items-center gap-1'>
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 divide-y divide-gray-50'>
            <div className='flex items-start gap-3 py-2'>
              <div className='w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0'>
                <ShoppingBag className='text-green-600' size={16} />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-800'>New order received</p>
                <p className='text-xs text-gray-500'>Professional Hammer Set x2</p>
              </div>
              <span className='text-xs text-gray-400'>2m ago</span>
            </div>
            <div className='flex items-start gap-3 py-2'>
              <div className='w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0'>
                <Star className='text-blue-600' size={16} />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-800'>New review received</p>
                <div className='flex items-center gap-1 mt-0.5'>
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                  <Star className='text-yellow-400 fill-yellow-400' size={12} />
                </div>
              </div>
              <span className='text-xs text-gray-400'>15m ago</span>
            </div>
            <div className='flex items-start gap-3 py-2'>
              <div className='w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center shrink-0'>
                <MessageCircle className='text-purple-600' size={16} />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-800'>Customer inquiry</p>
                <p className='text-xs text-gray-500 italic'>"Do you have bulk pricing?"</p>
              </div>
              <span className='text-xs text-gray-400'>1h ago</span>
            </div>
            <div className='flex items-start gap-3 py-2'>
              <div className='w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center shrink-0'>
                <Package className='text-orange-600' size={16} />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-800'>Order shipped</p>
                <p className='text-xs text-gray-500'>Premium Cement 50kg x5</p>
              </div>
              <span className='text-xs text-gray-400'>3h ago</span>
            </div>
          </div>
        </div>

        <div className='w-full px-4 mt-4 mb-20'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-lg font-bold text-gray-800'>Store Info</h2>
            <button className='text-orange-500 text-sm font-medium flex items-center gap-1'>
              <Edit size={14} /> Edit
            </button>
          </div>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <div className='flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50'>
              <div className='w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center shrink-0'>
                <MapPin className='text-orange-600' size={20} />
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-400 font-medium'>Store Address</p>
                <p className='text-sm text-gray-800 font-medium'>123 Construction Ave, Building City</p>
              </div>
              <ChevronRight size={18} className='text-gray-300' />
            </div>
            <div className='flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50'>
              <div className='w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center shrink-0'>
                <Phone className='text-blue-600' size={20} />
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-400 font-medium'>Phone Number</p>
                <p className='text-sm text-gray-800 font-medium'>+1 (555) 123-4567</p>
              </div>
              <ChevronRight size={18} className='text-gray-300' />
            </div>
            <div className='flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer'>
              <div className='w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center shrink-0'>
                <Mail className='text-purple-600' size={20} />
              </div>
              <div className='flex-1'>
                <p className='text-xs text-gray-400 font-medium'>Email</p>
                <p className='text-sm text-gray-800 font-medium'>contact@buildmart.com</p>
              </div>
              <ChevronRight size={18} className='text-gray-300' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerStore