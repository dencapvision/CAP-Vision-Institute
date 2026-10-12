import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import './project-pearl-glass.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CAP Vision Admin',
  description: 'Admin CMS for CAP Vision Institute',
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" /></head>
      <body data-cap-design="pearl-glass-v1" className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        {children}
      </body>
    </html>
  )
}
