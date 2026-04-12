'use client'
import React, { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle, Package, Truck, ShieldCheck } from 'lucide-react'

type InfosProps = {
  onLogin?: () => void
  onRegister?: () => void
}

const Infos = ({ onLogin, onRegister }: InfosProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      icon: Package,
      title: 'Wide Product Range',
      description: 'Browse thousands of construction materials, tools, and hardware in one place.',
      color: 'bg-orange-500'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your orders delivered right to your doorstep with our reliable delivery service.',
      color: 'bg-blue-500'
    },
    {
      icon: ShieldCheck,
      title: 'Trusted Quality',
      description: 'Every product is verified and guaranteed authentic from trusted sellers.',
      color: 'bg-green-500'
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying || currentSlide === slides.length - 1) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, currentSlide, slides.length])

  const handleNext = () => {
    setIsAutoPlaying(false)
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handlePrev = () => {
    setIsAutoPlaying(false)
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
  }

  return (
    <div className='w-full h-full flex flex-col bg-white pb-7'>
      <div className='w-full h-[75%] relative overflow-hidden'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full flex flex-col items-center justify-center px-8 transition-all duration-500 ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <div className={`${slide.color} w-32 h-32 rounded-full flex items-center justify-center mb-8`}>
              <slide.icon size={64} className='text-white' />
            </div>
            <h1 className='text-2xl font-bold text-gray-800 text-center mb-4'>
              {slide.title}
            </h1>
            <p className='text-gray-500 text-center text-base leading-relaxed'>
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      <div className='w-full h-[25%] flex flex-col items-center justify-end pb-12 px-8'>
        <div className='flex gap-2 mb-8'>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-orange-500' 
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {currentSlide === slides.length - 1 ? (
          <div className='w-full flex flex-col gap-3'>
            <button 
              onClick={onRegister}
              className='w-full py-3 bg-orange-500 text-white rounded-full font-semibold text-base hover:bg-orange-600 transition-colors'
            >
              Register
            </button>
            <button 
              onClick={onLogin}
              className='w-full py-3 bg-white border-2 border-orange-500 text-orange-500 rounded-full font-semibold text-base hover:bg-orange-50 transition-colors'
            >
              Login
            </button>
          </div>
        ) : (
          <div className='w-full flex items-center justify-between'>
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`text-gray-400 font-medium text-sm ${currentSlide === 0 ? 'opacity-0' : 'hover:text-gray-600'}`}
            >
              Back
            </button>
            <button 
              onClick={handleNext}
              className='flex items-center gap-2 text-orange-500 font-semibold text-sm hover:text-orange-600'
            >
              Next
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Infos