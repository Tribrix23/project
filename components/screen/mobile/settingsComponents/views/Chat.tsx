'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Bot, User, ShoppingBag, Barcode, ShoppingCart, CircleDollarSign, Truck, RotateCcw } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import TypingText from '@/components/ui/TypingText'

type Message = {
  role: 'user' | 'bot'
  content: string
  loading?: boolean
  isTyping?: boolean
}

const QUICK_REPLIES = [
  { label: 'Products', icon: ShoppingBag, text: 'What products do you sell?' },
  { label: 'How to order', icon: ShoppingCart, text: 'How do I place an order?' },
  { label: 'Payment methods', icon: CircleDollarSign, text: 'What payment methods do you accept?' },
  { label: 'Shipping', icon: Truck, text: 'How does delivery work?' },
  { label: 'Return policy', icon: RotateCcw, text: 'What is the return policy?' },
  { label: 'Tracking', icon: Barcode, text: 'How can I track my order?' },
]

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content: 'Hi! I\'m Quant, your AI-powered construction support. How can I help you today? 👋',
      isTyping: true,
    },
  ])

  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)

  const sendingRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto focus
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim()
    if (!msg || sendingRef.current) return

    sendingRef.current = true
    setSending(true)
    setShowQuickReplies(false)

    const userMsg: Message = {
      role: 'user',
      content: msg,
    }

    const loadingMsg: Message = {
      role: 'bot',
      content: '',
      loading: true,
    }

    setMessages(prev => [...prev, userMsg, loadingMsg])
    if (!text) setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: msg }),
      })

      const data = await res.json()

      let reply = ''

      if (!res.ok || data.error) {
        reply = data.isQuotaExceeded
          ? '⚠️ The AI assistant has reached its usage limit. Please upgrade the Gemini API plan.'
          : data.error || 'Something went wrong. Please try again.'
      } else {
        reply = data.reply || 'Sorry, I could not generate a response.'
      }

      setMessages(prev => {
        const updated = [...prev]

        updated[updated.length - 1] = {
          role: 'bot',
          content: reply,
          isTyping: true,
        }

        return updated
      })
    } catch {
      setMessages(prev => {
        const updated = [...prev]

        updated[updated.length - 1] = {
          role: 'bot',
          content: 'Connection error. Please check your internet.',
          isTyping: true,
        }

        return updated
      })
    } finally {
      sendingRef.current = false
      setSending(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-100 shadow-sm flex items-center px-4 shrink-0">
        <button
          onClick={() => history.back()}
          className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>

        <div className="flex items-center gap-3 ml-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20">
            <Bot size={18} className="text-white" />
          </div>

          <div>
            <h1 className="text-sm font-bold text-gray-800">
              Quant
            </h1>
            <p className="text-[11px] text-green-500 font-medium">
              ● Online
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 items-end ${
              msg.role === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            {/* Bot Avatar */}
            {msg.role === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={15} className="text-white" />
              </div>
            )}

            {/* Bubble */}
            <div
              className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-md shadow-md shadow-orange-500/15'
                  : 'bg-white text-gray-800 rounded-bl-md border border-gray-100 shadow-sm'
              }`}
            >
              {msg.loading ? (
                <div className="flex items-center gap-1 py-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.3s]" />
                </div>
              ) : msg.role === 'bot' ? (
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-pre:bg-gray-900 prose-pre:text-white prose-code:text-orange-500">
                  <TypingText
                    text={msg.content}
                    speed={15}
                  />
                </div>
              ) : (
                <div className="prose prose-sm max-w-none prose-p:my-1">
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <User size={14} className="text-gray-500" />
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </main>

      {/* Quick Replies — pill bar, horizontally scrollable, above input */}
      {showQuickReplies && (
        <div className="shrink-0 px-4 py-2.5 bg-white border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Suggested</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5 -mx-4 px-4">
            {QUICK_REPLIES.map((q) => {
              const Icon = q.icon
              return (
                <button
                  key={q.label}
                  onClick={() => sendMessage(q.text)}
                  disabled={sending}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-full whitespace-nowrap hover:border-orange-300 hover:bg-orange-50 active:scale-95 transition-all text-left shrink-0 disabled:opacity-40"
                >
                  <Icon size={13} className="text-orange-500" />
                  <span className="text-xs font-medium text-gray-600 leading-none">
                    {q.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 bg-white px-3 pt-2 pb-5 shrink-0">
        <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-3 py-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Quant anything..."
            disabled={sending}
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
          />

          <button
            onClick={() => sendMessage() }
            disabled={!input.trim() || sending}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 transition active:scale-95 disabled:opacity-40 disabled:shadow-none"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat