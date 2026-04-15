'use client'
import React, { useState } from 'react'
import { CreditCard, Smartphone, Wallet, ChevronRight, Check, ShoppingBag, Tag, X, Truck, FileText, Calculator, MapPin, ShieldCheck, Package } from 'lucide-react'
import { CiMoneyBill } from 'react-icons/ci'

type CartItem = {
  id: number
  name: string
  category: string
  price: number
  quantity: number
  image: string
  unit?: string
}

type DeliveryAddress = {
  name: string
  address: string
  phone: string
}

const PaymentTab = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Portland Cement',
      category: 'Cement & Concrete',
      price: 285,
      quantity: 10,
      unit: 'bags',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200'
    },
    {
      id: 2,
      name: 'Steel Bar #4',
      category: 'Steel Materials',
      price: 450,
      quantity: 20,
      unit: 'pcs',
      image: 'https://images.unsplash.com/photo-1504917594977-af2738926b08?w=200'
    },
    {
      id: 3,
      name: 'Gravel',
      category: 'Aggregates',
      price: 85,
      quantity: 50,
      unit: 'sacks',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200'
    },
    {
      id: 4,
      name: 'Steel Wire #16',
      category: 'Wire & Binding',
      price: 120,
      quantity: 5,
      unit: 'rolls',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200'
    }
  ])

  const [deliveryAddress] = useState<DeliveryAddress>({
    name: 'Place Holder',
    address: '123 Construction Ave, Makati City',
    phone: '+63 912 345 6789'
  })

  const [selectedPayment, setSelectedPayment] = useState<string>('gcash')
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 350
  const discount = appliedCoupon ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + shipping - discount

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'BUILDER10') {
      setAppliedCoupon('BUILDER10')
      setCouponError('')
    } else if (couponCode.trim() !== '') {
      setCouponError('Invalid coupon code')
      setTimeout(() => setCouponError(''), 3000)
    }
    setCouponCode('')
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponError('')
  }

  const paymentMethods = [
    { id: 'gcash', icon: Smartphone, label: 'GCash', color: 'bg-gradient-to-br from-green-500 to-green-600', desc: 'Instant transfer' },
    { id: 'credit', icon: CreditCard, label: 'Card', color: 'bg-gradient-to-br from-blue-500 to-blue-600', desc: 'Visa/Mastercard' },
    { id: 'cod', icon: CiMoneyBill, label: 'COD', color: 'bg-gradient-to-br from-orange-500 to-orange-600', desc: 'Pay on delivery' },
    { id: 'wallet', icon: Wallet, label: 'Wallet', color: 'bg-gradient-to-br from-purple-500 to-purple-600', desc: 'Shop balance' }
  ]

  return (
    <div className='w-full h-full flex flex-col bg-[#F5F3EB]'>
      <header className='w-full h-14 bg-white flex items-center px-5 border-b border-gray-100'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 bg-linear-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20'>
            <FileText size={18} className='text-white' />
          </div>
          <div>
            <h1 className='text-base font-bold text-gray-800'>Checkout</h1>
            <p className='text-xs text-gray-400'>{cartItems.length} items</p>
          </div>
        </div>
      </header>

      <main className='flex-1 overflow-y-auto px-4 pb-56'>
        <section className='mb-4 pt-3'>
          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <Package size={14} className='text-orange-500' />
              <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Order Items</span>
            </div>
            <div className='max-h-48 overflow-y-auto'>
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`flex items-center gap-3 px-4 py-2.5 ${index < cartItems.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className='w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[10px] text-orange-600 font-medium uppercase'>{item.category}</p>
                    <p className='text-sm font-medium text-gray-800 truncate'>{item.name}</p>
                    <p className='text-xs text-gray-400'>₱{item.price} × {item.quantity} {item.unit}</p>
                  </div>
                  <p className='text-sm font-bold text-gray-700'>
                    ₱{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className='px-4 py-2 bg-gray-50 flex justify-between items-center'>
              <span className='text-xs text-gray-400'>{cartItems.reduce((s, i) => s + i.quantity, 0)} units</span>
              <span className='text-xs text-gray-400'>~250kg</span>
            </div>
          </div>
        </section>

        <section className='mb-4'>
          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <MapPin size={14} className='text-orange-500' />
              <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Delivery Address</span>
            </div>
            <div className='p-4'>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0'>
                  <MapPin size={16} className='text-orange-500' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-gray-800'>{deliveryAddress.name}</p>
                  <p className='text-xs text-gray-500 mt-0.5'>{deliveryAddress.address}</p>
                  <p className='text-xs text-gray-400 mt-1'>{deliveryAddress.phone}</p>
                </div>
                <button className='text-xs text-orange-500 font-medium'>Change</button>
              </div>
            </div>
          </div>
        </section>

        <section className='mb-4'>
          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <Truck size={14} className='text-orange-500' />
              <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Delivery Method</span>
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl'>
                <div className='w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm'>
                  <Truck size={20} className='text-orange-500' />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-semibold text-gray-800'>Earliest Delivery</p>
                  <p className='text-xs text-gray-400'>Same day - 3 days</p>
                </div>
                <span className='text-sm font-semibold text-gray-700'>₱{shipping}</span>
              </div>
            </div>
          </div>
        </section>

        <section className='mb-4'>
          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <Tag size={14} className='text-orange-500' />
              <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Coupon</span>
            </div>
            <div className='p-4'>
              {appliedCoupon ? (
                <div className='flex items-center justify-between bg-green-50 rounded-xl p-3 border border-green-100'>
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
                      <Check size={16} className='text-white' />
                    </div>
                    <div>
                      <span className='text-sm font-bold text-green-700'>{appliedCoupon}</span>
                      <p className='text-[10px] text-green-600'>-10% applied</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveCoupon} className='p-1.5 hover:bg-green-100 rounded-lg transition-colors'>
                    <X size={16} className='text-green-600' />
                  </button>
                </div>
              ) : (
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder='Enter coupon'
                    className='flex-1 px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-orange-400 bg-white'
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                    className='px-4 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-medium disabled:opacity-40'
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className='text-xs text-red-500 mt-2'>{couponError}</p>}
            </div>
          </div>
        </section>

        <section className='mb-4'>
          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <CreditCard size={14} className='text-orange-500' />
              <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Payment</span>
            </div>
            <div className='p-3 grid grid-cols-4 gap-2'>
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`relative p-3 bg-gray-50 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPayment === method.id 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${method.color} flex items-center justify-center mx-auto mb-1.5`}>
                    <method.icon size={16} className='text-white' />
                  </div>
                  <p className='text-[10px] font-medium text-gray-700 text-center'>{method.label}</p>
                  {selectedPayment === method.id && (
                    <div className='absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center'>
                      <Check size={10} className='text-white' />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='mb-4'>
          <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2'>
              <Calculator size={14} className='text-orange-500' />
              <span className='text-xs font-semibold text-gray-600 uppercase tracking-wide'>Summary</span>
            </div>
            <div className='p-4 space-y-2'>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-500'>Subtotal</span>
                <span className='text-gray-700 font-medium'>₱{subtotal.toLocaleString()}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-gray-500'>Shipping</span>
                <span className='text-gray-700 font-medium'>₱{shipping}</span>
              </div>
              {appliedCoupon && (
                <div className='flex justify-between text-sm'>
                  <span className='text-green-600'>Discount</span>
                  <span className='text-green-600 font-medium'>-₱{discount.toLocaleString()}</span>
                </div>
              )}
              <div className='flex justify-between pt-2 border-t border-gray-100'>
                <span className='text-sm font-bold text-gray-800'>Total</span>
                <span className='text-lg font-bold text-orange-600'>₱{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        <div className='flex items-center justify-center gap-2 pb-4'>
          <ShieldCheck size={14} className='text-green-500' />
          <span className='text-xs text-gray-400'>Secure checkout protected</span>
        </div>
      </main>

      <div className='absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] p-4 pb-6'>
        <button className='w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-transform'>
          <ShoppingBag size={20} />
          Pay ₱{total.toLocaleString()}
        </button>
      </div>
    </div>
  )
}

export default PaymentTab