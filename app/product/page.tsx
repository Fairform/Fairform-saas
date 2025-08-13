'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/pricing')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Subscription Required</h1>
        <p className="text-gray-600 mb-6">
          We've moved to a subscription-based model. Redirecting you to our pricing plans...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  )
}

  const documentPacks = [
    {
      id: 'ndis',
      name: 'NDIS Compliance Pack',
      category: 'Healthcare',
      price: '$499',
      description: 'Complete NDIS compliance documentation covering verification and certification audits, participant rights, and quality frameworks.',
      icon: <Heart className="w-6 h-6" />,
      documents: [
        'Quality and Safeguards Policy',
        'Participant Rights and Responsibilities',
        'Incident Management Procedures',
        'Privacy and Confidentiality Policy',
        'Worker Screening Requirements',
        'Complaints Management System',
        'Risk Management Framework',
        'Service Delivery Procedures',
        'Emergency Response Plans',
        'Restrictive Practices Policy',
        'Medication Management Policy',
        'Professional Development Framework',
        'Financial Management Policy',
        'Record Keeping Guidelines',
        'Continuous Improvement Process'
      ],
      features: [
        'NDIS Quality & Safeguards Commission compliant',
        'Verification and certification audit ready',
        'Participant-centered approach',
        'Professional templates in Word & PDF',
        'Customizable with your branding',
        'Regular regulatory updates included'
      ],
      industry: 'NDIS Service Providers',
      compliance: ['NDIS Practice Standards', 'NDIS Code of Conduct', 'Quality & Safeguards Commission'],
      popular: true
    },
    {
      id: 'construction',
      name: 'Construction Safety Pack',
      category: 'Safety',
      price: '$349',
      description: 'Comprehensive WHS compliance for construction and trades including SWMS, JSA, risk assessments, and safety procedures.',
      icon: <Building2 className="w-6 h-6" />,
      documents: [
        'Safe Work Method Statements (SWMS)',
        'Job Safety Analysis (JSA)',
        'Risk Assessment Matrix',
        'Site Safety Management Plan',
        'Emergency Response Procedures',
        'Incident Reporting Framework',
        'Equipment Safety Checklists',
        'Contractor Management Policy',
        'Personal Protective Equipment Policy',
        'Training and Induction Procedures',
        'Safety Communication Plans',
        'Hazard Identification Guidelines',
        'First Aid Response Procedures',
        'Environmental Management Plan',
        'Quality Control Procedures'
      ],
      features: [
        'Work Health & Safety Act compliant',
        'Construction-specific templates',
        'Site safety management tools',
        'Contractor compliance frameworks',
        'Emergency response protocols',
        'Equipment safety guidelines'
      ],
      industry: 'Construction & Trades',
      compliance: ['WHS Act 2011', 'Construction Work Code', 'Safe Work Australia Guidelines']
    },
    {
      id: 'childcare',
      name: 'Childcare & Education Pack',
      category: 'Education',
      price: '$279',
      description: 'Essential policies for childcare and education providers covering child protection, educator compliance, and quality frameworks.',
      icon: <GraduationCap className="w-6 h-6" />,
      documents: [
        'Child Protection Policy',
        'Educator Code of Conduct',
        'Incident Management Procedures',
        'National Quality Framework Guidelines',
        'Parent and Family Engagement Policy',
        'Health and Hygiene Procedures',
        'Emergency Response Plans',
        'Excursion and Outing Policy',
        'Staff Recruitment and Screening',
        'Professional Development Framework',
        'Nutrition and Food Safety Policy',
        'Sleep and Rest Procedures',
        'Behaviour Guidance Policy',
        'Privacy and Confidentiality Policy',
        'Complaints Management System'
      ],
      features: [
        'National Quality Framework aligned',
        'Child protection focused',
        'Educator compliance tools',
        'Family engagement strategies',
        'Health and safety protocols',
        'Professional development guides'
      ],
      industry: 'Childcare & Education',
      compliance: ['National Quality Framework', 'Child Protection Act', 'Education & Care Services Law']
    },
    {
      id: 'hospitality',
      name: 'Hospitality Compliance Pack',
      category: 'Services',
      price: '$229',
      description: 'Complete hospitality compliance covering food safety, staff management, customer service, and licensing requirements.',
      icon: <Home className="w-6 h-6" />,
      documents: [
        'Food Safety Management Plan',
        'Staff Handbook and Policies',
        'Customer Service Standards',
        'Hygiene and Sanitation Procedures',
        'Incident Reporting Framework',
        'Emergency Response Plans',
        'Licensing Compliance Guidelines',
        'Cash Handling Procedures',
        'Cleaning and Maintenance Schedules',
        'Training and Development Policy',
        'Complaints Management System',
        'Privacy and Data Protection Policy',
        'Health and Safety Procedures',
        'Supplier Management Guidelines',
        'Quality Assurance Framework'
      ],
      features: [
        'Food safety compliance',
        'Staff management tools',
        'Customer service standards',
        'Licensing requirement guides',
        'Hygiene and sanitation protocols',
        'Emergency response procedures'
      ],
      industry: 'Restaurants & Cafes',
      compliance: ['Food Safety Standards', 'Liquor Licensing', 'WHS Requirements']
    },
    {
      id: 'healthcare',
      name: 'Healthcare Services Pack',
      category: 'Healthcare',
      price: '$389',
      description: 'Professional healthcare compliance including patient privacy, clinical procedures, and therapeutic standards.',
      icon: <Shield className="w-6 h-6" />,
      documents: [
        'Patient Privacy and Confidentiality Policy',
        'Clinical Governance Framework',
        'Consent and Information Procedures',
        'Medical Records Management',
        'Infection Control Procedures',
        'Incident Reporting System',
        'Professional Standards Compliance',
        'Emergency Response Procedures',
        'Equipment and Device Management',
        'Medication Management Policy',
        'Staff Training and Competency Framework',
        'Quality Improvement Procedures',
        'Complaints Management System',
        'Risk Management Framework',
        'Therapeutic Compliance Guidelines'
      ],
      features: [
        'Patient privacy protection',
        'Clinical governance tools',
        'Professional standards compliance',
        'Therapeutic guidelines',
        'Risk management frameworks',
        'Quality improvement systems'
      ],
      industry: 'Healthcare Practitioners',
      compliance: ['Privacy Act 1988', 'Therapeutic Goods Administration', 'Professional Registration Standards']
    },
    {
      id: 'business',
      name: 'Professional Services Pack',
      category: 'Business',
      price: '$189',
      description: 'Essential business policies for consultants, freelancers, and professional service providers.',
      icon: <Briefcase className="w-6 h-6" />,
      documents: [
        'Client Service Agreement Template',
        'Privacy and Data Protection Policy',
        'Terms of Service',
        'Refund and Cancellation Policy',
        'Intellectual Property Protection',
        'Professional Liability Guidelines',
        'Code of Conduct',
        'Confidentiality Agreement Template',
        'Complaints Management Procedure',
        'Professional Development Framework',
        'Quality Assurance Standards',
        'Risk Management Guidelines',
        'Communication and Marketing Policy',
        'Financial Management Procedures',
        'Subcontractor Management Guidelines'
      ],
      features: [
        'Client relationship management',
        'IP protection templates',
        'Professional liability coverage',
        'Service delivery standards',
        'Privacy compliance tools',
        'Business operation guidelines'
      ],
      industry: 'Consultants & Freelancers',
      compliance: ['Privacy Act 1988', 'Australian Consumer Law', 'Professional Standards']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Industries', count: documentPacks.length },
    { id: 'Healthcare', name: 'Healthcare & NDIS', count: documentPacks.filter(p => p.category === 'Healthcare').length },
    { id: 'Safety', name: 'Construction & Safety', count: documentPacks.filter(p => p.category === 'Safety').length },
    { id: 'Education', name: 'Education & Childcare', count: documentPacks.filter(p => p.category === 'Education').length },
    { id: 'Services', name: 'Services & Hospitality', count: documentPacks.filter(p => p.category === 'Services').length },
    { id: 'Business', name: 'Professional Services', count: documentPacks.filter(p => p.category === 'Business').length }
  ]

  const filteredPacks = selectedCategory === 'all' 
    ? documentPacks 
    : documentPacks.filter(pack => pack.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative">
          <SubtleOrb className="top-10 left-1/4" />
          <SubtleOrb className="top-32 right-1/3" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Industry-specific compliance packs</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
              Professional Compliance
              <br />
              Document Packs
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Get comprehensive, industry-specific compliance documentation instantly. Each pack includes all the policies and procedures you need to meet regulatory standards.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </section>

        {/* Document Packs Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white border-2 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 ${
                  pack.popular ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Popular Badge */}
                {pack.popular && (
                  <div className="absolute -top-3 left-8">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {pack.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{pack.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{pack.industry}</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>{pack.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">Subscription Required</div>
                    <div className="text-xs text-gray-500">See Pricing</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {pack.description}
                </p>

                {/* Key Features */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900">What's Included</h4>
                  <div className="space-y-2">
                    {pack.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Count */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {pack.documents.length} Professional Documents
                      </span>
                    </div>
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      View all →
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-1">
                    {pack.documents.slice(0, 3).map((doc, idx) => (
                      <div key={idx} className="text-[10px] text-gray-600">• {doc}</div>
                    ))}
                    {pack.documents.length > 3 && (
                      <div className="text-[10px] text-gray-500 font-medium">
                        +{pack.documents.length - 3} more documents
                      </div>
                    )}
                  </div>
                </div>

                {/* Compliance Standards */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Compliance Standards</h4>
                  <div className="flex flex-wrap gap-2">
                    {pack.compliance.map((standard, idx) => (
                      <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                        {standard}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleGetPack(pack.id)}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 group ${
                      pack.popular 
                        ? 'bg-black hover:bg-gray-800 text-white'
                        : 'bg-gray-900 hover:bg-black text-white'
                    }`}
                  >
                    <Package className="w-4 h-4" />
                    <span>View Pricing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Pack CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                <Settings className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Need a custom compliance pack?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                We can create a specialized document pack for your unique industry requirements, 
                regulatory frameworks, and compliance standards.
              </p>
              <a href="/contact" className="inline-flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-medium transition-colors">
                <span>Request Custom Pack</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How Formative works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional compliance documentation delivered instantly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Target className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Pack</h3>
                <p className="text-gray-600 leading-relaxed">
                  Select the compliance pack that matches your industry and business needs from our comprehensive library.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Zap className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Generation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI customizes each document to your business details and generates your complete compliance pack in seconds.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 border border-gray-200">
                  <Download className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Download & Implement</h3>
                <p className="text-gray-600 leading-relaxed">
                  Download professional Word and PDF documents, customize with your branding, and implement immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why choose Formative document packs?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional, comprehensive, and compliant documentation at a fraction of the cost.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Focused</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every document follows current regulatory frameworks and industry standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Quality</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Documents are professionally written and follow industry best practices.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time & Money</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get comprehensive policies instantly instead of waiting weeks for consultants.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Updated</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Documents reflect the latest regulatory changes and industry updates.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <span className="text-lg font-medium text-gray-900">Formative</span>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
              <a href="/help" className="hover:text-gray-900">Help</a>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-sm text-gray-500">
            <div className="flex flex-col items-center space-y-4">
              {/* NDIS Badge */}
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-blue-900">NDIS Compliant</div>
                    <div className="text-xs text-blue-700">Registered Provider</div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-green-900">Quality Assured</div>
                    <div className="text-xs text-green-700">Industry Standards</div>
                  </div>
                </div>
              </div>
              
              <div className="text-[10px] text-gray-400 max-w-md">
                * Compliance badges represent our commitment to industry standards. Users should verify specific requirements for their registration status.
              </div>
              
              <div>© 2024 Formative. All rights reserved.</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-[10px] text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Professional Advice:</strong> Formative provides AI-generated compliance documents for informational purposes only. These documents do not constitute legal, professional, or regulatory advice. Users should always consult with qualified legal professionals, compliance specialists, or industry experts before implementing any policies or procedures.
                </p>
                <p>
                  <strong>NDIS Compliance:</strong> Our NDIS document templates are designed to align with NDIS Practice Standards and Quality and Safeguards Framework. However, NDIS compliance requirements may vary by provider type and services offered. Users must ensure their specific obligations are met.
                </p>
                <p>
                  <strong>Regulatory Compliance:</strong> While our documents are designed to align with current regulatory standards, compliance requirements vary by jurisdiction, industry, and specific business circumstances. Users are solely responsible for ensuring their policies meet applicable laws and regulations in their specific context.
                </p>
                <p>
                  <strong>No Warranty:</strong> Formative makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of generated documents. We do not guarantee that our documents will ensure regulatory compliance or prevent legal issues.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, Formative, its officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our platform or generated documents.
                </p>
                <p>
                  <strong>User Responsibility:</strong> Users must review, customize, and validate all generated documents for their specific needs, applicable laws, and industry standards. Regular updates and reviews of policies are essential to maintain compliance as regulations evolve.
                </p>
                <p>
                  <strong>Audit and Implementation:</strong> While our documents are designed to support your compliance efforts, users should conduct their own compliance audits and seek professional guidance for implementation and ongoing compliance monitoring.
                </p>
                <p className="pt-2 border-t border-gray-200">
                  By using Formative, you acknowledge that you have read, understood, and agree to these terms. You confirm that you will seek appropriate professional advice and conduct proper due diligence before implementing any generated documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
