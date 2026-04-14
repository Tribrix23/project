'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Check, User, Phone, X, CheckCircle, AlertCircle } from 'lucide-react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { createClient } from '@/lib/supabase/client'

type FormData = {
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

type RegisterProps = {
  onRegister?: () => void
  onGoBack?: () => void
  onLogin?: () => void
  termsAndServices?: () => void
  isTermsAgreed?: boolean
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

const Register = ({ onRegister, onGoBack, onLogin, termsAndServices, isTermsAgreed = false, formData, setFormData }: RegisterProps) => {
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [popup, setPopup] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const firstNameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstNameRef.current?.focus()
  }, [])

  useEffect(() => {
    if (isTermsAgreed) {
      setAgreedToTerms(true)
    }
  }, [isTermsAgreed])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    const {
      email,
      password,
      firstName,
      middleName,
      lastName,
      phone
    } = formData

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy_password_to_check_if_user_exists_123456'
      })

      if (signInData?.user) {
        setIsLoading(false)
        setPopup({ type: 'error', message: 'An account with this email already exists' })
        return
      }

      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            phone: phone,
          }
        }
      })

      setIsLoading(false)

      if (signUpError) {
        setPopup({ type: 'error', message: signUpError.message })
        return
      }

      if (data?.user) {
        setPopup({ type: 'success', message: 'Check your email to confirm your account' })
      } else {
        setPopup({ type: 'error', message: 'An account with this email already exists' })
      }
    } catch (err: any) {
      setIsLoading(false)
      setPopup({ type: 'error', message: err.message || 'An error occurred' })
    }
  }

  return (
    <div className='w-full h-full flex flex-col bg-white pb-13'>
      <div className='w-full px-4 pt-4 pb-2'>
        <button onClick={onGoBack} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <ArrowLeft size={24} className='text-gray-700'/>
        </button>
      </div>

      <div className='flex-1 overflow-scroll px-6'>
        <div className='mb-6 pt-2'>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>Create Account</h1>
          <p className='text-gray-500 text-base'>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-1.5'>
              <label className='text-sm font-semibold text-gray-700'>First Name</label>
              <div className='relative'>
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.firstName ? 'text-red-400' : formData.firstName ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  <User size={20}/>
                </div>
                <input 
                  ref={firstNameRef}
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  placeholder='First name'
                  className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                    errors.firstName 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                      : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className='text-red-500 text-sm ml-1'>{errors.firstName}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-semibold text-gray-700'>Last Name</label>
              <div className='relative'>
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  errors.lastName ? 'text-red-400' : formData.lastName ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  <User size={20}/>
                </div>
                <input 
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  placeholder='Last name'
                  className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                    errors.lastName 
                      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                      : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                  }`}
                />
              </div>
              {errors.lastName && (
                <p className='text-red-500 text-sm ml-1'>{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Middle Name</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                formData.middleName ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <User size={20}/>
              </div>
              <input 
                type="text"
                value={formData.middleName}
                onChange={(e) => handleChange('middleName', e.target.value)}
                placeholder='Middle name (optional)'
                className='w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-800 text-base outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100'
              />
            </div>
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Email Address</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                errors.email ? 'text-red-400' : formData.email ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <Mail size={20}/>
              </div>
              <input 
                type="text"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder='name@example.com'
                className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                }`}
              />
            </div>
            {errors.email && (
              <p className='text-red-500 text-sm ml-1'>{errors.email}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Phone Number</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                errors.phone ? 'text-red-400' : formData.phone ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <Phone size={20}/>
              </div>
              <input 
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder='09xxxxxxxxx'
                className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  errors.phone 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                }`}
              />
            </div>
            {errors.phone && (
              <p className='text-red-500 text-sm ml-1'>{errors.phone}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Password</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                errors.password ? 'text-red-400' : formData.password ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <Lock size={20}/>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder='••••••••'
                className={`w-full h-14 pl-12 pr-14 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                }`}
              />
              <button 
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm ml-1'>{errors.password}</p>
            )}
          </div>

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Confirm Password</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                errors.confirmPassword ? 'text-red-400' : formData.confirmPassword ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <Lock size={20}/>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder='••••••••'
                className={`w-full h-14 pl-12 pr-14 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  errors.confirmPassword 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                }`}
              />
              <button 
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm ml-1'>{errors.confirmPassword}</p>
            )}
          </div>

          <div className='flex items-start gap-3 group'>
            <button 
              type='button'
              onClick={() => {
                if (!agreedToTerms && termsAndServices) {
                  termsAndServices()
                } else {
                  setAgreedToTerms(!agreedToTerms)
                }
              }}
              className={`w-5 h-5 mt-0.5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all ${
                agreedToTerms 
                  ? 'bg-orange-500 border-orange-500' 
                  : 'border-gray-300 group-hover:border-orange-400'
              }`}
            >
              {agreedToTerms && <Check size={14} className='text-white'/>}
            </button>
            <p className='text-sm text-gray-600 text-left'>
              I agree to the{' '}
              <span 
                className='text-orange-500 font-semibold cursor-pointer'
                onClick={termsAndServices}
              >
                Terms of Service
              </span>
              {' '}and{' '}
              <span 
                className='text-orange-500 font-semibold cursor-pointer'
                onClick={termsAndServices}
              >
                Privacy Policy
              </span>
            </p>
          </div>
          {errors.terms && (
            <p className='text-red-500 text-sm ml-1'>{errors.terms}</p>
          )}

          <button 
            type='submit'
            disabled={isLoading}
            className='w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className='mt-8 mb-6'>
          <div className='relative'>
            <div className='absolute left-0 right-0 top-1/2 h-px bg-gray-200'/>
            <span className='absolute left-1/2 -translate-x-1/2 bg-white px-3 text-sm text-gray-400'>Or continue with</span>
          </div>
        </div>

        <div className='flex gap-3 mb-6'>
          <button className='flex-1 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors'>
            <FaFacebookF size={22} className='text-blue-600'/>
          </button>
          <button className='flex-1 h-14 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors'>
            <FaGoogle size={22} className='text-red-500'/>
          </button>
        </div>
      </div>

      <div className='w-full px-6 py-6 bg-white border-t border-gray-100'>
        <p className='text-center text-gray-600'>
          Already have an account?{' '}
          <button 
            onClick={onLogin}
            className='text-orange-500 font-bold hover:text-orange-600 transition-colors ml-1'
          >
            Sign in
          </button>
        </p>
      </div>

      {isLoading && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl p-6 flex flex-col items-center gap-4 mx-8'>
            <div className='w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin'/>
            <p className='text-gray-700 font-medium'>Please wait...</p>
          </div>
        </div>
      )}

      {popup && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-2xl p-6 flex flex-col items-center gap-4 mx-8 max-w-sm'>
            {popup.type === 'success' ? (
              <CheckCircle size={48} className='text-green-500'/>
            ) : (
              <AlertCircle size={48} className='text-red-500'/>
            )}
            <p className={`text-gray-700 font-medium text-center ${popup.type === 'error' ? 'text-red-500' : ''}`}>
              {popup.message}
            </p>
            <button 
              onClick={() => setPopup(null)}
              className='w-full h-12 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors'
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register