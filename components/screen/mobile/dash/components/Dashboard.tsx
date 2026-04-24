'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { 
  Users, Store, ShoppingBag, TrendingUp, TrendingDown,
  DollarSign, Star,
  ArrowUpRight, ArrowLeft,
  AlertTriangle, CheckCircle, XCircle, ChevronRight
} from 'lucide-react'

type DashboardProps = {
  goBack?: () => void
}

const Dashboard = ({ goBack }: DashboardProps) => {
  const router = useRouter()
  const topSellers = [
    { id: 1, name: 'BuildPro Hardware', category: 'Construction', sales: 1245, rating: 4.9, revenue: '₱450,000', trend: 'up', image: '/images/store1.png' },
    { id: 2, name: 'Steel Masters', category: 'Steel Materials', sales: 987, rating: 4.8, revenue: '₱380,000', trend: 'up', image: '/images/store2.png' },
    { id: 3, name: 'Cement Depot', category: 'Cement', sales: 756, rating: 4.7, revenue: '₱290,000', trend: 'down', image: '/images/store3.png' },
    { id: 4, name: 'Tools & More', category: 'Tools', sales: 634, rating: 4.6, revenue: '₱180,000', trend: 'up', image: '/images/store4.png' },
    { id: 5, name: 'Paint World', category: 'Paints', sales: 523, rating: 4.5, revenue: '₱120,000', trend: 'up', image: '/images/store5.png' },
  ]

  const displaySellers = topSellers.slice(0, 5)

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-gray-50">
      {/* Main Header - Full Background */}
      <div className="w-full shrink-0 bg-linear-to-br from-slate-800 via-slate-700 to-slate-800 z-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-5 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        {/* Logo & Title */}
        <header className="w-full px-4 pt-4 pb-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl overflow-hidden shrink-0">
              <Image src="/favicon.png" alt="Logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-wide">Dashboard</h1>
              <span className="text-[10px] text-slate-300 uppercase tracking-widest">Welcome Admin</span>
            </div>
          </div>
        </header>

        {/* Platform Growth Only */}
        <div className="w-full px-4 pb-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="text-lg font-bold text-white">+28.5%</p>
                  <p className="text-xs text-slate-300">Platform Growth</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-300">vs last month</p>
                <p className="text-sm font-medium text-green-400">+12% increase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-scroll pb-20">
        {/* Stats Cards - Redesigned */}
        <div className="w-full px-4 pt-4">
          <div className="grid grid-cols-4 gap-2">
            {/* Total Users */}
            <button onClick={() => router.push('/dash?page=users')} className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-3 text-white shadow-lg text-left cursor-pointer hover:opacity-90 transition-opacity">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <Users size={16} className="text-white" />
              </div>
              <p className="text-lg font-bold">12,847</p>
              <p className="text-[10px] text-blue-100">Total Users</p>
            </button>

            {/* Active Sellers */}
            <div className="bg-linear-to-br from-emerald-500 to-emerald-600 rounded-2xl p-3 text-white shadow-lg">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <Store size={16} className="text-white" />
              </div>
              <p className="text-lg font-bold">2,341</p>
              <p className="text-[10px] text-emerald-100">Active Sellers</p>
            </div>

            {/* Total Orders */}
            <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl p-3 text-white shadow-lg">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <ShoppingBag size={16} className="text-white" />
              </div>
              <p className="text-lg font-bold">45,892</p>
              <p className="text-[10px] text-purple-100">Total Orders</p>
            </div>

            {/* Revenue */}
            <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-3 text-white shadow-lg">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
                <DollarSign size={16} className="text-white" />
              </div>
              <p className="text-lg font-bold">₱1.2M</p>
              <p className="text-[10px] text-orange-100">Revenue</p>
            </div>
          </div>
        </div>

        {/* Top Sellers */}
        <div className="w-full px-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-bold text-gray-800">Top Sellers</h2>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-full">5</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
            {topSellers.slice(0, 5).map((seller) => (
              <div key={seller.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                 {seller.id === 1 ? (
                   <div className="relative w-14 h-14 shrink-0">
                     <div className="absolute inset-0 rounded-xl bg-linear-to-br from-amber-300 via-yellow-400 to-amber-600 p-0.75">
                       <div className="w-full h-full bg-linear-to-br from-amber-200 to-amber-400 rounded-lg"></div>
                     </div>
                     <div className="absolute inset-1 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                       <Store size={22} className="text-slate-600" />
                     </div>
                   </div>
                 ) : seller.id === 2 ? (
                   <div className="relative w-14 h-14 shrink-0">
                     <div className="absolute inset-0 rounded-xl bg-linear-to-br from-slate-300 via-slate-400 to-slate-500 p-0.75 border-2 border-slate-300">
                       <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 rounded-lg"></div>
                     </div>
                     <div className="absolute inset-1 bg-white rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                       <Store size={22} className="text-slate-500" />
                     </div>
                   </div>
                 ) : (
                   <div className="w-14 h-14 bg-slate-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                     <Store size={22} className="text-slate-400" />
                   </div>
                 )}
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-2">
                     {seller.id === 1 ? (
                       <p className="text-sm font-medium truncate gold-shimmer-text">{seller.name}</p>
                     ) : seller.id === 2 ? (
                       <p className="text-sm font-medium truncate silver-shimmer-text">{seller.name}</p>
                     ) : (
                       <p className="text-sm font-medium text-gray-800 truncate">{seller.name}</p>
                     )}
                   </div>
                  <p className="text-xs text-gray-500">{seller.category} • {seller.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">{seller.revenue}</p>
                  <div className="flex items-center justify-end gap-1">
                    {seller.trend === 'up' ? (
                      <TrendingUp size={12} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={12} className="text-red-500" />
                    )}
                    <div className="flex items-center gap-0.5">
                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-600">{seller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="w-full px-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">System Alerts</h2>
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">3</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-yellow-200 bg-yellow-50">
              <AlertTriangle size={16} className="text-yellow-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">15 sellers pending verification</p>
                <p className="text-xs text-gray-400">5m ago</p>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-red-200 bg-red-50">
              <XCircle size={16} className="text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">3 orders flagged for review</p>
                <p className="text-xs text-gray-400">12m ago</p>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-green-200 bg-green-50">
              <CheckCircle size={16} className="text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">Server maintenance completed</p>
                <p className="text-xs text-gray-400">1h ago</p>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="w-full px-4 mt-4 mb-4">
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  )}

export default Dashboard