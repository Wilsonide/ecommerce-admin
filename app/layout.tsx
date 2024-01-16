import AuthProvider from '@/components/sessionProvider'
import type { Metadata } from 'next'
import { auth } from '@/auth'

import { Inter } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/providers/toast.provider'
import { ModalProvider } from '@/providers/modalProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Admin Dashboard',
  description: 'Admin Dashboard',
}

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider/>
          <ModalProvider/>
          {children}
          </body>
      </html>
    </AuthProvider>

  
    
  )
}
