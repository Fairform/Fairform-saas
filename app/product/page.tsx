'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/pricing')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Subscription Required</h1>
        <p className="text-gray-600 mb-6">
          We've moved to a subscription-based model. Redirecting you to our pricing plans...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  )
}
