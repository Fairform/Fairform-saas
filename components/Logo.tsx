import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  showText?: boolean
}

export default function Logo({ className = '', width = 32, height = 32, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/fairform-logo.png"
        alt="FairForm"
        width={width}
        height={height}
        className="rounded-md"
      />
      {showText && (
        <span className="text-lg font-medium text-gray-900">FairForm</span>
      )}
    </div>
  )
}
