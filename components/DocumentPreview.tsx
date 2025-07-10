import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Eye, X, CheckCircle, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

interface DocumentPreviewProps {
  document: {
    id: string
    title: string
    type: string
    size: string
    content?: string
    preview?: string
    createdAt: string
    author?: string
  } | null
  isOpen: boolean
  onClose: () => void
  onDownload: () => void
}

export default function DocumentPreview({ document, isOpen, onClose, onDownload }: DocumentPreviewProps) {
  if (!document) return null
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[5%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl bg-surface-card border border-border-subtle rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-lg" />
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{document.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {document.type}
                    </span>
                    <span>{document.size}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(document.createdAt)}
                    </span>
                    {document.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {document.author}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-surface-elevated transition-colors"
              >
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-surface-dark rounded-lg p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-4 text-success">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">AI Generated • Compliant with latest regulations</span>
                  </div>
                  
                  {document.content ? (
                    <div className="prose prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: document.content }} />
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-text-secondary">
                      {document.preview || 'No preview available'}
                    </pre>
                  )}
                </motion.div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border-subtle">
              <div className="flex items-center gap-4">
                <Button variant="secondary" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Full Screen
                </Button>
              </div>
              
              <div className="flex gap-3">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={onDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}