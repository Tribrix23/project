'use state'
import IconBadge from '@/components/ui/IconBadge'
import IconCard from '@/components/ui/IconCard'
import ProductCard from '@/components/ui/ProductCard'
import { BellIcon, HeartIcon, SearchIcon } from 'lucide-react'
import { Allura } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const allura = Allura({
    subsets: ['latin'],
    weight: ['400'],
});

type SearchNumber = {
    SearchNum: (value: number) => void
};

const HomePage = ({ SearchNum } : SearchNumber) => {
  return (
    <>
    <div className='w-full h-[16%] flex flex-col shrink-0 select-none'>
          <header className='w-full h-[50%] flex flex-row justify-between px-4 bg-white'>
              <div className='h-full flex flex-row items-center'>
                <Image src='/favicon.png' width={36} height={36} alt=''/>
                <h1 className='font-bold text-black text-xl ml-2'>Constructo</h1>
              </div>
              <div className='flex items-center gap-3 pr-2'>
                <IconBadge icon={HeartIcon} size={6} w={7} badge={true} number={2} color="orange"/>
                <IconBadge icon={BellIcon} size={6} w={7} badge={true} number={3} color="red"/>
              </div>
          </header>
          <div className='w-full flex justify-center h-[45%] items-center flex-row relative px-4 bg-white'>
            <input type="text" onClick={() => SearchNum(5)} placeholder='Search products...' className='bg-gray-100 w-full h-11 rounded-full pl-11 pr-20 text-sm text-black outline-none focus:ring-2 focus:ring-orange-300'/>
            <SearchIcon className='absolute left-10 text-gray-400' size={20}/>
            <button type="button" className='absolute right-10 font-semibold text-orange-500 text-sm'>Search</button>
          </div>
      </div>
      <main className='w-full h-[80%] overflow-scroll pb-20'>
        <div className=' w-full h-[30%] mt-3 flex shrink-0 justify-center items-center flex-row select-none'>
          <div className='bg-gray-500/30 w-[85%] h-full rounded-2xl flex flex-col pl-5 justify-center bg-cover bg-center' style={{backgroundImage: "url('/images/cardImage/1.png')"}}>
            <p className={`${allura.className} text-white text-xl`} >Construco</p>
            <h1 className='text-black text-3xl font-bold'>Big Sale</h1>
            <h2 className='text-black text-lg '>Up to 50% off</h2>
            <button type="button" className='bg-orange-500 text-white w-30 py-1 rounded-full text-sm mt-3'>Shop Now</button>
          </div>
        </div>

        <div className='w-full px-4 mt-3'>
            <div className='grid grid-cols-2 gap-3'>
                <div className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white'>
                    <p className={`${allura.className} text-xl`}>New</p>
                    <h3 className='font-bold text-lg'>Arrivals</h3>
                    <button className='mt-2 bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-medium'>Shop Now</button>
                </div>
                <div className='bg-gray-900 rounded-2xl p-4 text-white'>
                    <p className={`${allura.className} text-xl`}>Flash</p>
                    <h3 className='font-bold text-lg'>Sale</h3>
                    <button className='mt-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium'>Up to 70% Off</button>
                </div>
            </div>
        </div>

        <div className=' w-full h-[20%] mt-3 gap-2 px-7 flex flex-row items-center'>
          <IconCard img='/images/hammer.png' text='Tools' styles='bg-white'/>
          <IconCard img='/images/cement.png' text='Materials' styles='bg-white'/>
          <IconCard img='/images/screw.png' text='Hardware' styles='bg-white'/>
          <IconCard img='/images/hat.png' text='Safety' styles='bg-white'/>
        </div>

        <div className='w-full h-fit mt-4 px-4'>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-lg font-bold text-gray-800'>Featured</h2>
                <button className='text-orange-500 text-sm font-medium'>See All</button>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
            </div>
        </div>
      </main>
    </>
  )
}

export default HomePage