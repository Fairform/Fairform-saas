'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Brain, CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface IngestionLogProps {
  documentId: string
  isOpen: boolean
  onClose: () => void
}

export default function IngestionLog({ documentId, isOpen, onClose }: IngestionLogProps) {
  const [logs, setLogs] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen && documentId) {
      fetchLogs()
    }
  }, [isOpen, documentId])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/documents/logs?documentId=${documentId}`)
      if (response.ok) {
        const data = await response.json()
        setLogs(data.logs || [])
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLogIcon = (action: string, status: string) => {
    if (status === 'error') return AlertCircle
    if (status === 'complete') return CheckCircle
    if (action === 'ingest') return Brain
    return Clock
  }

  const getLogColor = (action: string, status: string) => {
    if (status === 'error') return 'text-red-600'
    if (status === 'complete') return 'text-green-600'
    if (action === 'ingest') return 'text-purple-600'
    return 'text-yellow-600'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  LLM Ingestion Log
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : logs.length === 0 ? (
                <div className="text-center py-8">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No logs yet</h3>
                  <p className="text-gray-600">
                    LLM ingestion logs will appear here once processing begins.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map((log, index) => {
                    const Icon = getLogIcon(log.action, log.status)
                    const color = getLogColor(log.action, log.status)
                    
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 capitalize">
                              {log.action.replace('_', ' ')}
                            </h4>
                            <span className="text-[10px] text-gray-500">
                              {new Date(log.created_at).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {log.message}
                          </p>
                          {log.metadata && (
                            <div className="mt-2 text-[10px] text-gray-500">
                              <pre className="whitespace-pre-wrap">
                                {JSON.stringify(log.metadata, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={fetchLogs}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Refresh Logs
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
