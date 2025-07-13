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
    
      {agent.name}
      Price: ${agent.price}
      Estimated time: {agent.estimatedTime}
      
        Close
      
    
  )
}
