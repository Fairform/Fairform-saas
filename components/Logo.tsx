import React from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  showText?: boolean
}

export default function Logo({ className = '', width = 100, height = 100, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        className="flex-shrink-0"
      >
        <g>
          <path 
            d="M20 15 L20 85 L80 85 L80 35 L60 15 Z" 
            fill="white" 
            stroke="#000" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />
          
          <path 
            d="M60 15 L60 35 L80 35" 
            fill="none" 
            stroke="#000" 
            strokeWidth="2.5" 
            strokeLinejoin="round"
          />
          
          <path 
            d="M60 15 L60 35 L80 35 Z" 
            fill="#f0f0f0"
          />
          
          <rect x="28" y="42" width="24" height="2" fill="#000" rx="1"/>
          <rect x="28" y="50" width="36" height="2" fill="#000" rx="1"/>
          <rect x="28" y="58" width="20" height="2" fill="#000" rx="1"/>
          <rect x="28" y="66" width="30" height="2" fill="#000" rx="1"/>
        </g>
      </svg>
      {showText && (
        <span className="text-lg font-medium text-gray-900">Formative</span>
      )}
    </div>
  )
}
