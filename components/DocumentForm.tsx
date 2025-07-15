'use client'

import { useState } from 'react'

interface Agent {
  id: string
  name: string
  documents: string[]
  price: number
  estimatedTime: string
}

interface DocumentFormProps {
  agent: Agent
  onClose: () => void
}

export default function DocumentForm({ agent, onClose }: DocumentFormProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{agent.name}</h3>
      <p className="text-gray-600 mb-2">Price: {agent.price}</p>
      <p className="text-gray-600 mb-4">Estimated time: {agent.estimatedTime}</p>
      <button 
        onClick={onClose}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Close
      </button>
    </div>
  )
}
