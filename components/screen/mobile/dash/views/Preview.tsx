'use client'

import React, { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Star, Package, ShoppingBag, Eye, Heart, MessageCircle, Store, User, Calendar, Clock, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface SellerStore {
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
}

interface Profile {
  first_name: string
  middle_name: string
  last_name: string
  email: string
}

interface PreviewProps {
  userId: string
}

const Preview = ({ userId }: PreviewProps) => {
  const [store, setStore] = useState<SellerStore | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const res = await fetch(`/api/reviewApi?userId=${userId}`)
        const data = await res.json()
        setStore(data.sellerStore)
        setProfile(data.profile)
      } catch (err) {
        console.error('Error fetching store data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStoreData()
  }, [userId])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500">Loading store details...</p>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Store not found</p>
        </div>
      </div>
    )
  }

  const fullName = profile ? `${profile.first_name} ${profile.middle_name || ''} ${profile.last_name}`.trim() : 'Unknown'
  const fullAddress = [store.street, store.barangay, store.city, store.province, store.zipcode].filter(Boolean).join(', ')

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      <div className="w-full shrink-0 bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600">
        <header className="w-full h-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/favicon.png"
                alt="Store Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-contain bg-white shadow-lg"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white tracking-wide">{store.name}</h1>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-blue-100 uppercase tracking-widest">Review Mode</span>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="w-full bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        <div className="w-full py-6 px-4 flex items-start gap-4 relative z-10">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-white p-1 shadow-2xl">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/hat.png"
                  alt="Store Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <AlertCircle size={10} className="text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white">{store.name}</h2>
              <div className="px-2.5 py-1 bg-yellow-500 rounded-full">
                <span className="text-[10px] font-bold text-white uppercase">{store.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-blue-100 text-xs mb-3">
              <MapPin size={12} />
              <span className="truncate">{fullAddress || 'Address not provided'}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                <Star className="text-yellow-300 fill-yellow-300" size={12} />
                <span className="text-white font-bold text-xs">New</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                <Package className="text-white" size={12} />
                <span className="text-white font-bold text-xs">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4 bg-white border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Applicant Information</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{fullName}</p>
            <p className="text-xs text-gray-500">{profile?.email}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Store Details</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Business Type</p>
            <p className="text-gray-800 font-medium">{store.business_type || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
            <p className="text-gray-800">{store.description || 'No description provided'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              store.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
              store.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {store.status}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4 mb-20">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Location</h3>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-blue-600 mt-0.5" />
            <div>
              <p className="text-gray-800">{store.street || 'Street not provided'}</p>
              <p className="text-gray-600 text-sm">{store.barangay}, {store.city}</p>
              <p className="text-gray-600 text-sm">{store.province} {store.zipcode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview