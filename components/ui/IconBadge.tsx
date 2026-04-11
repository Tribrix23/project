'use client'
import React from 'react'
import { LucideIcon } from 'lucide-react'

interface Icons {
    design?: string
    icon: LucideIcon,
    badge?: boolean,
    number?: number,
    oC?: () => void,
    container?: string,
    name?: string,
    w?: number,
    h?: string,
    size?: number,
    text?: string
    textDesign?: string,
    color?: string
}

const IconBadge:React.FC<Icons> = ({
    design,
    icon: Icon,
    badge = false,
    number = 0,
    oC,
    container,
    name,
    w = 20,
    h = "fit",
    size = 7,
    text,
    textDesign,
    color = "orange"
}) => {
    const displayNumber = number > 99 ? "99+" : number;
  return (
    <div className={`py-3 justify-center flex flex-col items-center ${container}`} onClick={oC}
    style={{width: `${w * 4}px`, height: h}}>
        <div className='relative pr-1 pt-1'>
            <Icon className={`text-black ${design}`} style={{width: `${size * 4}px`, height: `${size * 4}px`}}/>
            {badge && (
                <span className='w-4 h-4 absolute top-0 right-0 rounded-full text-white text-[.6rem] items-center flex justify-center'
                style={{backgroundColor: `${color}`}}>
                    {number > 1 && (
                        <>
                            {displayNumber}
                        </>
                    )}
                </span>
            )}
        </div>
        {text && (
            <p className={`text-black select-none ${textDesign}`}>
                {text}
            </p>
        )}
    </div>
  )
}

export default IconBadge