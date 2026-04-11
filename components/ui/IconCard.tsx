'use client'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface IFace {
    textStyle?: string,
    img?: string | StaticImageData,
    text?: string,
    oC?: () => void,
    w?: number,
    h?: number,
    width?: number,
    height?: number,
    styles?: string
}

const IconCard:React.FC<IFace> = ({
    textStyle,
    img,
    text,
    oC,
    w = 40,
    h = 40,
    width = 20,
    height = 23,
    styles
}) => {
  return (
    <div className={`flex flex-col rounded-lg justify-center items-center shadow-[0_0_10px_rgba(0,0,0,0.2)] ${styles}`} onClick={oC}
    style={{width: `${width * 4}px`, height: `${height * 4}px`}}>
        <div className='w-full h-[80%] rounded-t-lg flex items-center justify-center'>
            {img && (
                <Image src={img} alt="" width={w} height={h} className='object-contain select-none' unoptimized/>
            )}
        </div>
        <p className={`text-black text-sm select-none ${textStyle}`}>{text}</p>
    </div>  
  )
}

export default IconCard