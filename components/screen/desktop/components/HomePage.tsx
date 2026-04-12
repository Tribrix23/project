'use client'
import IconBadge from '@/components/ui/IconBadge'
import ProductCard from '@/components/ui/ProductCard'
import { BellIcon, HeartIcon, SearchIcon, ShoppingCartIcon, UserIcon, MenuIcon, ChevronDownIcon, StarIcon } from 'lucide-react'
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
  const categories = ['Tools', 'Materials', 'Hardware', 'Safety Equipment', 'Paints', 'Electrical']
  const featuredProducts = [1, 2, 3, 4, 5, 6, 7, 8]
  
  return (
    <div className='w-full h-full flex flex-col bg-gray-50'>
      <header className='bg-white border-b border-gray-200'>
        <div className='h-16 flex items-center justify-between px-8'>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-2'>
                    <Image src='/favicon.png' width={32} height={32} alt=''/>
                    <h1 className='font-bold text-2xl text-gray-900'>Constructo</h1>
                </div>
                
                <nav className='flex items-center gap-1 ml-8'>
                    {['Home', 'Shop', 'Orders', 'About'].map((item, index) => (
                        <button 
                            key={item}
                            onClick={() => item === 'Home' && setActive?.(0)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${index === 0 ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            {item}
                            {index === 0 && <ChevronDownIcon size={14}/>}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div className='flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-96'>
                <SearchIcon size={18} className='text-gray-400'/>
                <input 
                    type="text" 
                    placeholder='Search for products, brands...' 
                    className='bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400'
                />
            </div>
            
            <div className='flex items-center gap-3'>
                <button className='p-2 hover:bg-gray-100 rounded-lg relative'>
                    <HeartIcon size={20} className='text-gray-600'/>
                    <span className='absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center'>2</span>
                </button>
                <button 
                    onClick={() => setActive?.(2)}
                    className='p-2 hover:bg-gray-100 rounded-lg relative'
                >
                    <ShoppingCartIcon size={20} className='text-gray-600'/>
                    <span className='absolute top-0 right-0 w-4 h-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center'>3</span>
                </button>
                <button onClick={() => setActive?.(3)} className='flex items-center gap-2 ml-2'>
                    <div className='w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center'>
                        <UserIcon size={18} className='text-white'/>
                    </div>
                </button>
            </div>
        </div>
        
        <div className='bg-orange-500 px-8 py-2 flex items-center gap-6'>
            <button className='flex items-center gap-2 text-white text-sm font-medium'>
                <MenuIcon size={16}/>
                All Categories
            </button>
            {categories.slice(0, 5).map(cat => (
                <button key={cat} className='text-white/80 text-sm hover:text-white transition-colors'>
                    {cat}
                </button>
            ))}
        </div>
      </header>
      
      <main className='flex-1 overflow-y-auto'>
        <div className='px-8 py-6'>
            <div className='grid grid-cols-4 gap-6 mb-8'>
                <div className='col-span-3 h-80 rounded-2xl overflow-hidden relative'>
                    <div 
                        className='w-full h-full bg-cover bg-center flex items-center pl-16' 
                        style={{backgroundImage: "url('/images/cardImage/1.png')"}}
                    >
                        <div>
                            <p className={`${allura.className} text-white text-3xl`}>Construco</p>
                            <h1 className='text-5xl font-bold text-gray-900 mt-1'>Big Sale</h1>
                            <h2 className='text-2xl text-gray-700'>Up to 50% off</h2>
                            <button className='mt-6 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors'>
                                Shop Now
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className='col-span-1 flex flex-col gap-4'>
                    <div className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white'>
                        <p className={`${allura.className} text-2xl`}>New Arrivals</p>
                        <p className='text-lg mt-2'>Check out the latest tools</p>
                        <button className='mt-4 bg-white text-orange-600 px-4 py-2 rounded-lg font-medium text-sm'>
                            View All
                        </button>
                    </div>
                    <div className='bg-white rounded-2xl p-6 border border-gray-200'>
                        <div className='flex items-center gap-2 mb-3'>
                            <StarIcon size={18} className='text-yellow-400 fill-yellow-400'/>
                            <span className='font-semibold text-gray-800'>Top Rated</span>
                        </div>
                        <div className='space-y-3'>
                            {[1, 2, 3].map(i => (
                                <div key={i} className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-gray-100 rounded-lg'/>
                                    <div>
                                        <p className='text-sm font-medium text-gray-700'>Product {i}</p>
                                        <p className='text-xs text-gray-500'>$99.99</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold text-gray-900'>Shop by Category</h2>
                    <button className='text-orange-600 text-sm font-medium hover:underline'>View All</button>
                </div>
                <div className='grid grid-cols-6 gap-4'>
                    {categories.map((cat, i) => (
                        <div key={cat} className='bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all cursor-pointer'>
                            <div className='w-14 h-14 bg-gray-100 rounded-xl mb-3 flex items-center justify-center'>
                                <Image src={`/images/${['hammer', 'cement', 'screw', 'hat', 'cement', 'screw'][i]}.png`} width={40} height={40} alt=''/>
                            </div>
                            <p className='text-sm font-medium text-gray-700 text-center'>{cat}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='mb-8'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold text-gray-900'>Featured Products</h2>
                    <button className='text-orange-600 text-sm font-medium hover:underline'>View All</button>
                </div>
                <div className='grid grid-cols-4 gap-6'>
                    {featuredProducts.map(i => (
                        <div key={i} className='bg-white rounded-xl border border-gray-200 hover:shadow-xl transition-all cursor-pointer group'>
                            <div className='h-48 bg-gray-100 rounded-t-xl relative overflow-hidden'>
                                <button className='absolute top-3 left-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <HeartIcon size={16} className='text-gray-400'/>
                                </button>
                            </div>
                            <div className='p-4'>
                                <p className='text-sm text-gray-500'>Category</p>
                                <p className='font-semibold text-gray-800 mt-1'>Professional Tool Set {i}</p>
                                <div className='flex items-center gap-1 mt-2'>
                                    {[1,2,3,4,5].map(s => (
                                        <StarIcon key={s} size={12} className='text-yellow-400 fill-yellow-400'/>
                                    ))}
                                    <span className='text-xs text-gray-500 ml-1'>({i*12})</span>
                                </div>
                                <p className='text-lg font-bold text-orange-600 mt-2'>${99 + i * 10}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className='grid grid-cols-2 gap-6 mb-8'>
                <div className='bg-gray-900 rounded-2xl p-8 flex items-center justify-between'>
                    <div>
                        <p className={`${allura.className} text-orange-500 text-2xl`}>Flash Sale</p>
                        <h3 className='text-3xl font-bold text-white mt-2'>Up to 70% Off</h3>
                        <p className='text-gray-400 mt-2'>Limited time offers</p>
                        <button className='mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-medium'>
                            Shop Now
                        </button>
                    </div>
                    <div className='text-right'>
                        <div className='text-5xl font-bold text-white'>03:45:22</div>
                        <p className='text-gray-400 text-sm'>Remaining time</p>
                    </div>
                </div>
                <div className='bg-orange-500 rounded-2xl p-8 flex items-center justify-between'>
                    <div>
                        <p className='text-white/80 text-lg'>Become a Seller</p>
                        <h3 className='text-3xl font-bold text-white mt-2'>Sell on Constructo</h3>
                        <p className='text-white/80 mt-2'>Grow your business</p>
                        <button className='mt-4 bg-white text-orange-600 px-6 py-2 rounded-lg font-medium'>
                            Register Now
                        </button>
                    </div>
                    <div className='w-24 h-24 bg-white/20 rounded-full flex items-center justify-center'>
                        <ShoppingCartIcon size={40} className='text-white'/>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage