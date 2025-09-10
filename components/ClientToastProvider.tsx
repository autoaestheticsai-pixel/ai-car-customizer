'use client'

import { ToastProvider } from './ui/Toaster'

export function ClientToastProvider({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
