import PhilippinesMap from '@/components/ui/Map'
import React, { useState, useRef } from 'react'

const Address = () => {
  const [form, setForm] = useState({
    province: '',
    city: '',
    barangay: '',
    street: '',
    blkLot: '',
    zipcode: '',
  })

  const mapRef = useRef<{
    locateUser: (() => Promise<boolean>) | null
  }>(null)

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleLocationChange = (data: {
    province: string
    city: string
    barangay: string
    street: string
    zipcode: string
    lat: number
    lon: number
  }) => {
    setForm(prev => ({
      ...prev,
      province: data.province || prev.province,
      city: data.city || prev.city,
      barangay: data.barangay || prev.barangay,
      street: data.street || '', // Leave street blank if from geocode
      zipcode: data.zipcode || prev.zipcode,
    }))
  }

  const handlePinPlace = (coords: [number, number]) => {
    // Pin placed, coords available if needed
  }

  const handleLocateClick = async () => {
    if (mapRef.current?.locateUser) {
      await mapRef.current.locateUser()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
    // Handle form submission
  }

  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
      <header className='w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm shrink-0 border-b'>
        <h1 className='text-xl font-bold text-gray-800'>Address</h1>
      </header>
      <main className='flex-1 overflow-scroll'>
        {/* Map Section - Square Container */}
        <div className='p-4'>
          <div className='w-full aspect-square bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
            <PhilippinesMap
              onLocationChange={handleLocationChange}
              onPinPlace={handlePinPlace}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className='px-4 pb-4'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4'>
              {/* Province */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Province</label>
                <input
                  type="text"
                  value={form.province}
                  onChange={(e) => handleFormChange('province', e.target.value)}
                  placeholder="Enter province"
                  className='w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors'
                />
              </div>

              {/* City */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => handleFormChange('city', e.target.value)}
                  placeholder="Enter city"
                  className='w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors'
                />
              </div>

              {/* Barangay */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Barangay</label>
                <input
                  type="text"
                  value={form.barangay}
                  onChange={(e) => handleFormChange('barangay', e.target.value)}
                  placeholder="Enter barangay"
                  className='w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors'
                />
              </div>

              {/* Street - Optional */}
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-2'>Street <span className='text-gray-400 font-normal'>(Optional)</span></label>
                <input
                  type="text"
                  value={form.street}
                  onChange={(e) => handleFormChange('street', e.target.value)}
                  placeholder="Enter street (optional)"
                  className='w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors'
                />
              </div>

              {/* Blk/Lot */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Blk / Lot</label>
                <input
                  type="text"
                  value={form.blkLot}
                  onChange={(e) => handleFormChange('blkLot', e.target.value)}
                  placeholder="Enter block and lot number"
                  className='w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors'
                />
              </div>

              {/* Zipcode */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Zipcode</label>
                <input
                  type="text"
                  value={form.zipcode}
                  onChange={(e) => handleFormChange('zipcode', e.target.value)}
                  placeholder="Enter zipcode"
                  className='w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:bg-white transition-colors'
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className='w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors active:opacity-80'
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Address