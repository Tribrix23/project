'use client'
import { HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon, ChevronDownIcon, StarIcon, ArrowRightIcon } from 'lucide-react'
import { Allura } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const allura = Allura({
    subsets: ['latin'],
    weight: ['400'],
});

interface HomePageProps {
    active?: number
    setActive?: (index: number) => void
}

const HomePage: React.FC<HomePageProps> = ({ active = 0, setActive }) => {
  const categories = [
    { name: 'Tools', icon: '🔨' },
    { name: 'Materials', icon: '🧱' },
    { name: 'Hardware', icon: '🔩' },
    { name: 'Safety', icon: '🦺' },
    { name: 'Paints', icon: '🎨' },
    { name: 'Electrical', icon: '⚡' }
  ]
  const products = [
    { id: 1, name: 'Professional Drill Set', category: 'Tools', price: 149.99, rating: 4.8, reviews: 124, image: '/images/hammer.png' },
    { id: 2, name: 'Premium Hammer', category: 'Tools', price: 89.99, rating: 4.6, reviews: 89, image: '/images/hammer.png' },
    { id: 3, name: 'Industrial Wrench Set', category: 'Hardware', price: 199.99, rating: 4.9, reviews: 256, image: '/images/hammer.png' },
    { id: 4, name: 'Safety Helmet Pro', category: 'Safety', price: 59.99, rating: 4.5, reviews: 67, image: '/images/hat.png' },
    { id: 5, name: 'Premium Paint Kit', category: 'Paints', price: 129.99, rating: 4.7, reviews: 198, image: '/images/cement.png' },
    { id: 6, name: 'Electric Drill 18V', category: 'Tools', price: 179.99, rating: 4.8, reviews: 312, image: '/images/hammer.png' },
    { id: 7, name: 'Screwdriver Set', category: 'Tools', price: 49.99, rating: 4.4, reviews: 156, image: '/images/screw.png' },
    { id: 8, name: 'Construction Cement', category: 'Materials', price: 34.99, rating: 4.6, reviews: 89, image: '/images/cement.png' },
  ]
  
  const topRated = [
    { name: 'Power Saw Pro', price: 299.99 },
    { name: 'Measuring Tool', price: 79.99 },
    { name: 'Safety Kit', price: 59.99 },
  ]

  return (
    <div className='w-full h-full flex flex-col bg-[#f6f3e7]'>
      <header className='bg-white shadow-sm'>
        <div className='h-20 flex items-center justify-between px-8 border-b border-gray-100'>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 relative'>
                        <Image src='/favicon.png' fill alt='' className='object-contain'/>
                    </div>
                    <div>
                        <h1 className='font-bold text-2xl text-gray-900 tracking-tight'>Constructo</h1>
                        <p className='text-[10px] text-gray-400 uppercase tracking-widest'>Building Solutions</p>
                    </div>
                </div>
                
                <nav className='flex items-center gap-1'>
                    {[
                        { name: 'Home', active: true },
                        { name: 'Shop', active: false },
                        { name: 'Orders', active: false },
                        { name: 'About', active: false }
                    ].map((item, index) => (
                        <button 
                            key={item.name}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                                item.active 
                                ? 'bg-[#f6f3e7] text-gray-900' 
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            {item.name}
                            {item.active && <ChevronDownIcon size={14}/>}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className='flex items-center gap-3 bg-[#f6f3e7] rounded-2xl px-5 py-3 w-105'>
                <SearchIcon size={20} className='text-gray-400'/>
                <input 
                    type="text" 
                    placeholder='Search tools, materials, equipment...' 
                    className='bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400'
                />
            </div>
            
            <div className='flex items-center gap-4'>
                <button className='p-3 hover:bg-[#f6f3e7] rounded-xl relative transition-all group'>
                    <HeartIcon size={22} className='text-gray-600 group-hover:text-orange-600'/>
                    <span className='absolute top-1 right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center'>2</span>
                </button>
                <button className='p-3 hover:bg-[#f6f3e7] rounded-xl relative transition-all group'>
                    <ShoppingCartIcon size={22} className='text-gray-600 group-hover:text-orange-600'/>
                    <span className='absolute top-1 right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center'>3</span>
                </button>
                <button className='flex items-center gap-3 ml-2 p-1 pr-4 rounded-full bg-[#f6f3e7] hover:bg-orange-100 transition-all'>
                    <div className='w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-md'>
                        <UserIcon size={18} className='text-white'/>
                    </div>
                    <span className='text-sm font-medium text-gray-700'>Account</span>
                </button>
            </div>
        </div>
        
        <div className='bg-gray-900 px-8 py-3.5 flex items-center gap-8'>
            <button className='flex items-center gap-2.5 text-white text-sm font-medium bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors'>
                <MenuIcon size={16}/>
                All Categories
            </button>
            <div className='flex items-center gap-6'>
                {['Tools', 'Materials', 'Hardware', 'Safety Equipment', 'Paints & Coatings', 'Electrical'].map(cat => (
                    <button key={cat} className='text-white/70 text-sm hover:text-white transition-colors font-medium'>
                        {cat}
                    </button>
                ))}
            </div>
            <div className='ml-auto flex items-center gap-2 text-white/60 text-sm'>
                <span>Need help?</span>
                <span className='text-white font-medium'>+1 234 567 890</span>
            </div>
        </div>
      </header>
      
      <main className='flex-1 overflow-y-auto'>
        <div className='px-8 py-8'>
            <div className='grid grid-cols-12 gap-6 mb-8'>
                <div className='col-span-9 h-105 rounded-3xl overflow-hidden relative group'>
                    <div 
                        className='w-full h-full bg-cover bg-center relative' 
                        style={{backgroundImage: "url('/images/cardImage/1.png')"}}
                    >
                        <div className='absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent'/>
                        <div className='absolute inset-0 flex items-center pl-16'>
                            <div className='max-w-xl'>
                                <span className={`${allura.className} text-white/90 text-2xl`}>Welcome to</span>
                                <h1 className='text-6xl font-bold text-white mt-1 leading-tight'>Construco</h1>
                                <h2 className='text-3xl text-orange-400 font-semibold mt-3'>Big Sale Up to 50% Off</h2>
                                <p className='text-white/80 mt-4 text-lg'>Premium construction tools and materials at unbeatable prices</p>
                                <button className='mt-8 bg-orange-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-orange-600 hover:scale-105 transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2'>
                                    Shop Now <ArrowRightIcon size={18}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='col-span-3 flex flex-col gap-5'>
                    <div className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white flex-1'>
                        <p className={`${allura.className} text-3xl`}>New Arrivals</p>
                        <p className='text-lg mt-3 font-medium'>Discover the latest tools for your projects</p>
                        <button className='mt-6 bg-white/20 backdrop-blur text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-white/30 transition-colors flex items-center gap-2'>
                            View All <ArrowRightIcon size={16}/>
                        </button>
                        <div className='mt-6 flex gap-2'>
                            {[1,2,3].map(i => (
                                <div key={i} className='w-12 h-12 bg-white/20 rounded-lg'/>
                            ))}
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex-1'>
                        <div className='flex items-center gap-2 mb-4'>
                            <StarIcon size={20} className='text-yellow-400 fill-yellow-400'/>
                            <span className='font-bold text-gray-800'>Top Rated</span>
                        </div>
                        <div className='space-y-4'>
                            {topRated.map((item, i) => (
                                <div key={i} className='flex items-center gap-3 p-2 rounded-xl hover:bg-[#f6f3e7] transition-colors cursor-pointer'>
                                    <div className='w-12 h-12 bg-gray-100 rounded-xl'/>
                                    <div className='flex-1'>
                                        <p className='text-sm font-semibold text-gray-800'>{item.name}</p>
                                        <p className='text-sm text-orange-600 font-bold'>${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='mb-10'>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>Shop by Category</h2>
                        <p className='text-gray-500 mt-1'>Browse our extensive collection</p>
                    </div>
                    <button className='text-orange-600 text-sm font-semibold hover:underline flex items-center gap-1'>View All Categories <ArrowRightIcon size={16}/></button>
                </div>
                <div className='grid grid-cols-6 gap-4'>
                    {categories.map((cat, i) => (
                        <div key={cat.name} className='bg-white rounded-2xl p-5 border border-gray-100 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group text-center'>
                            <div className='w-16 h-16 bg-[#f6f3e7] rounded-2xl mb-4 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform'>
                                {cat.icon}
                            </div>
                            <p className='text-sm font-semibold text-gray-800'>{cat.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='mb-10'>
                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h2 className='text-3xl font-bold text-gray-900'>Featured Products</h2>
                        <p className='text-gray-500 mt-1'>Handpicked favorites from our collection</p>
                    </div>
                    <button className='text-orange-600 text-sm font-semibold hover:underline flex items-center gap-1'>View All Products <ArrowRightIcon size={16}/></button>
                </div>
                <div className='grid grid-cols-4 gap-6'>
                    {products.map(product => (
                        <div key={product.id} className='bg-white rounded-2xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group overflow-hidden'>
                            <div className='h-56 bg-linear-to-b from-gray-50 to-gray-100 relative'>
                                <span className='absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full'>Sale</span>
                                <button className='absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-50'>
                                    <HeartIcon size={18} className='text-gray-400 hover:text-orange-500'/>
                                </button>
                                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform'>
                                    <div className='w-20 h-20 bg-gray-100 rounded-full'/>
                                </div>
                            </div>
                            <div className='p-5'>
                                <p className='text-xs text-gray-500 font-medium'>{product.category}</p>
                                <p className='font-bold text-gray-900 mt-1 text-lg line-clamp-1'>{product.name}</p>
                                <div className='flex items-center gap-2 mt-3'>
                                    <div className='flex items-center gap-0.5'>
                                        {[1,2,3,4,5].map(s => (
                                            <StarIcon key={s} size={14} className={s <= Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}/>
                                        ))}
                                    </div>
                                    <span className='text-xs text-gray-500'>({product.reviews})</span>
                                </div>
                                <div className='flex items-center justify-between mt-4'>
                                    <p className='text-xl font-bold text-orange-600'>${product.price}</p>
                                    <button className='bg-[#f6f3e7] p-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-all'>
                                        <ShoppingCartIcon size={18}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='grid grid-cols-2 gap-6 mb-10'>
                <div className='bg-gray-900 rounded-3xl p-10 flex items-center justify-between overflow-hidden relative'>
                    <div className='absolute right-0 top-0 w-64 h-full bg-linear-to-l from-orange-500/20 to-transparent'/>
                    <div className='relative z-10'>
                        <span className={`${allura.className} text-orange-500 text-3xl`}>Flash Sale</span>
                        <h3 className='text-4xl font-bold text-white mt-3'>Up to 70% Off</h3>
                        <p className='text-gray-400 mt-3 text-lg'>Limited time offers on selected items</p>
                        <div className='flex items-center gap-3 mt-6'>
                            {['03', '45', '22'].map((t, i) => (
                                <div key={i} className='bg-white/10 backdrop-blur px-4 py-2 rounded-xl'>
                                    <span className='text-2xl font-bold text-white'>{t}</span>
                                </div>
                            ))}
                        </div>
                        <button className='mt-8 bg-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all'>
                            Shop Now
                        </button>
                    </div>
                    <div className='relative z-10 text-right'>
                        <div className='text-7xl font-bold text-white/10'>70%</div>
                        <div className='text-orange-500 font-bold text-lg mt-2'>OFF</div>
                    </div>
                </div>
                <div className='bg-linear-to-br from-orange-500 to-orange-600 rounded-3xl p-10 flex items-center justify-between overflow-hidden relative'>
                    <div className='absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full'/>
                    <div className='relative z-10'>
                        <p className='text-white/80 text-xl font-medium'>Become a Seller</p>
                        <h3 className='text-4xl font-bold text-white mt-3'>Sell on Constructo</h3>
                        <p className='text-white/80 mt-3 text-lg'>Grow your business with us</p>
                        <button className='mt-8 bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2'>
                            Register Now <ArrowRightIcon size={18}/>
                        </button>
                    </div>
                    <div className='relative z-10'>
                        <div className='w-32 h-32 bg-white/20 rounded-full flex items-center justify-center'>
                            <div className='w-24 h-24 bg-white/10 rounded-full flex items-center justify-center'>
                                <ShoppingCartIcon size={48} className='text-white'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-3xl p-8 border border-gray-100 mb-10'>
                <div className='grid grid-cols-4 gap-8'>
                    {[
                        { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $100' },
                        { icon: '🛡️', title: 'Secure Payment', desc: '100% protected transactions' },
                        { icon: '🔄', title: 'Easy Returns', desc: '30-day return policy' },
                        { icon: '💬', title: '24/7 Support', desc: 'Dedicated customer care' },
                    ].map((item, i) => (
                        <div key={i} className='flex items-center gap-4'>
                            <div className='w-14 h-14 bg-[#f6f3e7] rounded-2xl flex items-center justify-center text-2xl'>
                                {item.icon}
                            </div>
                            <div>
                                <p className='font-bold text-gray-900'>{item.title}</p>
                                <p className='text-sm text-gray-500'>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage