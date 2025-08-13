'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { INDUSTRY_PACKS, getCatalogStats } from '@/lib/catalog'

const catalogStats = getCatalogStats()

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Industry-Specific Document Packs
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from {catalogStats.industries} industry-specific document packs with over {catalogStats.totalDocuments} compliance templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
        {Object.entries(INDUSTRY_PACKS).map(([industryId, industry]) => (
          <Card key={industryId} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{industry.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industry.packs.map((pack) => (
                  <div key={pack.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{pack.label}</h4>
                      <span className="text-lg font-bold text-blue-600">${pack.price}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Formats: {pack.formats.join(', ').toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pack.includes === 'subset' && 'Essential documents only'}
                      {pack.includes === 'all' && 'All industry documents'}
                      {pack.includes === 'all-plus-extras' && 'All documents + extras'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Why Choose Our Document Packs?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{catalogStats.industries}</div>
            <div className="text-gray-600">Industries covered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{catalogStats.totalDocuments}</div>
            <div className="text-gray-600">Document templates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
            <div className="text-gray-600">Australian compliance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Expert support</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
          Start Generating Documents
        </Button>
      </div>
    </div>
  )
}
