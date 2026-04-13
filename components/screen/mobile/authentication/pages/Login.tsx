'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Check } from 'lucide-react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { createClient } from '@/lib/supabase/client'

type LoginProps = {
  onLogin?: () => void
  onGoBack?: () => void
  onForgotPassword?: () => void
  onRegister?: () => void
}

const Login = ({ onLogin, onGoBack, onForgotPassword, onRegister }: LoginProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const validateForm = () => {
    let isValid = true
    
    if (!email.trim()) {
      setEmailError('Email is required')
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email')
      isValid = false
    } else {
      setEmailError('')
    }

    if (!password.trim()) {
      setPasswordError('Password is required')
      isValid = false
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      isValid = false
    } else {
      setPasswordError('')
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    
    if (validateForm()) {
      setIsLoading(true)
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        setAuthError(error.message)
        setIsLoading(false)
      } else {
        onLogin?.()
      }
    }
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
          <h1 className='text-3xl font-bold text-gray-900 mb-3'>Welcome Back</h1>
          <p className='text-gray-500 text-base'>Sign in to continue to your account</p>
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

          <div className='space-y-1.5'>
            <label className='text-sm font-semibold text-gray-700'>Password</label>
            <div className='relative'>
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                passwordError ? 'text-red-400' : password ? 'text-orange-500' : 'text-gray-400'
              }`}>
                <Lock size={20}/>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (passwordError) setPasswordError('')
                }}
                placeholder='••••••••'
                className={`w-full h-14 pl-12 pr-14 bg-gray-50 border-2 rounded-2xl text-gray-800 text-base outline-none transition-all ${
                  passwordError 
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
            {passwordError && (
              <p className='text-red-500 text-sm ml-1'>{passwordError}</p>
            )}
          </div>

          <div className='flex items-center justify-between'>
            <button 
              type='button'
              onClick={() => setRememberMe(!rememberMe)}
              className='flex items-center gap-2 group'
            >
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                rememberMe 
                  ? 'bg-orange-500 border-orange-500' 
                  : 'border-gray-300 group-hover:border-orange-400'
              }`}>
                {rememberMe && <Check size={14} className='text-white'/>}
              </div>
              <span className='text-sm text-gray-600'>Remember me</span>
            </button>
            <button 
              type='button'
              onClick={onForgotPassword}
              className='text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors'
            >
              Forgot Password?
            </button>
          </div>

          {authError && (
            <p className='text-red-500 text-sm ml-1'>{authError}</p>
          )}

          <button 
            type='submit'
            disabled={isLoading}
            className='w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
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

      <div className='w-full px-6 py-6 bg-white border-t border-gray-100 pb-40'>
        <p className='text-center text-gray-600'>
          Don't have an account?{' '}
          <button 
            onClick={onRegister}
            className='text-orange-500 font-bold hover:text-orange-600 transition-colors ml-1'
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login