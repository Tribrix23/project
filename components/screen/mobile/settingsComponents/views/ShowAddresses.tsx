"use client"

import React, { useState, useEffect } from 'react'
import { MapPin, Plus, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Address {
  id: string
  province: string
  city: string
  barangay: string
  street: string
  lot: string
  zip: string
}

const ShowAddresses = () => {
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const res = await fetch('/api/showAddr')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch addresses')
      }

      setAddresses(data.addresses || [])
    } catch (err: any) {
      console.error('Error fetching addresses:', err)
    } finally {
      setLoading(false)
    }
  }

   const handleAddAddress = () => {
     router.push('?c=addr')
   }

   const handleBack = () => {
     router.push('/?page=profile')
   }

  const handleAddressClick = (address: Address) => {
    console.log('Selected address:', address)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="w-full h-16 bg-white flex items-center px-4 shadow-sm shrink-0">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 ml-2">My Addresses</h1>
      </div>

      {/* Address List */}
      <main className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full h-20 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : addresses.length > 0 ? (
          <div className="space-y-3 mb-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => handleAddressClick(address)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {address.street || 'Unnamed Address'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 wrap-break-word">
                      {address.lot && `${address.lot}, `}
                      {address.barangay}, {address.city}, {address.province}
                      {address.zip && ` ${address.zip}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No addresses saved yet</p>
          </div>
        )}

        {/* Add Address Card */}
        <div className="pb-4">
          <button
            onClick={handleAddAddress}
            className="w-full bg-white rounded-xl p-4 shadow-sm border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Plus size={24} className="text-orange-600" />
              </div>
              <span className="text-sm font-medium text-orange-600">
                Add New Address
              </span>
            </div>
          </button>
        </div>
      </main>
    </div>
  )
}

export default ShowAddresses
