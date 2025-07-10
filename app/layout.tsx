import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'FairForm - AI-Powered Compliance Documents',
  description: 'Generate professional compliance documents in minutes with AI. NDIS, Healthcare, Construction, and 15+ industries supported.',
  keywords: 'compliance, documents, AI, NDIS, healthcare, policy generator',
  authors: [{ name: 'FairForm' }],
  openGraph: {
    title: 'FairForm - AI-Powered Compliance Documents',
    description: 'Generate professional compliance documents in minutes with AI',
    url: 'https://fairform.ai',
    siteName: 'FairForm',
    images: [
      {
        url: 'https://fairform.ai/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FairForm - AI-Powered Compliance Documents',
    description: 'Generate professional compliance documents in minutes with AI',
    images: ['https://fairform.ai/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-surface-dark text-text-primary antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}