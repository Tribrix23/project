'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Check, User, Phone } from 'lucide-react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'

type RegisterProps = {
  onRegister?: () => void
  onGoBack?: () => void
  onLogin?: () => void
  termsAndServices?: () => void
  isTermsAgreed?: boolean
}

const Register = ({ onRegister, onGoBack, onLogin, termsAndServices, isTermsAgreed = false }: RegisterProps) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onRegister?.()
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
          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Username</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                errors.username ? 'text-red-400' : formData.username ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <User size={20}/>
              </div>
              <input 
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder='Username'
                className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  errors.username 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                }`}
              />
            </div>
            {errors.username && (
              <p className='text-red-500 text-sm ml-1'>{errors.username}</p>
            )}
          </div>

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
            className='w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98]'
          >
            Create Account
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
    </div>
  )
}

export default Register