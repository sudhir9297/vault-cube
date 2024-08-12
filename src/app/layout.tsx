import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import ConvexClientProvider from './ConvexClientProvider'
import { Header } from '../components/header'
import { Toaster } from '@/components/ui/toaster'

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
})

export const metadata: Metadata = {
  title: 'VaultCube',
  description: 'File Storage application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <Header />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  )
}
