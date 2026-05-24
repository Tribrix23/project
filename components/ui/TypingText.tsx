'use client'

import React from 'react'

type Segment = {
  text: string
  bold: boolean
}

type TypingTextProps = {
  text: string
  speed?: number
  className?: string
}

function parseBoldSegments(str: string): Segment[] {
  // Split on <b>... </b> and keep delimiters, then map to segments
  const parts: Segment[] = []
  const re = /<b>(.*?)<\/b>/g
  let lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(str)) !== null) {
    if (m.index > lastIndex) {
      parts.push({ text: str.slice(lastIndex, m.index), bold: false })
    }
    parts.push({ text: m[1], bold: true })
    lastIndex = re.lastIndex
  }
  if (lastIndex < str.length) {
    parts.push({ text: str.slice(lastIndex), bold: false })
  }
  return parts
}

const TypingText = ({
  text,
  speed = 20,
  className = '',
}: TypingTextProps) => {
  const segments = React.useMemo(() => parseBoldSegments(text), [text])

  // Build a flat array of (segment, charIndex) so we type everything in order
  const flatChars = React.useMemo(() => {
    let arr: ({ s: Segment; ch: string })[] = []
    segments.forEach(seg => {
      for (const ch of seg.text) {
        arr.push({ s: seg, ch })
      }
    })
    return arr
  }, [segments])

  const [typedCount, setTypedCount] = React.useState(0)

  React.useEffect(() => {
    setTypedCount(0)
    if (flatChars.length === 0) return

    let cancelled = false
    let i = 0
    const id = setInterval(() => {
      i++
      if (!cancelled) {
        setTypedCount(i)
      }
      if (i >= flatChars.length) {
        clearInterval(id)
      }
    }, speed)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [text, speed, flatChars.length])

  if (flatChars.length === 0) {
    return <span className={`whitespace-pre-wrap break-words ${className}`}> </span>
  }

  return (
    <span className={`whitespace-pre-wrap break-words ${className}`}>
      {flatChars.map((item, i) => {
        if (i > typedCount) return null
        if (i < typedCount) {
          return item.s.bold ? (
            <b key={`prev-${i}`}>{item.ch}</b>
          ) : (
            <span key={`prev-${i}`}>{item.ch}</span>
          )
        }
        // current char being typed
        return item.s.bold ? (
          <b key={`cur-${i}`}>{item.ch}</b>
        ) : (
          <span key={`cur-${i}`}>{item.ch}</span>
        )
      })}
      {typedCount < flatChars.length && (
        <span className='inline-block w-[2px] h-[1em] bg-gray-400 ml-[2px] animate-pulse align-middle' />
      )}
    </span>
  )
}

export default TypingText