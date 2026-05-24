'use client'

import React from 'react'

type TypingTextProps = {
  text: string
  speed?: number
  className?: string
}

const TypingText = ({
  text,
  speed = 20,
  className = '',
}: TypingTextProps) => {
  const [displayedText, setDisplayedText] =
    React.useState('')

  React.useEffect(() => {
    let currentIndex = 0

    setDisplayedText('')

    const interval = setInterval(() => {
      currentIndex++

      setDisplayedText(
        text.slice(0, currentIndex)
      )

      if (currentIndex >= text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span
      className={`whitespace-pre-wrap break-words ${className}`}
    >
      {displayedText}

      {displayedText.length < text.length && (
        <span className='inline-block w-[2px] h-[1em] bg-gray-400 ml-[2px] animate-pulse align-middle' />
      )}
    </span>
  )
}

export default TypingText