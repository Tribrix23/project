'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  X, ChevronLeft, Package, Tag, FileText, 
  Image as ImageIcon, CheckCircle
} from 'lucide-react'

type AddProductPopupProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (product: ProductData) => void
}

type ProductData = {
  name: string
  category: string
  description: string
  details: string
  image: string | null
  guarantees: string[]
}

const productCategories = [
  'Tools',
  'Materials', 
  'Cement & Concrete',
  'Steel & Metals',
  'Paint & Finishing',
  'Plumbing',
  'Electrical',
  'Wood & Lumber',
  'Hardware',
  'Safety Equipment'
]

const guaranteeOptions = [
  'Genuine Product',
  'Fast Shipping',
  'Easy Return',
  'Warranty Included',
  'Secure Payment',
  '24/7 Support'
]

const AddProductPopup = ({ isOpen, onClose, onSave }: AddProductPopupProps) => {
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    category: '',
    description: '',
    details: '',
    image: null,
    guarantees: [...guaranteeOptions]
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleInputChange = (field: keyof ProductData, value: string) => {
    setProductData(prev => ({ ...prev, [field]: value }))
  }

  const handleGuaranteeToggle = (guarantee: string) => {
    setProductData(prev => {
      const isSelected = prev.guarantees.includes(guarantee)
      if (isSelected) {
        return { ...prev, guarantees: prev.guarantees.filter(g => g !== guarantee) }
      } else {
        return { ...prev, guarantees: [...prev.guarantees, guarantee] }
      }
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setProductData(prev => ({ ...prev, image: event.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const canProceedStep1 = productData.name.trim().length >= 2 && productData.category !== ''
  const canProceedStep2 = productData.description.trim().length >= 10
  const canProceedStep3 = productData.image !== null

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleSave()
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append('name', productData.name)
      formData.append('category', productData.category)
      formData.append('description', productData.description)
      if (productData.details) {
        formData.append('details', productData.details)
      }
      formData.append('guarantees', JSON.stringify(productData.guarantees))
      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      const response = await fetch('/api/addProducts', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to save product')
      }

      const data = await response.json()
      onSave(data.data[0]) // data is { data: [...] } from the API
      await new Promise(resolve => setTimeout(resolve, 500))
      handleClose()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    setStep(1)
    setProductData({
      name: '',
      category: '',
      description: '',
      details: '',
      image: null,
      guarantees: [...guaranteeOptions]
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col'>
        <div className='flex items-center justify-between p-6 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className='p-2 rounded-full hover:bg-gray-100 transition-colors'
              >
                <ChevronLeft size={20} className='text-gray-600' />
              </button>
            )}
            <h2 className='text-xl font-bold text-gray-800'>Add Product</h2>
          </div>
          <button 
            onClick={handleClose}
            className='p-2 rounded-full hover:bg-gray-100 transition-colors'
          >
            <X size={20} className='text-gray-600' />
          </button>
        </div>

        <div className='flex items-center justify-center px-6 py-4 gap-2'>
          {[1, 2, 3].map((s) => (
            <div key={s} className='flex items-center'>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > s ? <CheckCircle size={16} /> : s}
              </div>
              {s < 3 && (
                <div className={`w-8 h-1 rounded ${step > s ? 'bg-orange-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className='flex-1 overflow-y-auto px-6 pb-6'>
          {step === 1 && (
            <div className='space-y-5'>
              <div>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>Product Name</label>
                <div className='relative'>
                  <Package className='absolute left-3 top-3 text-gray-400' size={18} />
                  <input
                    type='text'
                    value={productData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder='Enter product name'
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent'
                  />
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>Item Category</label>
                <div className='relative'>
                  <Tag className='absolute left-3 top-3 text-gray-400' size={18} />
                  <select
                    value={productData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent appearance-none'
                  >
                    <option value=''>Select category</option>
                    {productCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='space-y-5'>
              <div>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>Description</label>
                <div className='relative'>
                  <FileText className='absolute left-3 top-3 text-gray-400' size={18} />
                  <textarea
                    value={productData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder='Describe your product'
                    rows={4}
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none'
                  />
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-700 mb-2 block'>Product Details</label>
                <textarea
                  value={productData.details}
                  onChange={(e) => handleInputChange('details', e.target.value)}
                  placeholder='Additional details, specifications, dimensions, etc.'
                  rows={3}
                  className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent resize-none'
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='space-y-5'>
              <div>
                <label className='text-sm font-medium text-gray-700 mb-3 block'>Upload Image</label>
                <label className='block'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />
                  <div className={`w-full aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                    productData.image 
                      ? 'border-orange-300 bg-orange-50' 
                      : 'border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                  }`}>
                    {productData.image ? (
                      <img 
                        src={productData.image} 
                        alt='Product' 
                        className='w-full h-full object-cover rounded-2xl'
                      />
                    ) : (
                      <>
                        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3'>
                          <ImageIcon size={32} className='text-gray-400' />
                        </div>
                        <p className='text-sm font-medium text-gray-600'>Upload an image</p>
                        <p className='text-xs text-gray-400 mt-1'>PNG, JPG, or GIF</p>
                      </>
                    )}
                  </div>
                </label>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-700 mb-3 block'>Guarantees</label>
                <div className='space-y-2'>
                  {guaranteeOptions.map((guarantee) => (
                    <label 
                      key={guarantee} 
                      className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors'
                    >
                      <input
                        type='checkbox'
                        checked={productData.guarantees.includes(guarantee)}
                        onChange={() => handleGuaranteeToggle(guarantee)}
                        className='w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-300'
                      />
                      <span className='text-sm text-gray-700'>{guarantee}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='p-6 border-t border-gray-100'>
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !canProceedStep1) || 
              (step === 2 && !canProceedStep2) || 
              (step === 3 && !canProceedStep3) ||
              isSaving
            }
            className={`w-full py-3 font-semibold rounded-full transition-colors ${
              ((step === 1 && canProceedStep1) || 
               (step === 2 && canProceedStep2) || 
               (step === 3 && canProceedStep3)) && !isSaving
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSaving ? 'Saving...' : step < 3 ? 'Continue' : 'Save Product'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProductPopup