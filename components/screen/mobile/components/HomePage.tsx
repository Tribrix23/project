'use state'
import IconBadge from '@/components/ui/IconBadge'
import IconCard from '@/components/ui/IconCard'
import ProductCard from '@/components/ui/ProductCard'
import { BellIcon, SearchIcon } from 'lucide-react'
import { Allura } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const allura = Allura({
    subsets: ['latin'],
    weight: ['400'],
});

const HomePage = () => {
  return (
    <>
    <div className='w-full h-[16%] flex flex-col shrink-0 select-none'>
          <header className='w-full h-[50%] flex flex-row justify-between'>
              <div className='w-[50%] h-full flex flex-row items-center pl-7'>
                <Image src='/favicon.png' width={40} height={40} alt='' className='mb-1'/>
                <h1 className='font-bold text-black text-xl'>Constructo</h1>
              </div>
              <div className='flex justify-end w-[40%] h-full'>
                <IconBadge icon={BellIcon}/>
              </div>
          </header>
          <div className='w-full flex justify-center h-[45%] items-center flex-row relative'>
            <input type="text" placeholder='Search here' className='bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] w-[85%] h-[90%] rounded-full pl-15 pr-22 text-black outline-none focus:outline-none'/>
            <SearchIcon className='absolute left-12 text-black'/>
            <button type="button" className='absolute right-12 font-bold text-lg text-orange-500/90'>Search</button>
          </div>
      </div>
      <main className='w-full h-[80%] overflow-scroll pb-20'>
        <div className=' w-full h-[30%] mt-3 flex shrink-0 justify-center items-center flex-row select-none'>
          <div className='bg-gray-500/30 w-[85%] h-full rounded-2xl flex flex-col pl-5 justify-center bg-cover bg-center' style={{backgroundImage: "url('/images/cardImage/2.png')"}}>
            <p className={`${allura.className} text-white text-xl`} >Construco</p>
            <h1 className='text-black text-3xl font-bold'>Big Sale</h1>
            <h2 className='text-black text-lg '>Up to 50% off</h2>
            <button type="button" className='bg-black text-white w-30 py-1 rounded-full text-sm mt-3'>Shop Now</button>
          </div>
        </div>

        <div className=' w-full h-[20%] mt-2 gap-2 px-7 flex flex-row items-center'>
          <IconCard img='/images/hammer.png' text='Tools' styles='bg-white'/>
          <IconCard img='/images/cement.png' text='Materials' styles='bg-white'/>
          <IconCard img='/images/screw.png' text='Hardware' styles='bg-white'/>
          <IconCard img='/images/hat.png' text='Safety' styles='bg-white'/>
        </div>

        <div className='w-full h-fit mt-5  grid-cols-2 grid gap-4 px-7'>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div>
      </main>
    </>
  )
}

export default HomePage