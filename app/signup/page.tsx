'use client'

import React, { useEffect } from 'react'

export default function SignupPage() {
  useEffect(() => {
    window.location.href = '/login?mode=signup'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">Redirecting to signup...</div>
    </div>
  )
}
