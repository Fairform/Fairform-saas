'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { INDUSTRY_PACKS, getDocumentsForPack, type CatalogDoc, type PackDefinition } from '@/lib/catalog'

interface DocumentSelectorProps {
  onSelectionChange: (selection: {
    industryId: string
    packId: string
    documents: CatalogDoc[]
    pack: PackDefinition
  }) => void
  initialIndustry?: string
  initialPack?: string
}

const DocumentSelector = React.memo(function DocumentSelector({ 
  onSelectionChange, 
  initialIndustry = '', 
  initialPack = '' 
}: DocumentSelectorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState(initialIndustry)
  const [selectedPack, setSelectedPack] = useState(initialPack)

  const availablePacks = useMemo(() => {
    if (!selectedIndustry) return []
    return INDUSTRY_PACKS[selectedIndustry]?.packs || []
  }, [selectedIndustry])

  const selectedPackDetails = useMemo(() => {
    return availablePacks.find(pack => pack.id === selectedPack)
  }, [availablePacks, selectedPack])

  const documentsForPack = useMemo(() => {
    if (!selectedIndustry || !selectedPack) return []
    return getDocumentsForPack(selectedIndustry, selectedPack)
  }, [selectedIndustry, selectedPack])

  useEffect(() => {
    if (selectedIndustry && selectedPack && selectedPackDetails) {
      onSelectionChange({
        industryId: selectedIndustry,
        packId: selectedPack,
        documents: documentsForPack,
        pack: selectedPackDetails
      })
    }
  }, [selectedIndustry, selectedPack, selectedPackDetails, documentsForPack, onSelectionChange])

  const handleIndustryChange = (industryId: string) => {
    setSelectedIndustry(industryId)
    setSelectedPack('')
  }

  const handlePackChange = (packId: string) => {
    setSelectedPack(packId)
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="industry-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Industry
        </label>
        <select
          id="industry-select"
          value={selectedIndustry}
          onChange={(e) => handleIndustryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose an industry...</option>
          {Object.entries(INDUSTRY_PACKS).map(([id, industry]) => (
            <option key={id} value={id}>
              {industry.label}
            </option>
          ))}
        </select>
      </div>

      {selectedIndustry && (
        <div>
          <label htmlFor="pack-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Package
          </label>
          <div className="space-y-3">
            {availablePacks.map((pack) => (
              <div
                key={pack.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedPack === pack.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePackChange(pack.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`pack-${pack.id}`}
                    name="pack"
                    value={pack.id}
                    checked={selectedPack === pack.id}
                    onChange={() => handlePackChange(pack.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={`pack-${pack.id}`} className="ml-3 flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{pack.label}</h3>
                        <p className="text-sm text-gray-500">
                          Formats: {pack.formats.join(', ').toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">Subscription Required</div>
                        <div className="text-xs text-gray-500">See Pricing</div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedIndustry && selectedPack && documentsForPack.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Included Documents ({documentsForPack.length})
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {documentsForPack.map((doc) => (
                <div key={doc.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">{doc.title}</h4>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                    {doc.inLite && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        Lite Pack
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default DocumentSelector
