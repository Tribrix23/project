'use client'

import React, { useEffect, useState } from 'react'
import { MapPin, Phone } from 'lucide-react'
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
  phone: string
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
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-500">Store not found</p>
        </div>
      </div>
    )
  }

  // Format name: first_name + first letter of middle_name (capitalized) + . + last_name
  const getFormattedName = (profile: Profile | null): string => {
    if (!profile) return 'Unknown'
    const { first_name, middle_name, last_name } = profile
    // Handle case where all names might be empty or null/undefined
    const hasFirstName = first_name && first_name.trim()
    const hasLastName = last_name && last_name.trim()
    if (!hasFirstName && !hasLastName) return 'Unknown'
    
    const firstLetter = middle_name && middle_name.trim() ? middle_name.charAt(0).toUpperCase() : ''
    const middleInitial = firstLetter ? `${firstLetter}.` : ''
    const name = `${first_name || ''} ${middleInitial} ${last_name || ''}`.trim()
    return name || 'Unknown'
  }

  // Get phone number
  const phoneNumber = profile?.phone || 'Not provided'

  const fullAddress = [store.street, store.barangay, store.city, store.province, store.zipcode].filter(Boolean).join(', ')

  return (
    <div className="w-full min-h-full overflow-y-auto bg-slate-50">
      {/* Store Header Section */}
      <div className="w-full px-4 pt-6 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{store.name}</h1>
              <span className={`inline-flex px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                store.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                store.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {store.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Banner Section */}
      <div className="w-full px-4 mt-4">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          
          <div className="relative flex items-start gap-4">
            {/* Store Logo/Image Area - No circle picture */}
            <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-white/90 text-sm font-medium">Business Type:</span>
                <span className="text-white font-semibold text-sm">{store.business_type || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-100 text-xs mb-2">
                <MapPin size={12} />
                <span className="truncate">{fullAddress || 'Address not provided'}</span>
              </div>
            </div>
          </div>

          {/* Store Description */}
          <div className="relative mt-4">
            <p className="text-blue-100 text-sm leading-relaxed">
              {store.description || 'No description provided'}
            </p>
          </div>
        </div>
      </div>

      {/* Applicant Information Section */}
      <div className="w-full px-4 mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Applicant Information</h3>
          </div>
          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{getFormattedName(profile)}</p>
                {profile?.email && (
                  <p className="text-xs text-slate-500">{profile.email}</p>
                )}
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Phone Number</p>
                <p className="text-sm text-green-600">{phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Details Section */}
      <div className="w-full px-4 mt-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Store Details</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-slate-400 text-xs uppercase tracking-wide">Business Type</span>
              <span className="text-slate-800 font-medium text-sm">{store.business_type || 'Not specified'}</span>
            </div>
            <div className="border-t border-slate-100"></div>
            <div className="flex justify-between items-start">
              <span className="text-slate-400 text-xs uppercase tracking-wide">Status</span>
              <span className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                store.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                store.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {store.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="w-full px-4 mt-4 mb-24">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-blue-600 rounded-full"></div>
            <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Location</h3>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-800 text-sm">{store.street || 'Street not provided'}</p>
              <p className="text-slate-500 text-xs">{store.barangay}, {store.city}</p>
              <p className="text-slate-500 text-xs">{store.province} {store.zipcode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview