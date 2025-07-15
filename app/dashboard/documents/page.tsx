'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import DocumentTable from './DocumentTable'
import UploadZone from './UploadZone'
import DocumentStatus from './DocumentStatus'
import IngestionLog from './IngestionLog'
import { FileText, Upload, Brain, Activity } from 'lucide-react'

export default function DocumentDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showIngestionLog, setShowIngestionLog] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    uploaded: 0,
    processing: 0,
    complete: 0
  })

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user || null)
      setLoading(false)
      
      if (!session) {
        router.push('/login')
      }
    }
    
    getSession()
  }, [router])

  const fetchDocuments = async () => {
    if (!session) return
    
    try {
      const response = await fetch('/api/documents', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const docs = data.documents || []
        setDocuments(docs)
        
        const stats = docs.reduce((acc: any, doc: any) => {
          acc.total++
          if (doc.source === 'uploaded') {
            acc.uploaded++
            if (doc.status === 'processing') acc.processing++
            if (doc.status === 'complete') acc.complete++
          } else {
            acc.complete++
          }
          return acc
        }, { total: 0, uploaded: 0, processing: 0, complete: 0 })
        
        setStats(stats)
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error)
    } finally {
      setLoadingDocs(false)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [session])

  const handleUploadComplete = (files: any[]) => {
    fetchDocuments()
  }

  const handleUploadStart = () => {
    setLoadingDocs(true)
  }

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc)
    if (doc.source === 'uploaded') {
      setShowIngestionLog(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Manage your documents, track processing status, and view LLM ingestion logs
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-4 gap-4"
              >
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Total</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <Upload className="w-8 h-8 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Uploaded</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.uploaded}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-orange-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Processing</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <Brain className="w-8 h-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Complete</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.complete}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <UploadZone 
                onUploadComplete={handleUploadComplete}
                onUploadStart={handleUploadStart}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DocumentTable
                documents={documents}
                loading={loadingDocs}
                onRefresh={fetchDocuments}
                onDocumentSelect={handleDocumentSelect}
              />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={fetchDocuments}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Refresh Documents
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Back to Dashboard
                </button>
              </div>
            </motion.div>

            {selectedDocument && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-sm text-gray-900">{selectedDocument.file_name || selectedDocument.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="text-sm text-gray-900">{selectedDocument.document_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <DocumentStatus status={selectedDocument.status || 'complete'} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created</p>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedDocument.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedDocument.source === 'uploaded' && (
                    <button
                      onClick={() => setShowIngestionLog(true)}
                      className="w-full mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
                    >
                      View LLM Logs
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {selectedDocument && showIngestionLog && (
        <IngestionLog
          documentId={selectedDocument.id}
          isOpen={showIngestionLog}
          onClose={() => setShowIngestionLog(false)}
        />
      )}
    </div>
  )
}
