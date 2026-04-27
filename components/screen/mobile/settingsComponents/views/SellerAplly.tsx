'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  Store, MapPin, Building2, 
  Package, Truck, Shield, ArrowLeft, CheckCircle
} from 'lucide-react'

type SellerApllyProps = {
  onBack?: () => void
}

interface FormData {
  storeName: string
  storeDescription: string
  address: string
  businessType: string
}

interface UserProfile {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  phone: string
}

const businessTypes = ['Individual', 'Partnership', 'Corporation', 'Registered Business']

const SellerAplly = ({ onBack }: SellerApllyProps) => {
  const router = useRouter()
  const supabase = createClient()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    storeDescription: '',
    address: '',
    businessType: ''
  })

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('first_name, middle_name, last_name, email, phone')
          .eq('id', user.id)
          .single()
        
        if (data) {
          setUserProfile(data)
        }
      }
    }
    fetchUserProfile()
  }, [supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await supabase.from('seller_applications').insert({
          user_id: user.id,
          store_name: formData.storeName,
          store_description: formData.storeDescription,
          address: formData.address,
          business_type: formData.businessType,
          status: 'pending'
        })
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    if (step === 1) {
      return formData.storeName.trim().length >= 3 && formData.storeDescription.trim().length >= 10
    }
    return formData.address.trim().length >= 10 && formData.businessType
  }

  const getFullName = () => {
    if (!userProfile) return ''
    const parts = [userProfile.first_name, userProfile.middle_name, userProfile.last_name].filter(Boolean)
    return parts.join(' ')
  }

  if (isSubmitted) {
    return (
      <div className='w-full h-full flex flex-col bg-gray-50'>
        <header className='w-full h-16 bg-white flex items-center px-4 shadow-sm shrink-0'>
          <button onClick={onBack} className='p-2 -ml-2 rounded-full hover:bg-gray-100'>
            <ArrowLeft size={20} className='text-gray-700' />
          </button>
          <h1 className='text-xl font-bold text-gray-800 ml-2'>Seller Application</h1>
        </header>

        <div className='flex-1 flex flex-col items-center justify-center px-6'>
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6'>
            <CheckCircle size={48} className='text-green-500' />
          </div>
          <h2 className='text-2xl font-bold text-gray-800 mb-3'>Application Submitted!</h2>
          <p className='text-gray-500 text-center mb-8'>
            Your seller application has been submitted successfully. We will review it and get back to you within 2-3 business days.
          </p>
          <button 
            onClick={onBack}
            className='w-full py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors'
          >
            Back to Profile
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
      <header className='w-full h-16 bg-white flex items-center px-4 shadow-sm shrink-0'>
        <button onClick={onBack} className='p-2 -ml-2 rounded-full hover:bg-gray-100'>
          <ArrowLeft size={20} className='text-gray-700' />
        </button>
        <h1 className='text-xl font-bold text-gray-800 ml-2'>Become a Seller</h1>
      </header>

      <div className='px-4 py-4'>
        <div className='flex items-center justify-between mb-6'>
          {[1, 2].map((s) => (
            <div key={s} className='flex items-center'>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              {s < 2 && (
                <div className={`w-16 h-1 mx-1 rounded ${step > s ? 'bg-orange-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {userProfile && (
          <div className='bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100'>
            <p className='text-xs text-gray-500 mb-2'>Your Account Info</p>
            <div className='space-y-1'>
              <p className='text-sm font-medium text-gray-800'>{getFullName()}</p>
              <p className='text-xs text-gray-500'>{userProfile.email}</p>
              {userProfile.phone && <p className='text-xs text-gray-500'>{userProfile.phone}</p>}
            </div>
          </div>
        )}

        <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100'>
          {step === 1 && (
            <>
              <h2 className='text-lg font-bold text-gray-800 mb-5 flex items-center gap-2'>
                <Store className='text-orange-500' size={22} />
                Store Information
              </h2>
              
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>Store Name</label>
                  <input
                    type='text'
                    name='storeName'
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder='Enter your store name'
                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent'
                  />
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>Store Description</label>
                  <textarea
                    name='storeDescription'
                    value={formData.storeDescription}
                    onChange={handleChange}
                    placeholder='Describe your store and the products you sell'
                    rows={4}
                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none'
                  />
                </div>

                <div className='grid grid-cols-2 gap-3 pt-2'>
                  <div className='bg-orange-50 p-3 rounded-xl text-center'>
                    <Package className='text-orange-500 mx-auto mb-1' size={20} />
                    <p className='text-xs text-gray-600'>List Products</p>
                  </div>
                  <div className='bg-gray-50 p-3 rounded-xl text-center'>
                    <Truck className='text-gray-500 mx-auto mb-1' size={20} />
                    <p className='text-xs text-gray-600'>Manage Orders</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className='text-lg font-bold text-gray-800 mb-5 flex items-center gap-2'>
                <Building2 className='text-orange-500' size={22} />
                Business Details
              </h2>
              
              <div className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>Business Address</label>
                  <div className='relative'>
                    <MapPin className='absolute left-3 top-3 text-gray-400' size={18} />
                    <textarea
                      name='address'
                      value={formData.address}
                      onChange={handleChange}
                      placeholder='Enter your complete business address'
                      rows={2}
                      className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none'
                    />
                  </div>
                </div>

                <div>
                  <label className='text-sm font-medium text-gray-700 mb-2 block'>Business Type</label>
                  <select
                    name='businessType'
                    value={formData.businessType}
                    onChange={handleChange}
                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent'
                  >
                    <option value=''>Select business type</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className='bg-blue-50 p-4 rounded-xl flex items-start gap-3'>
                  <Shield className='text-blue-500 shrink-0 mt-0.5' size={20} />
                  <div>
                    <p className='text-sm font-medium text-blue-800'>Your data is secure</p>
                    <p className='text-xs text-blue-600 mt-1'>We will only use your information to process your seller application.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className='flex gap-3 mt-5'>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className='flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-colors'
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className={`flex-1 py-3 font-semibold rounded-full transition-colors ${
                canProceed() 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className={`flex-1 py-3 font-semibold rounded-full transition-colors ${
                canProceed() && !isSubmitting
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SellerAplly