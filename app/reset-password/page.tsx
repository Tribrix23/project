'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase/browser'

const ResetPasswordPage = () => {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [validSession, setValidSession] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setValidSession(true)
      } else {
        setError('Invalid or expired reset link')
      }
    }

    checkSession()
  }, [])

  const handleUpdatePassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError(
        'Password must be at least 6 characters'
      )
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Password updated successfully!')

      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    }

    setLoading(false)
  }

  if (!validSession && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">
          Verifying reset link...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>

          <p className="text-gray-500 mb-8">
            Enter your new password below
          </p>

          {message ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle
                  size={42}
                  className="text-green-500"
                />
              </div>

              <p className="text-green-600 font-semibold text-center">
                {message}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleUpdatePassword}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter new password"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-800 text-base outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={20} />
                  </div>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm new password"
                    className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-2xl text-gray-800 text-base outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-14 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold text-base hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-200 active:scale-[0.98] ${
                  loading
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                {loading
                  ? 'Updating Password...'
                  : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage