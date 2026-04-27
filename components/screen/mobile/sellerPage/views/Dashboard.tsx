'use client'

import React from 'react'
import Image from 'next/image'
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown,
  DollarSign, ShoppingBag, Package, Users, Eye, Heart,
  MessageCircle, Star, Wallet, Calendar, ChevronRight,
  MoreVertical, Bell, Download, Filter, Plus
} from 'lucide-react'

type DashboardProps = {
  goBack?: () => void
}

const Dashboard = ({ goBack }: DashboardProps) => {
  const stats = [
    { label: 'Total Revenue', value: '₱45,230', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'emerald' },
    { label: 'Total Orders', value: '156', change: '+12.5%', trend: 'up', icon: ShoppingBag, color: 'blue' },
    { label: 'Products Sold', value: '289', change: '+8.1%', trend: 'up', icon: Package, color: 'purple' },
    { label: 'Store Visits', value: '4,521', change: '-2.3%', trend: 'down', icon: Eye, color: 'orange' },
  ]

  const topProducts = [
    { name: 'Professional Hammer Set', sales: 45, revenue: '₱20,250', trend: 'up', image: '/images/hammer.png' },
    { name: 'Premium Cement 50kg', sales: 89, revenue: '₱28,480', trend: 'up', image: '/images/cement.png' },
    { name: 'Safety Helmet', sales: 32, revenue: '₱8,960', trend: 'down', image: '/images/hat.png' },
  ]

  const recentOrders = [
    { id: '#ORD-2847', customer: 'Juan Dela Cruz', items: 'Hammer Set x2', total: '₱900', status: 'Pending', time: '5m ago' },
    { id: '#ORD-2846', customer: 'Maria Santos', items: 'Cement x5', total: '₱1,600', status: 'Shipped', time: '12m ago' },
    { id: '#ORD-2845', customer: 'Pedro Garcia', items: 'Bolts Kit x3', total: '₱540', status: 'Delivered', time: '1h ago' },
  ]

  const getColorStyles = (color: string) => {
    const colors: Record<string, { bg: string, text: string, light: string }> = {
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', light: 'bg-emerald-50' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', light: 'bg-blue-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', light: 'bg-purple-50' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', light: 'bg-orange-50' },
    }
    return colors[color] || colors.emerald
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-yellow-100 text-yellow-700',
      Shipped: 'bg-blue-100 text-blue-700',
      Delivered: 'bg-green-100 text-green-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className='w-full h-full flex flex-col relative overflow-hidden bg-gray-50'>
      <div className='w-full shrink-0 bg-linear-to-br from-blue-600 via-blue-500 to-blue-600 z-20 relative'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl'></div>
          <div className='absolute -bottom-5 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl'></div>
        </div>
        <header className='w-full h-auto py-3 px-4 flex flex-row justify-between items-center relative z-10'>
          <div className='flex items-center gap-3'>
            <div className='flex flex-col'>
              <h1 className='text-xl font-bold text-white tracking-wide'>Metrics</h1>
              <div className='flex items-center gap-1'>
                <span className='text-[10px] text-blue-100 uppercase tracking-widest'>Performance Dashboard</span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-0.5'>
            <button className='p-2.5 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all'>
              <Bell size={18} className='text-white' />
            </button>
            <button className='p-2.5 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all'>
              <Download size={18} className='text-white' />
            </button>
            <button className='p-2.5 rounded-xl bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all'>
              <MoreVertical size={18} className='text-white' />
            </button>
          </div>
        </header>
      </div>

      <div className='w-full bg-linear-to-br from-blue-600 via-blue-500 to-blue-600 relative overflow-hidden shrink-0'>
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-10 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl'></div>
          <div className='absolute bottom-10 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl'></div>
        </div>
        
        <div className='w-full py-4 px-4 flex items-center justify-between relative z-10'>
          <div className='flex items-center gap-4'>
            <div className='w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center'>
              <Wallet size={28} className='text-white' />
            </div>
            <div>
              <p className='text-blue-100 text-xs'>Total Revenue</p>
              <p className='text-3xl font-bold text-white'>₱45,230</p>
              <div className='flex items-center gap-1 mt-1'>
                <TrendingUp size={14} className='text-green-300' />
                <span className='text-xs text-green-300 font-medium'>+18.2% from last month</span>
              </div>
            </div>
          </div>
          <button className='px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/30 transition-all'>
            <Filter size={16} className='inline mr-1' />
            Filter
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-scroll pb-20'>
        <div className='w-full px-4 pt-4'>
          <div className='grid grid-cols-2 gap-3'>
            {stats.map((stat, index) => {
              const colorStyles = getColorStyles(stat.color)
              return (
                <div key={index} className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden'>
                  <div className={`absolute top-0 right-0 w-16 h-16 ${colorStyles.light} rounded-bl-full`}></div>
                  <div className={`w-10 h-10 ${colorStyles.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon size={20} className={colorStyles.text} />
                  </div>
                  <p className='text-xs text-gray-500 mb-1'>{stat.label}</p>
                  <p className='text-xl font-bold text-gray-800 mb-1'>{stat.value}</p>
                  <div className='flex items-center gap-1'>
                    {stat.trend === 'up' ? (
                      <TrendingUp size={14} className='text-emerald-500' />
                    ) : (
                      <TrendingDown size={14} className='text-red-500' />
                    )}
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className='w-full px-4 mt-4'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className='text-lg font-bold text-gray-800'>This Week</h2>
            <button className='text-blue-500 text-sm font-medium flex items-center gap-1'>
              See All <ChevronRight size={16} />
            </button>
          </div>
          <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                <span className='text-sm text-gray-600'>Revenue</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 bg-emerald-500 rounded-full'></div>
                <span className='text-sm text-gray-600'>Orders</span>
              </div>
            </div>
            <div className='h-32 bg-gray-50 rounded-xl flex items-end justify-between px-2 pb-2 gap-1'>
              {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                <div key={i} className='flex-1 bg-blue-500 rounded-t-md relative group'>
                  <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity'>
                    ₱{(height * 100).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex justify-between mt-2'>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={i} className='text-xs text-gray-400'>{day}</span>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full px-4 mt-4'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-bold text-gray-800'>Top Products</h2>
              <span className='px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full'>3</span>
            </div>
            <button className='text-blue-500 text-sm font-medium flex items-center gap-1'>
              See All <ChevronRight size={16} />
            </button>
          </div>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50'>
            {topProducts.map((product, index) => (
              <div key={index} className='flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors'>
                <span className='text-sm font-bold text-gray-300 w-4'>{index + 1}</span>
                <div className='w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0'>
                  <Image src={product.image} alt={product.name} width={48} height={48} className='w-full h-full object-cover' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-800 truncate'>{product.name}</p>
                  <p className='text-xs text-gray-500'>{product.sales} sales</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-bold text-gray-800'>{product.revenue}</p>
                  <div className='flex items-center justify-end gap-1'>
                    {product.trend === 'up' ? (
                      <ArrowUpRight size={12} className='text-emerald-500' />
                    ) : (
                      <ArrowDownRight size={12} className='text-red-500' />
                    )}
                    <span className={`text-xs ${product.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {product.trend === 'up' ? '+12%' : '-5%'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full px-4 mt-4'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-bold text-gray-800'>Recent Orders</h2>
              <span className='w-2 h-2 bg-blue-500 rounded-full animate-pulse'></span>
            </div>
            <button className='text-blue-500 text-sm font-medium flex items-center gap-1'>
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50'>
            {recentOrders.map((order, index) => (
              <div key={index} className='flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer'>
                <div className='w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0'>
                  <ShoppingBag size={18} className='text-blue-600' />
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <p className='text-sm font-medium text-gray-800'>{order.id}</p>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className='text-xs text-gray-500 truncate'>{order.customer} • {order.items}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm font-bold text-gray-800'>{order.total}</p>
                  <p className='text-xs text-gray-400'>{order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full px-4 mt-4 mb-4'>
          <div className='grid grid-cols-3 gap-3'>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center'>
              <div className='w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Star size={24} className='text-yellow-500' />
              </div>
              <p className='text-xl font-bold text-gray-800'>4.8</p>
              <p className='text-xs text-gray-500'>Store Rating</p>
            </div>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center'>
              <div className='w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Heart size={24} className='text-pink-500' />
              </div>
              <p className='text-xl font-bold text-gray-800'>489</p>
              <p className='text-xs text-gray-500'>Favorites</p>
            </div>
            <div className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center'>
              <div className='w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2'>
                <Users size={24} className='text-green-600' />
              </div>
              <p className='text-xl font-bold text-gray-800'>128</p>
              <p className='text-xs text-gray-500'>Customers</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Dashboard