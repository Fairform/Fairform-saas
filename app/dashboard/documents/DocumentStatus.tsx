'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Loader, Eye } from 'lucide-react'

interface DocumentStatusProps {
  status: string
  documentId?: string
  showPolling?: boolean
}

export default function DocumentStatus({ status, documentId, showPolling = false }: DocumentStatusProps) {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [isPolling, setIsPolling] = useState(false)

  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  useEffect(() => {
    if (showPolling && documentId) {
      setIsPolling(true)
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/documents/status?documentId=${documentId}`)
          if (response.ok) {
            const data = await response.json()
            setCurrentStatus(data.status)
            
            if (['complete', 'failed'].includes(data.status)) {
              setIsPolling(false)
              clearInterval(interval)
            }
          }
        } catch (error) {
          console.error('Failed to poll status:', error)
        }
      }, 5000)

      return () => {
        clearInterval(interval)
        setIsPolling(false)
      }
    }
  }, [documentId, showPolling])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'queued':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          label: 'Queued'
        }
      case 'processing':
        return {
          icon: Loader,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          label: 'Processing',
          animate: true
        }
      case 'complete':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          label: 'Complete'
        }
      case 'failed':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          label: 'Failed'
        }
      case 'under_review':
        return {
          icon: Eye,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          label: 'Under Review'
        }
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          label: 'Uploaded'
        }
    }
  }

  const config = getStatusConfig(currentStatus)
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${config.bgColor}`}
    >
      <Icon 
        className={`w-3 h-3 mr-1 ${config.animate ? 'animate-spin' : ''}`}
      />
      {config.label}
      {isPolling && (
        <div className="w-2 h-2 bg-current rounded-full ml-1 animate-pulse" />
      )}
    </motion.div>
  )
}
