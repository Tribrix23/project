'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-orange-400 via-orange-500 to-orange-600 text-white">
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="relative mb-8">
          <Image
            src="/favicon.png"
            alt="Not Found"
            width={160}
            height={160}
            className="drop-shadow-2xl animate-bounce"
            style={{ animationDuration: '3s' }}
          />
        </div>

        <h1 className="text-[150px] font-bold leading-none tracking-tighter drop-shadow-lg" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
          404
        </h1>
        
        <p className="mt-2 text-2xl font-light opacity-95 tracking-wide">
          Oops! Page Not Found
        </p>
        
        <p className="mt-4 text-lg opacity-80 max-w-md">
          Looks like this page wandered off the construction site. Let's get you back on track!
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <HomeIcon size={20} />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <ArrowLeftIcon size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
