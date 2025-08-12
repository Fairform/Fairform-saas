// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Formative - AI-Powered Compliance Policy Generator',
  description:
    'Generate audit-ready compliance policy documents in 60 seconds using AI. Built for small and medium businesses in regulated industries.',
  keywords: ['compliance', 'policy', 'NDIS', 'construction', 'childcare', 'AI', 'documents'],
  authors: [{ name: 'Formative' }],
  creator: 'Formative',
  publisher: 'Formative',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://formative.com',
    siteName: 'Formative',
    title: 'Formative - AI-Powered Compliance Policy Generator',
    description: 'Generate audit-ready compliance policy documents in 60 seconds using AI.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Formative - AI-Powered Compliance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formative - AI-Powered Compliance Policy Generator',
    description: 'Generate audit-ready compliance policy documents in 60 seconds using AI.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <AuthProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
