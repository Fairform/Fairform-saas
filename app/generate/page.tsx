'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Download, FileText, Loader2 } from 'lucide-react'
import DocumentSelector from '@/components/DocumentSelector'
import { type CatalogDoc, type PackDefinition } from '@/lib/catalog'

interface GeneratedDocument {
  id: string
  title: string
  format: string
  downloadUrl: string
  createdAt: string
}

export default function GeneratePage() {
  const { user } = useAuth()
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null)
  const [formData, setFormData] = useState({
    businessName: '',
    abn: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    industry: '',
    pack: '',
    format: 'pdf',
    additionalInfo: ''
  })
  const [selectedDocuments, setSelectedDocuments] = useState<CatalogDoc[]>([])
  const [selectedPack, setSelectedPack] = useState<PackDefinition | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocuments, setGeneratedDocuments] = useState<GeneratedDocument[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      window.location.href = '/(auth)/login?next=/generate'
      return
    }

    const checkSubscription = async () => {
      try {
        const response = await fetch(`/api/user/subscription-status?userId=${user.id}`)
        const data = await response.json()
        setSubscriptionStatus(data)
      } catch (error) {
        console.error('Failed to check subscription:', error)
      }
    }

    checkSubscription()
  }, [user])

  const handleDocumentSelection = (selection: {
    industryId: string
    packId: string
    documents: CatalogDoc[]
    pack: PackDefinition
  }) => {
    setFormData(prev => ({
      ...prev,
      industry: selection.industryId,
      pack: selection.packId,
      format: selection.pack.formats[0]
    }))
    setSelectedDocuments(selection.documents)
    setSelectedPack(selection.pack)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!subscriptionStatus?.canGenerate) {
      alert('Please subscribe to a plan to generate documents.')
      window.location.href = '/pricing'
      return
    }
    
    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          documents: selectedDocuments.map(doc => doc.id)
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate document')
      }

      const result = await response.json()
      
      if (result.success && result.files) {
        const newDocuments: GeneratedDocument[] = result.files.map((file: any) => ({
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          title: file.filename,
          format: file.format,
          downloadUrl: file.downloadUrl,
          createdAt: new Date().toISOString()
        }))
        
        setGeneratedDocuments(prev => [...prev, ...newDocuments])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadFile = (file: GeneratedDocument) => {
    window.open(file.downloadUrl, '_blank')
  }

  if (!user || !subscriptionStatus) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  }

  if (!subscriptionStatus.canGenerate) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Subscription Required</h1>
          <p className="text-gray-600 mb-8">
            {subscriptionStatus.limit === 0 
              ? 'Please subscribe to a plan to generate documents.'
              : `You've reached your monthly limit of ${subscriptionStatus.limit} documents.`}
          </p>
          <Button onClick={() => window.location.href = '/pricing'}>
            View Plans
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Compliance Documents
          </h1>
          <p className="text-xl text-gray-600">
            Create professional, audit-ready documents in seconds
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Document Generation</CardTitle>
            <CardDescription>
              Fill in your business details and select the documents you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Your business name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@yourbusiness.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="abn">ABN</Label>
                  <Input
                    id="abn"
                    value={formData.abn}
                    onChange={(e) => setFormData(prev => ({ ...prev, abn: e.target.value }))}
                    placeholder="12 345 678 901"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="+61 2 1234 5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Business St, City, State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://yourbusiness.com"
                  />
                </div>
              </div>

              <DocumentSelector
                onSelectionChange={handleDocumentSelection}
                initialIndustry={formData.industry}
                initialPack={formData.pack}
              />

              {selectedPack && (
                <div className="space-y-2">
                  <Label htmlFor="format">Output Format</Label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {selectedPack.formats.map((format) => (
                      <option key={format} value={format}>
                        {format.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  placeholder="Any specific requirements or additional information..."
                  rows={3}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isGenerating || !formData.businessName || !formData.industry || !formData.pack || selectedDocuments.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Documents...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate {selectedDocuments.length} Document{selectedDocuments.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {generatedDocuments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>
                Your documents are ready for download
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.title}</p>
                        <p className="text-sm text-gray-500">{doc.format?.toUpperCase() || 'PDF'}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadFile(doc)}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
