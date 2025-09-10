'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

type ToastAction = 
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string }

function toastReducer(state: Toast[], action: ToastAction): Toast[] {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]
    case 'REMOVE_TOAST':
      return state.filter(toast => toast.id !== action.payload)
    default:
      return state
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    dispatch({ type: 'ADD_TOAST', payload: { ...toast, id } })
    
    // Auto remove after duration
    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id })
    }, toast.duration || 5000)
  }

  const removeToast = (id: string) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function ToastContainer({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast, onRemove: (id: string) => void }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-brand-blue',
  }

  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className="glass-strong p-4 rounded-2xl min-w-80 max-w-96"
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 mt-0.5 ${colors[toast.type]}`} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium text-sm">{toast.title}</p>
          {toast.description && (
            <p className="text-brand-metal text-xs mt-1">{toast.description}</p>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="text-brand-metal hover:text-white transition-colors duration-200"
          aria-label="Close notification"
          title="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  )
}

export function Toaster() {
  return null // This is handled by ToastProvider
}
