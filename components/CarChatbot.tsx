'use client'

import { FormEvent, useMemo, useState } from 'react'
import { MessageCircle, Send, X } from 'lucide-react'

type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const SYSTEM_MESSAGE: ChatMessage = {
  role: 'system',
  content: `You are an expert automotive assistant.
You remember the conversation and maintain context.
You specialize in cars, modifications, performance, pricing, troubleshooting, and recommendations.
Always answer concisely and contextually.`,
}

const MAX_MESSAGES = 15

function trimConversation(messages: ChatMessage[]): ChatMessage[] {
  const firstSystem = messages.find((msg) => msg.role === 'system') ?? SYSTEM_MESSAGE
  const nonSystemMessages = messages.filter((msg) => msg.role !== 'system')
  const recentNonSystem = nonSystemMessages.slice(-(MAX_MESSAGES - 1))

  return [firstSystem, ...recentNonSystem]
}

export default function CarChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([SYSTEM_MESSAGE])

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading])

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userMessage = input.trim()
    if (!userMessage || isLoading) return

    const updatedMessages = trimConversation([...messages, { role: 'user', content: userMessage }])
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data?.error || 'Something went wrong. Please try again.' },
        ])
        return
      }

      if (Array.isArray(data?.messages)) {
        const normalizedMessages = data.messages
          .filter((msg: ChatMessage) => msg?.content && typeof msg.content === 'string')
          .map((msg: ChatMessage) => ({
            role: msg.role,
            content: msg.content,
          })) as ChatMessage[]
        setMessages(trimConversation(normalizedMessages))
      } else {
        setMessages((prev) => trimConversation([...prev, { role: 'assistant', content: data.reply }]))
      }
    } catch (error) {
      console.error('Chatbot client error:', error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Network error. Please check your connection and try again.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[22rem] sm:w-96 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <p className="text-white font-semibold">Car Assistant</p>
              <p className="text-xs text-slate-300">Ask anything about cars</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="Close chatbot"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto px-3 py-4 space-y-3 bg-gradient-to-b from-slate-950/20 to-black/20">
            {messages
              .filter((message) => message.role !== 'system')
              .map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-brand-blue text-white rounded-br-md'
                      : 'bg-white/10 text-slate-100 rounded-bl-md'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md px-3 py-2 text-sm bg-white/10 text-slate-100">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 border-t border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cars, mods, or pricing..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/60"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="inline-flex items-center justify-center rounded-xl bg-brand-blue p-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-blueGlow transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-3 text-white shadow-lg hover:bg-brand-blueGlow transition-colors"
        >
          <MessageCircle size={18} />
          <span className="text-sm font-medium">Car Chat</span>
        </button>
      )}
    </div>
  )
}
