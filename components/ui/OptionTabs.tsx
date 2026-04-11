'use client'
import React from 'react'
import { ChevronRight, LucideIcon } from 'lucide-react'
import IconBadge from './IconBadge'

interface OTabs {
    icons: LucideIcon,
    design?: string,
    size?: number,
    textDesign?: string,
    ChevronDesign?: string,
    text: string,
    borderDown?: boolean,
    badge?: boolean,
    badgeNumber?: number,
    number?: number,
    showBadge?: boolean
}

const OptionTabs:React.FC<OTabs> = ({
    icons,
    design,
    size = 9,
    textDesign,
    ChevronDesign,
    text,
    borderDown = true,
    badge = false,
    badgeNumber = 0,
    number = 0,
    showBadge = false
}) => {
  return (
    <div className='px-5 w-full h-20 flex flex-row justify-center shrink-0'>
        <div className={`w-full h-full flex flex-row gap-2 items-center relative ${borderDown ? 'border-b-2 border-[#a9c0c485]' : ''}`}>
            <IconBadge icon={icons} w={10} design={`${design}`} container='pb-1 pt-0' badge={badge} number={badgeNumber} size={size}/>
            <h1 className={`text-2xl font-bold ${textDesign}`}>{text}</h1>
            {showBadge && (
                <div className='bg-orange-500  px-3 py-1 rounded-full text-white text-sm absolute right-6'>{number}</div>
            )}
            <ChevronRight className={`absolute right-0 font-bold ${ChevronDesign}`}/>
        </div>
    </div>
  )
}

export default OptionTabs