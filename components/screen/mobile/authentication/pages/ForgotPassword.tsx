'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Mail, Check } from 'lucide-react'

type ForgotPasswordProps = {
  onGoBack?: () => void
  onLogin?: () => void
}

const ForgotPassword = ({ onGoBack, onLogin }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError('Email is required')
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email')
      return false
    }
    setEmailError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail()) {
      setIsSubmitted(true)
    }
  }

  const handleResend = () => {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className='w-full h-full flex flex-col bg-white'>
        <div className='w-full px-4 pt-4 pb-2'>
          <button onClick={onGoBack} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <ArrowLeft size={24} className='text-gray-700'/>
          </button>
        </div>

        <div className='flex-1 flex flex-col items-center justify-center px-6'>
          <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6'>
            <Check size={48} className='text-green-500'/>
          </div>
          
          <h1 className='text-2xl font-bold text-gray-900 mb-3 text-center'>Check Your Email</h1>
          <p className='text-gray-500 text-base text-center mb-2'>
            We've sent a password reset link to
          </p>
          <p className='text-gray-800 font-semibold mb-8'>{email}</p>
          
          <div className='w-full space-y-3'>
            <button 
              onClick={handleResend}
              className='w-full h-14 bg-gray-50 border border-gray-200 text-gray-700 rounded-2xl font-semibold text-base hover:bg-gray-100 transition-colors'
            >
              Resend Email
            </button>
            <button 
              onClick={onLogin}
              className='w-full h-14 bg-orange-500 text-white rounded-2xl font-semibold text-base hover:bg-orange-600 transition-colors'
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col bg-white'>
      <div className='w-full px-4 pt-4 pb-2'>
        <button onClick={onGoBack} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
          <ArrowLeft size={24} className='text-gray-700'/>
        </button>
      </div>

      <div className='flex-1 overflow-scroll px-6'>
        <div className='mb-8 pt-4'>
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>Forgot Password</h1>
          <p className='text-gray-500 text-base'>Enter your email address and we'll send you a link to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Email Address</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                emailError ? 'text-red-400' : email ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <Mail size={20}/>
              </div>
              <input 
                ref={emailRef}
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (emailError) setEmailError('')
                }}
                placeholder='name@example.com'
                className={`w-full h-14 pl-12 pr-4 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  emailError 
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
                    : 'border-transparent focus:border-orange-500 focus:ring-4 focus:ring-orange-100 bg-gray-50'
                }`}
              />
            </div>
            {emailError && (
              <p className='text-red-500 text-sm ml-1'>{emailError}</p>
            )}
          </div>

          <button 
            type='submit'
            className='w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98]'
          >
            Send Reset Link
          </button>
        </form>
      </div>

      <div className='w-full px-6 py-6 bg-gray-50 border-t border-gray-100'>
        <p className='text-center text-gray-600'>
          Remember your password?{' '}
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

export default ForgotPassword