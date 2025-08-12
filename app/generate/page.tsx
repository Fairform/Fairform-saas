'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface GeneratedFile {
  type: string;
  url: string;
  fileName: string;
  data: string;
  mimeType: string;
}

export default function GeneratePage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    documentType: '',
    letterhead: false,
    format: ['pdf'] as string[],
    branding: {
      primaryColor: '#2563eb',
      accentColor: '#1e40af',
      footerNote: '',
      headerText: '',
    },
    placeholders: {
      address: '',
      abn: '',
      contactEmail: '',
      phone: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState<GeneratedFile[]>([]);

  const industries = [
    { value: 'ndis', label: 'NDIS Services' },
    { value: 'construction', label: 'Construction' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'childcare', label: 'Childcare & Education' },
    { value: 'professional-services', label: 'Professional Services' },
  ];

  const documentTypes = [
    'Privacy Policy',
    'Work Health & Safety Policy',
    'Code of Conduct',
    'Incident Management Procedure',
    'Quality Assurance Policy',
    'Risk Management Framework',
  ];

  const handleGenerate = async () => {
    if (!formData.businessName || !formData.industry || !formData.documentType) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.format.length === 0) {
      alert('Please select at least one format (PDF or DOCX)');
      return;
    }

    console.log('Frontend sending data:', JSON.stringify(formData, null, 2));

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: user?.id,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error);
      }

      setGeneratedFiles(data.files);
    } catch (error: any) {
      console.error('Generation failed:', error);
      alert('Generation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (file: GeneratedFile) => {
    const blob = new Blob([Buffer.from(file.data, 'base64')], { type: file.mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generate Compliance Documents
          </h1>
          <p className="text-xl text-gray-600">
            Create professional, audit-ready documents in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Document Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
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
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type *
                </label>
                <select
                  required
                  value={formData.documentType}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select document type</option>
                  {documentTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.letterhead}
                    onChange={(e) => setFormData(prev => ({ ...prev, letterhead: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Include letterhead</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="space-y-2">
                  {['pdf', 'docx'].map(format => (
                    <label key={format} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.format.includes(format)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({ ...prev, format: [...prev.format, format] }));
                          } else {
                            setFormData(prev => ({ ...prev, format: prev.format.filter(f => f !== format) }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{format.toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !formData.businessName || !formData.industry || !formData.documentType || formData.format.length === 0}
                className="w-full bg-black text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate Documents</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Generated Documents</h2>
            
            {generatedFiles.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your generated documents will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {generatedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">{file.fileName}</p>
                        <p className="text-sm text-gray-600">{file.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(file)}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
