'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, X, CheckCircle, AlertCircle, Brain } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface UploadZoneProps {
  onUploadComplete: (files: any[]) => void
  onUploadStart: () => void
}

interface FileUpload {
  file: File
  id: string
  progress: number
  status: 'uploading' | 'success' | 'error'
  name: string
  size: number
  result?: any
}

export default function UploadZone({ onUploadComplete, onUploadStart }: UploadZoneProps) {
  const [uploadingFiles, setUploadingFiles] = useState<FileUpload[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    await processFiles(files)
  }, [])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    await processFiles(files)
  }, [])

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ]
      const maxSize = 10 * 1024 * 1024
      return validTypes.includes(file.type) && file.size <= maxSize
    })

    if (validFiles.length === 0) {
      alert('Please select valid files (.docx, .pdf, .xlsx) under 10MB')
      return
    }

    onUploadStart()
    
    const fileUploads: FileUpload[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading' as const,
      name: file.name,
      size: file.size
    }))

    setUploadingFiles(fileUploads)

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      alert('Please log in to upload files')
      return
    }

    for (const fileUpload of fileUploads) {
      try {
        const formData = new FormData()
        formData.append('file', fileUpload.file)
        formData.append('document_type', 'uploaded_document')
        formData.append('industry', 'general')

        setUploadingFiles(prev => 
          prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, progress: 50 }
              : f
          )
        )

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          },
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          
          setUploadingFiles(prev => 
            prev.map(f => 
              f.id === fileUpload.id 
                ? { ...f, status: 'success', progress: 100, result }
                : f
            )
          )

          try {
            await fetch('/api/pocketbook/ingest', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
              },
              body: JSON.stringify({
                documentId: result.document.id,
                filePath: result.filePath,
                userId: result.document.user_id
              })
            })
          } catch (ingestError) {
            console.error('LLM ingestion failed:', ingestError)
          }

          setUploadedFiles(prev => [...prev, { ...fileUpload, result }])
        } else {
          throw new Error('Upload failed')
        }
      } catch (error) {
        console.error('Upload error:', error)
        setUploadingFiles(prev => 
          prev.map(f => 
            f.id === fileUpload.id 
              ? { ...f, status: 'error', progress: 0 }
              : f
          )
        )
      }
    }

    setTimeout(() => {
      setUploadingFiles([])
      onUploadComplete(uploadedFiles)
    }, 2000)
  }

  const removeFile = (id: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== id))
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
      >
        <input
          type="file"
          multiple
          accept=".docx,.pdf,.xlsx"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop files here' : 'Upload Documents'}
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports: .docx, .pdf, .xlsx (max 10MB each)
          </p>
        </label>
      </div>

      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <h4 className="text-sm font-medium text-gray-900">Uploading Files</h4>
            {uploadingFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                    <div className="flex items-center space-x-2">
                      {file.status === 'uploading' && (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      )}
                      {file.status === 'success' && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <Brain className="w-4 h-4 text-purple-600" />
                        </div>
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  {file.status === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div 
                        className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  {file.status === 'success' && (
                    <div className="text-xs text-green-600 mt-1">
                      ✓ Uploaded and sent to LLM for analysis
                    </div>
                  )}
                  {file.status === 'error' && (
                    <div className="text-xs text-red-600 mt-1">
                      ✗ Upload failed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
