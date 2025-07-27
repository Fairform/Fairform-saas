'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Building2, MapPin, Users, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { AuditSession, AuditResults } from '@/types'
import { useAuth } from '@/hooks/useAuth'
import Header from '../../components/Header'

interface AuditResult {
  score: number
  missingPolicies: string[]
  outdatedDocuments: string[]
  recommendations: string[]
  completedChecks: string[]
}


interface BusinessMetadata {
  businessName: string
  industry: string
  subIndustry: string
  city: string
  region: string
  orgSize: string
  abn: string
}

interface AuditResult {
  score: number
  missingPolicies: string[]
  outdatedDocuments: string[]
  recommendations: string[]
  completedChecks: string[]
}

export default function SmartAuditPage() {
  const [step, setStep] = useState<'form' | 'upload' | 'processing' | 'results'>('form')
  const [businessData, setBusinessData] = useState<BusinessMetadata>({
    businessName: '',
    industry: '',
    subIndustry: '',
    city: '',
    region: '',
    orgSize: '',
    abn: ''
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null)
  const [auditSession, setAuditSession] = useState<AuditSession | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)

  const industries = [
    { value: 'ndis', label: 'NDIS (Disability Services)', subIndustries: ['Support Coordination', 'Personal Care', 'Community Participation', 'Therapeutic Supports'] },
    { value: 'aged-care', label: 'Aged Care', subIndustries: ['Residential Care', 'Home Care', 'Community Care', 'Respite Care'] },
    { value: 'healthcare', label: 'Healthcare', subIndustries: ['General Practice', 'Allied Health', 'Mental Health', 'Specialist Services'] },
    { value: 'childcare', label: 'Childcare & Education', subIndustries: ['Early Learning', 'Family Day Care', 'Outside School Hours Care', 'Preschool'] },
    { value: 'construction', label: 'Construction', subIndustries: ['Residential Building', 'Commercial Construction', 'Civil Works', 'Trades'] }
  ]

  const orgSizes = [
    { value: 'sole-trader', label: 'Sole Trader' },
    { value: 'small', label: 'Small (1-5 employees)' },
    { value: 'medium', label: 'Medium (5-20 employees)' },
    { value: 'large', label: 'Large (20+ employees)' }
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${window.location.origin}/api/audit/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(businessData)
      })

      if (!response.ok) {
        throw new Error('Failed to start audit session')
      }

      const data = await response.json()
      setAuditSession(data.auditSession)
      setStep('upload')
    } catch (error) {
      setError('Failed to start audit session. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (files: FileList) => {
    if (!auditSession) return

    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip']
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024
    })

    setIsProcessing(true)
    
    try {
      for (const file of validFiles) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('auditSessionId', auditSession.id)
        formData.append('sessionToken', auditSession.sessionToken)

        const response = await fetch(`${window.location.origin}/api/audit/upload`, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`)
        }

        console.log(`Uploaded: ${file.name}`)
      }
      
      setUploadedFiles(prev => [...prev, ...validFiles])
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Upload failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const startAudit = async () => {
    if (uploadedFiles.length === 0 || !auditSession) return
    
    setStep('processing')
    setIsProcessing(true)

    try {
      const response = await fetch(`${window.location.origin}/api/audit/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auditSessionId: auditSession.id,
          sessionToken: auditSession.sessionToken
        })
      })

      if (!response.ok) {
        throw new Error('Failed to process audit')
      }

      const data = await response.json()
      
      setTimeout(() => {
        const mockResult: AuditResult = {
          score: data.auditSession.complianceScore || 53,
          missingPolicies: data.auditSession.auditResults?.missingPolicies || [
            'Work Health & Safety Policy',
            'Privacy & Confidentiality Policy',
            'Incident Reporting Procedures'
          ],
          outdatedDocuments: data.auditSession.auditResults?.outdatedDocuments?.map((doc: any) => 
            `${doc.fileName} (${doc.issue})`
          ) || [
            'Code of Conduct (last updated 2021)',
            'Emergency Procedures (missing COVID-19 protocols)'
          ],
          recommendations: data.auditSession.auditResults?.recommendations || [
            'Update WHS policy to include remote work guidelines',
            'Implement digital incident reporting system',
            'Add NDIS Quality Standards compliance checklist'
          ],
          completedChecks: data.auditSession.auditResults?.completedChecks || [
            'Child Protection Policy ✓',
            'Equal Opportunity Policy ✓',
            'Complaints Handling Procedure ✓'
          ]
        }
        setAuditResult(mockResult)
        setStep('results')
        setIsProcessing(false)
      }, 3000)

    } catch (error) {
      console.error('Audit processing failed:', error)
      setError('Audit processing failed. Please try again.')
      setStep('upload')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Smart Compliance Audit
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Check your compliance readiness for free. Upload your existing policy pack and get an instant audit report.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Free Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Industry Specific</span>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === 'form' ? 'text-blue-600' : step === 'upload' || step === 'processing' || step === 'results' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'form' ? 'bg-blue-100 text-blue-600' : step === 'upload' || step === 'processing' || step === 'results' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                1
              </div>
              <span className="text-sm font-medium">Business Info</span>
            </div>
            <div className="w-8 h-px bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step === 'upload' ? 'text-blue-600' : step === 'processing' || step === 'results' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'upload' ? 'bg-blue-100 text-blue-600' : step === 'processing' || step === 'results' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                2
              </div>
              <span className="text-sm font-medium">Upload Files</span>
            </div>
            <div className="w-8 h-px bg-gray-200"></div>
            <div className={`flex items-center space-x-2 ${step === 'processing' || step === 'results' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'processing' || step === 'results' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                3
              </div>
              <span className="text-sm font-medium">Get Results</span>
            </div>
          </div>
        </div>

        {/* Step 1: Business Information Form */}
        {step === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-xl p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tell us about your business</h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessData.businessName}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    required
                    value={businessData.industry}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, industry: e.target.value, subIndustry: '' }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your industry</option>
                    {industries.map(industry => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>
                </div>

                {businessData.industry && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sub-Industry
                    </label>
                    <select
                      value={businessData.subIndustry}
                      onChange={(e) => setBusinessData(prev => ({ ...prev, subIndustry: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select sub-industry (optional)</option>
                      {industries.find(i => i.value === businessData.industry)?.subIndustries.map(sub => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation Size
                  </label>
                  <select
                    value={businessData.orgSize}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, orgSize: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select organisation size</option>
                    {orgSizes.map(size => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessData.city}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g. Melbourne, Sydney"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Region
                  </label>
                  <select
                    value={businessData.region}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, region: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select state/region</option>
                    <option value="NSW">New South Wales</option>
                    <option value="VIC">Victoria</option>
                    <option value="QLD">Queensland</option>
                    <option value="WA">Western Australia</option>
                    <option value="SA">South Australia</option>
                    <option value="TAS">Tasmania</option>
                    <option value="ACT">Australian Capital Territory</option>
                    <option value="NT">Northern Territory</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ABN (Optional)
                  </label>
                  <input
                    type="text"
                    value={businessData.abn}
                    onChange={(e) => setBusinessData(prev => ({ ...prev, abn: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="11 digits (for validation)"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!businessData.businessName || !businessData.industry || !businessData.city || loading}
                  className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Starting Audit...' : 'Continue to Upload'}
                </button>
                
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 2: File Upload */}
        {step === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload your policy documents</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.zip"
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload your existing policies
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop files here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports: PDF, DOCX, ZIP files (max 50MB total)
                  </p>
                </label>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{file.name}</div>
                          <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep('form')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={startAudit}
                disabled={uploadedFiles.length === 0 || isProcessing}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Start Free Audit'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Processing */}
        {step === 'processing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-xl p-8 text-center"
          >
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analyzing your compliance pack...</h2>
            <p className="text-gray-600 mb-6">
              Our AI is reviewing your documents against industry standards and regulatory requirements.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>✓ Scanning document structure and content</div>
              <div>✓ Checking compliance with industry benchmarks</div>
              <div>✓ Identifying gaps and outdated policies</div>
              <div>⏳ Generating personalized recommendations...</div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Results */}
        {step === 'results' && auditResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl font-bold mb-4">
                  {auditResult.score}%
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your Compliance Readiness Score
                </h2>
                <p className="text-gray-600">
                  {auditResult.score >= 70 ? 'Great job! Your compliance pack is well-structured.' : 
                   auditResult.score >= 50 ? 'Good foundation, but there are areas for improvement.' :
                   'Your compliance pack needs significant updates to meet current standards.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{auditResult.missingPolicies.length}</div>
                  <div className="text-sm text-red-700">Missing Policies</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <FileText className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-600">{auditResult.outdatedDocuments.length}</div>
                  <div className="text-sm text-yellow-700">Outdated Documents</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{auditResult.completedChecks.length}</div>
                  <div className="text-sm text-green-700">Compliant Policies</div>
                </div>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Missing Policies */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  Missing Policies
                </h3>
                <div className="space-y-2">
                  {auditResult.missingPolicies.map((policy, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>{policy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outdated Documents */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 text-yellow-600 mr-2" />
                  Needs Updates
                </h3>
                <div className="space-y-2">
                  {auditResult.outdatedDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  Recommendations
                </h3>
                <div className="space-y-3">
                  {auditResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to fix these gaps?</h3>
              <p className="text-blue-100 mb-6">
                Get a fully updated compliance pack with your logo and state-based requirements.
                All missing policies included, professionally formatted.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={user ? "/pricing" : "/login?mode=signup"}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Generate Complete Pack - From $99
                </a>
                <a 
                  href="/login?mode=signup"
                  className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Create Free Account
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <span className="text-lg font-medium text-gray-900">Formative</span>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
              <a href="/help" className="hover:text-gray-900 transition-colors">
                Help
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-[10px] text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Professional Advice:</strong> Formative provides AI-generated compliance documents for informational purposes only. These documents do not constitute legal, professional, or regulatory advice. Users should always consult with qualified legal professionals, compliance specialists, or industry experts before implementing any policies or procedures.
                </p>
                <p>
                  <strong>Audit Accuracy:</strong> The Smart Compliance Audit is an automated assessment tool and may not identify all compliance gaps or requirements. Results should be verified by qualified professionals before making business decisions.
                </p>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-6">
              © 2024 Formative. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
