/* eslint-disable camelcase */
import './globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'UHJveHk=',
    template: '%s | UHJveHk=',
  },
  description: 'Pz8/Pw==',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${jetbrainsMono.className}`}>
        {children}
        <Toaster
          richColors
          closeButton={false}
          gap={8}
          toastOptions={{
            className: 'bg-gray-800 text-gray-100 border-gray-700',
            style: {
              fontFamily: 'var(--font-geist-sans)',
            },
          }}
        />
      </body>
    </html>
  )
}
