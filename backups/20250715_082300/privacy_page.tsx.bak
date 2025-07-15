'use client'

import { Shield, Check, Lock, Eye, Database, UserCheck, Scale, FileText, Globe, AlertTriangle } from 'lucide-react'

// Navigation helper component (matching other pages)
const NavigationLink = ({ href, children, className, onClick }: { 
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (onClick) {
      onClick()
    } else {
      console.log(`Navigating to: ${href}`)
      window.location.href = href
    }
  }

  return (
    <a 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavigationLink href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="text-lg font-medium text-gray-900">FairForm</span>
            </NavigationLink>
            
            <nav className="hidden md:flex items-center space-x-6">
              <NavigationLink 
                href="/product" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Product
              </NavigationLink>
              <NavigationLink 
                href="/pricing" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </NavigationLink>
              <NavigationLink 
                href="/about" 
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </NavigationLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <NavigationLink 
              href="/login" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Log in
            </NavigationLink>
            <NavigationLink 
              href="/signup" 
              className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign up
            </NavigationLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center space-x-4 text-lg text-gray-600">
            <span>Effective Date: 1 December 2024</span>
            <span>•</span>
            <span>Last Updated: 15 December 2024</span>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <Scale className="w-4 h-4" />
            <span>Compliant with Australian Privacy Act 1988 (Cth) and Australian Privacy Principles</span>
          </div>
        </div>

        {/* Privacy Overview */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Privacy Commitment Statement</h2>
              <p className="text-blue-700 mb-4">
                FairForm Pty Ltd (ACN: [Company Number]) ("FairForm", "we", "our", or "us") is committed to protecting and respecting your privacy in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), the Notifiable Data Breaches scheme, and all applicable Australian privacy and data protection legislation.
              </p>
              <p className="text-blue-700">
                This Privacy Policy has been prepared by our legal advisors to ensure full compliance with Australian privacy law and explains how we collect, use, store, disclose, and manage your personal information across all our digital platforms, services, and business operations.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-10">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definitions and Interpretation</h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Definitions</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>"Personal Information"</strong> has the meaning given in section 6 of the Privacy Act 1988 (Cth) and includes any information or opinion about an identified individual, or an individual who is reasonably identifiable.</p>
                  <p><strong>"Sensitive Information"</strong> has the meaning given in section 6 of the Privacy Act 1988 (Cth) and includes health information, biometric information, and other categories specified in the Act.</p>
                  <p><strong>"Services"</strong> means all software, applications, platforms, websites, APIs, databases, content, and related services provided by FairForm.</p>
                  <p><strong>"You"</strong> or "User" means any individual who accesses or uses our Services, whether as a registered user, visitor, or on behalf of an organisation.</p>
                  <p><strong>"Australian Privacy Principles" or "APPs"</strong> means the privacy principles set out in Schedule 1 of the Privacy Act 1988 (Cth).</p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collection and Australian Privacy Principles Compliance</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 text-sm">
                      <strong>APP 3 Compliance Notice:</strong> This section outlines our collection practices in accordance with Australian Privacy Principle 3 (Collection of solicited personal information).
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">2.1 Categories of Personal Information Collected</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <UserCheck className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Identity and Contact Information</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Full legal name, preferred name, and any aliases</li>
                    <li>• Email addresses (primary and secondary)</li>
                    <li>• Telephone and mobile numbers</li>
                    <li>• Postal and residential addresses</li>
                    <li>• Date of birth and age verification data</li>
                    <li>• Professional titles and qualifications</li>
                    <li>• Digital signatures and authentication credentials</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Database className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Business and Professional Information</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Company name, ABN/ACN, and registration details</li>
                    <li>• Industry classification and business type</li>
                    <li>• Professional licensing and accreditation numbers</li>
                    <li>• Team size, organisational structure</li>
                    <li>• Compliance obligations and regulatory requirements</li>
                    <li>• Business address and trading locations</li>
                    <li>• Professional associations and memberships</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Financial and Billing Information</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Billing and invoicing addresses</li>
                    <li>• Payment method details (tokenised)</li>
                    <li>• Transaction history and payment records</li>
                    <li>• Credit assessments and financial capacity</li>
                    <li>• Tax file numbers (where legally required)</li>
                    <li>• Banking details for refunds and payments</li>
                    <li>• Purchase orders and procurement information</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Content and Generated Data</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Documents, policies, and procedures generated</li>
                    <li>• Templates, customisations, and modifications</li>
                    <li>• Uploaded files, attachments, and content</li>
                    <li>• Collaboration data and shared documents</li>
                    <li>• Version control and editing history</li>
                    <li>• Comments, annotations, and review feedback</li>
                    <li>• Export logs and download activity</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Technical and Usage Information</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• IP addresses, device identifiers, and network information</li>
                    <li>• Browser type, version, and configuration settings</li>
                    <li>• Operating system and device specifications</li>
                    <li>• Session data, timestamps, and duration metrics</li>
                    <li>• Feature usage patterns and interaction analytics</li>
                    <li>• Error logs, crash reports, and diagnostic data</li>
                    <li>• Geolocation data and access patterns</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Communication and Support Data</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Support ticket correspondence and chat logs</li>
                    <li>• Email communications and response history</li>
                    <li>• Phone call recordings and transcripts</li>
                    <li>• Training session participation and feedback</li>
                    <li>• Survey responses and user experience data</li>
                    <li>• Marketing preferences and consent records</li>
                    <li>• Complaint handling and resolution records</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">2.2 Methods of Collection</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect personal information through various lawful means in accordance with APP 3, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Direct Collection:</strong> When you voluntarily provide information through account registration, form submissions, direct communications, or service usage</li>
                <li><strong>Automated Collection:</strong> Through cookies, web beacons, analytics tools, and other tracking technologies during your interaction with our Services</li>
                <li><strong>Third-Party Sources:</strong> From authorised business partners, professional referral networks, and publicly available sources where legally permissible</li>
                <li><strong>Integrated Services:</strong> Through legitimate API connections and authorised third-party service integrations</li>
                <li><strong>Business Transactions:</strong> During merger, acquisition, or business transfer processes involving due diligence procedures</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Sensitive Information Notice:</strong> We do not routinely collect sensitive information as defined under the Privacy Act. Where sensitive information is collected, we will obtain your explicit consent and comply with APP 3.3 requirements.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Purposes of Collection and Use (APP 6 Compliance)</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                In accordance with Australian Privacy Principle 6, we only use and disclose personal information for purposes that are directly related to our business functions or activities for which the information was collected, or for secondary purposes where legally permitted.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">3.1 Primary Purposes</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Service Delivery:</strong> Providing, operating, maintaining, and improving our compliance documentation services</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Account Management:</strong> Creating, maintaining, and managing user accounts and access credentials</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Transaction Processing:</strong> Processing payments, managing subscriptions, and handling billing inquiries</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Personalisation:</strong> Customising services, recommendations, and user experience based on preferences</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Customer Support:</strong> Providing technical assistance, resolving issues, and responding to inquiries</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Communication:</strong> Sending service notifications, updates, and administrative communications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Quality Assurance:</strong> Monitoring service quality, performance metrics, and user satisfaction</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Compliance Verification:</strong> Ensuring documents meet relevant industry standards and regulations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Business Operations:</strong> Managing internal business processes, administration, and corporate governance</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Legal Compliance:</strong> Meeting obligations under Australian and international laws and regulations</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">3.2 Secondary Purposes</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use personal information for secondary purposes where:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>You have provided additional consent for such use</li>
                <li>The secondary purpose is directly related to the primary purpose and you would reasonably expect such use</li>
                <li>Use is required or authorised by Australian law or court order</li>
                <li>Use is necessary to prevent or lessen a serious threat to public health or safety</li>
                <li>Use is for law enforcement purposes in accordance with the Privacy Act</li>
                <li>Use is for research purposes that comply with ethical guidelines and privacy requirements</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">3.3 Marketing and Direct Communications</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <strong>Opt-in Consent:</strong> We only send marketing communications where you have provided explicit consent or where we have an existing customer relationship. You can withdraw consent at any time through unsubscribe mechanisms or by contacting us directly.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security and Protection Measures</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 text-sm">
                      <strong>APP 11 Compliance:</strong> We implement comprehensive security measures to protect personal information in accordance with Australian Privacy Principle 11 (Security of personal information).
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">4.1 Technical Security Measures</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h4 className="text-md font-semibold text-gray-900">Encryption Standards</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• AES-256 encryption for data at rest</li>
                    <li>• TLS 1.3 encryption for data in transit</li>
                    <li>• End-to-end encryption for sensitive communications</li>
                    <li>• Encrypted backup systems and disaster recovery</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-green-600" />
                    <h4 className="text-md font-semibold text-gray-900">Access Controls</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Multi-factor authentication (MFA)</li>
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Principle of least privilege enforcement</li>
                    <li>• Regular access reviews and audits</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-6 h-6 text-purple-600" />
                    <h4 className="text-md font-semibold text-gray-900">Monitoring Systems</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• 24/7 security monitoring and alerting</li>
                    <li>• Intrusion detection and prevention systems</li>
                    <li>• Comprehensive audit logging</li>
                    <li>• Automated threat detection and response</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">4.2 Organisational Security Measures</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <UserCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Staff Training and Awareness</h4>
                    <p className="text-gray-700 text-sm">All personnel undergo comprehensive privacy and security training, including regular updates on Australian privacy law requirements, data handling procedures, and incident response protocols.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Database className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Data Governance Framework</h4>
                    <p className="text-gray-700 text-sm">We maintain a robust data governance framework including data classification policies, retention schedules, disposal procedures, and regular compliance assessments.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Third-Party Security Assessments</h4>
                    <p className="text-gray-700 text-sm">Regular penetration testing, vulnerability assessments, and security audits are conducted by independent certified security professionals to ensure ongoing protection effectiveness.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">4.3 Data Breach Response Procedures</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                In accordance with the Notifiable Data Breaches scheme under the Privacy Act, we have established comprehensive incident response procedures:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Detection and Containment:</strong> Immediate identification, assessment, and containment of any suspected data breach</li>
                <li><strong>Impact Assessment:</strong> Evaluation of the breach's scope, affected individuals, and potential harm</li>
                <li><strong>Notification Requirements:</strong> Notification to the Office of the Australian Information Commissioner (OAIC) within 72 hours if required</li>
                <li><strong>Individual Notification:</strong> Direct notification to affected individuals where the breach is likely to result in serious harm</li>
                <li><strong>Remediation and Prevention:</strong> Implementation of corrective measures and enhanced security controls</li>
                <li><strong>Documentation and Reporting:</strong> Comprehensive documentation for regulatory compliance and continuous improvement</li>
              </ol>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Disclosure and Sharing of Personal Information (APP 6 Compliance)</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">5.1 Permitted Disclosures</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose personal information in the following circumstances, in accordance with Australian Privacy Principle 6:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Providers and Business Partners</h4>
                  <p className="text-gray-700 text-sm">We engage carefully vetted third-party service providers for essential business functions including payment processing, cloud infrastructure, customer support, and professional services. All third parties are bound by strict contractual obligations requiring equivalent privacy protection standards.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal and Regulatory Requirements</h4>
                  <p className="text-gray-700 text-sm">We may disclose personal information where required or authorised by Australian law, including compliance with court orders, subpoenas, statutory demands, and requests from law enforcement agencies acting within their legal authority.</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Transactions</h4>
                  <p className="text-gray-700 text-sm">In the event of merger, acquisition, joint venture, or sale of assets, personal information may be disclosed to prospective or actual purchasers, subject to appropriate confidentiality agreements and regulatory requirements.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Emergency Situations</h4>
                  <p className="text-gray-700 text-sm">We may disclose personal information where necessary to prevent or lessen a serious threat to public health, public safety, or the life or health of an individual, in accordance with Privacy Act emergency disclosure provisions.</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">5.2 Third-Party Service Categories</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Technology Infrastructure</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Cloud hosting and data storage providers</li>
                    <li>• Content delivery network services</li>
                    <li>• Database management and backup services</li>
                    <li>• Security monitoring and threat detection</li>
                    <li>• Analytics and performance monitoring tools</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Business Operations</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Payment processors and financial institutions</li>
                    <li>• Customer relationship management systems</li>
                    <li>• Email delivery and communication platforms</li>
                    <li>• Customer support and helpdesk services</li>
                    <li>• Legal, accounting, and professional advisors</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 text-sm">
                  <strong>Important:</strong> We do not sell, rent, or lease personal information to third parties for commercial purposes. All disclosures are made in accordance with our legitimate business interests and applicable privacy laws.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cross-Border Data Transfers (APP 8 Compliance)</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-800 text-sm">
                      <strong>APP 8 Notice:</strong> This section explains how we handle overseas transfers of personal information in compliance with Australian Privacy Principle 8.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">6.1 Overseas Transfer Circumstances</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Personal information may be transferred to and stored in jurisdictions outside Australia for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Cloud storage and data processing services in secure international data centres</li>
                <li>Customer support operations provided by overseas teams</li>
                <li>Backup and disaster recovery systems maintained in multiple jurisdictions</li>
                <li>Professional services provided by international advisors and consultants</li>
                <li>Technology development and maintenance activities</li>
                <li>Compliance with international legal and regulatory requirements</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">6.2 Jurisdictions and Safeguards</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Primary Jurisdictions</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>United States:</strong> Data centres with SOC 2 Type II certification</li>
                    <li>• <strong>European Union:</strong> GDPR-compliant facilities and processes</li>
                    <li>• <strong>Singapore:</strong> PDPA-compliant operations and storage</li>
                    <li>• <strong>Canada:</strong> PIPEDA-compliant service providers</li>
                    <li>• <strong>United Kingdom:</strong> UK GDPR and DPA 2018 compliance</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Transfer Safeguards</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Standard contractual clauses approved by regulatory authorities</li>
                    <li>• Binding corporate rules for multinational service providers</li>
                    <li>• Adequacy decisions recognising equivalent protection</li>
                    <li>• Industry-specific certification schemes and codes of conduct</li>
                    <li>• Regular compliance audits and assessments</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>APP 8 Responsibility:</strong> When we transfer personal information overseas, we take reasonable steps to ensure that the overseas recipient does not breach the Australian Privacy Principles in relation to that information. We remain accountable for compliance with APP 8 and may be liable for any mishandling by overseas recipients.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights Under Australian Law</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">7.1 Access Rights (APP 12)</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <strong>Right to Access:</strong> You have the right to request access to the personal information we hold about you, subject to certain exceptions under the Privacy Act.
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                You may request access to your personal information by contacting our Privacy Officer. We will respond to your request within 30 days and provide access unless:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Providing access would pose a serious threat to the life, health, or safety of any individual</li>
                <li>Providing access would have an unreasonable impact on the privacy of others</li>
                <li>The request is frivolous or vexatious</li>
                <li>The information relates to existing or anticipated legal proceedings</li>
                <li>Providing access would be unlawful or would prejudice law enforcement activities</li>
                <li>Denying access is required or authorised by law</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">7.2 Correction Rights (APP 13)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you believe that personal information we hold about you is inaccurate, out of date, incomplete, irrelevant, or misleading, you may request that we correct it. We will:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li>Acknowledge your correction request within 7 business days</li>
                <li>Investigate the accuracy of the information in question</li>
                <li>Make necessary corrections if we agree the information is inaccurate</li>
                <li>Notify you of our decision within 30 days</li>
                <li>If we refuse to make corrections, provide you with written reasons and information about complaint mechanisms</li>
                <li>Associate your correction request with the relevant record if we refuse to make changes</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">7.3 Additional Rights and Preferences</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Marketing Opt-out:</strong> Withdraw consent for direct marketing communications</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Data Portability:</strong> Request transfer of data in a machine-readable format</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Processing Restrictions:</strong> Request limitation of specific data processing activities</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Anonymisation:</strong> Request anonymisation of personal identifiers where possible</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Complaint Rights:</strong> Lodge complaints with us or the OAIC</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Legal Representation:</strong> Appoint representatives for privacy matters</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention and Destruction (APP 11)</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">8.1 Retention Principles</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain personal information only for as long as necessary for the purposes for which it was collected, or as required by Australian law. Our retention practices are guided by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>The original purpose for which the information was collected</li>
                <li>Legal and regulatory retention requirements</li>
                <li>Legitimate business interests and operational needs</li>
                <li>Contractual obligations with customers and partners</li>
                <li>Potential legal proceedings and dispute resolution needs</li>
                <li>Historical research and archival purposes where applicable</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">8.2 Specific Retention Periods</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account and Profile Information</h4>
                  <p className="text-gray-700 text-sm">Retained for the duration of the account relationship plus 7 years after account closure for business record keeping requirements.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Financial and Transaction Records</h4>
                  <p className="text-gray-700 text-sm">Retained for 7 years from the date of transaction in accordance with Australian taxation and business record keeping requirements.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Generated Documents and Content</h4>
                  <p className="text-gray-700 text-sm">Retained for the duration of account relationship plus 3 years, unless longer retention is requested by the customer or required by law.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Logs and Analytics</h4>
                  <p className="text-gray-700 text-sm">Retained for 2 years for security, performance monitoring, and service improvement purposes, after which data is anonymised or deleted.</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing and Communication Data</h4>
                  <p className="text-gray-700 text-sm">Retained until consent is withdrawn or for 5 years from last interaction, whichever occurs first.</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">8.3 Secure Destruction Procedures</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When personal information is no longer required, we implement secure destruction procedures including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Secure deletion of digital records using industry-standard data wiping techniques</li>
                <li>Physical destruction of paper records through certified shredding services</li>
                <li>Secure disposal of hardware containing personal information</li>
                <li>Verification of destruction completion and documentation of disposal processes</li>
                <li>Notification to relevant third parties regarding data destruction requirements</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">9.1 Types of Cookies Used</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Essential Cookies</h4>
                  <p className="text-gray-700 text-sm mb-3">Necessary for basic website functionality and security.</p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>• Session management and authentication</li>
                    <li>• Security tokens and CSRF protection</li>
                    <li>• Load balancing and performance optimisation</li>
                    <li>• Language and accessibility preferences</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Analytics Cookies</h4>
                  <p className="text-gray-700 text-sm mb-3">Help us understand how visitors interact with our website.</p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>• Page views, bounce rates, and navigation patterns</li>
                    <li>• User demographics and geographic information</li>
                    <li>• Feature usage and engagement metrics</li>
                    <li>• Error tracking and performance monitoring</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Functional Cookies</h4>
                  <p className="text-gray-700 text-sm mb-3">Enable enhanced functionality and personalisation.</p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>• User preferences and customisation settings</li>
                    <li>• Recently viewed documents and templates</li>
                    <li>• Saved search criteria and filter preferences</li>
                    <li>• Chat widget and support ticket integration</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4">Marketing Cookies</h4>
                  <p className="text-gray-700 text-sm mb-3">Used to deliver relevant advertisements and measure campaign effectiveness.</p>
                  <ul className="space-y-1 text-gray-600 text-xs">
                    <li>• Advertising campaign tracking and attribution</li>
                    <li>• Retargeting and remarketing capabilities</li>
                    <li>• Social media integration and sharing</li>
                    <li>• A/B testing and conversion optimisation</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">9.2 Cookie Management</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control cookies through your browser settings. However, disabling certain cookies may affect website functionality. We provide granular cookie consent options allowing you to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Accept or reject specific cookie categories</li>
                <li>Review detailed information about each cookie type</li>
                <li>Modify your preferences at any time through our privacy centre</li>
                <li>Clear existing cookies and reset preferences</li>
                <li>Receive notifications about cookie policy updates</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy Complaints and Dispute Resolution</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.1 Internal Complaint Process</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to resolving privacy complaints promptly and fairly. Our internal complaint process includes:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-3 mb-6">
                <li><strong>Complaint Submission:</strong> Contact our Privacy Officer with details of your concern via email, phone, or written correspondence</li>
                <li><strong>Acknowledgment:</strong> We will acknowledge receipt of your complaint within 7 business days and provide a reference number</li>
                <li><strong>Investigation:</strong> We will thoroughly investigate your complaint, which may involve reviewing records, interviewing staff, and consulting legal advisors</li>
                <li><strong>Resolution:</strong> We will provide a written response within 30 days outlining our findings and any corrective actions taken</li>
                <li><strong>Follow-up:</strong> We will implement any agreed corrective measures and monitor compliance to prevent recurrence</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.2 External Complaint Options</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Office of the Australian Information Commissioner (OAIC)</h4>
                <p className="text-blue-800 text-sm mb-4">
                  If you are not satisfied with our response to your privacy complaint, you may lodge a complaint with the OAIC:
                </p>
                <div className="space-y-2 text-blue-700 text-sm">
                  <p><strong>Website:</strong> www.oaic.gov.au</p>
                  <p><strong>Phone:</strong> 1300 363 992</p>
                  <p><strong>Email:</strong> enquiries@oaic.gov.au</p>
                  <p><strong>Post:</strong> GPO Box 5218, Sydney NSW 2001</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.3 Alternative Dispute Resolution</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to participating in alternative dispute resolution processes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Industry-specific dispute resolution schemes where applicable</li>
                <li>Mediation services approved by the OAIC</li>
                <li>Independent arbitration for complex privacy disputes</li>
                <li>Legal proceedings in appropriate courts of competent jurisdiction</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Children's Privacy Protection</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 text-sm">
                      <strong>Age Restriction Notice:</strong> Our Services are not intended for, marketed to, or designed to attract children under the age of 18 years.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                We do not knowingly collect, use, or disclose personal information from children under 18 years of age without appropriate parental or guardian consent. If we become aware that we have inadvertently collected personal information from a child under 18:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>We will take immediate steps to verify the age of the individual</li>
                <li>We will seek appropriate parental consent where required</li>
                <li>We will delete the information if consent cannot be obtained</li>
                <li>We will implement additional safeguards to prevent future inadvertent collection</li>
                <li>We will notify relevant authorities if required by law</li>
              </ul>

              <p className="text-gray-700 leading-relaxed">
                Parents and guardians who believe their child's personal information has been collected by us should contact our Privacy Officer immediately for assistance.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Policy Updates and Amendments</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to update this Privacy Policy to reflect changes in our practices, technology, legal requirements, or business operations. When we make changes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>We will post the updated policy on our website with a new effective date</li>
                <li>We will provide 30 days' notice of material changes via email or account notifications</li>
                <li>We will maintain previous versions of the policy for reference and compliance purposes</li>
                <li>We will clearly highlight significant changes in our communications</li>
                <li>We will provide opportunities for feedback during consultation periods where appropriate</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-6">
                Your continued use of our Services after policy updates constitutes acceptance of the revised terms. If you do not agree with the updated policy, you may terminate your account in accordance with our Terms of Service.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information and Privacy Officer</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Officer Details</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For all privacy-related inquiries, complaints, access requests, or concerns regarding this Privacy Policy, please contact our designated Privacy Officer:
                </p>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start space-x-3">
                    <span className="font-semibold min-w-20">Email:</span>
                    <span>privacy@fairform.ai</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="font-semibold min-w-20">Phone:</span>
                    <span>+61 2 8123 4567 (Business hours: 9:00 AM - 5:00 PM AEST)</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="font-semibold min-w-20">Post:</span>
                    <div>
                      <p>Privacy Officer</p>
                      <p>FairForm Pty Ltd</p>
                      <p>[Company Address]</p>
                      <p>Australia</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="font-semibold min-w-20">Reference:</span>
                    <span>Privacy Policy Inquiry - [Insert Reference Number]</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    <strong>Response Time:</strong> We aim to respond to all privacy inquiries within 5 business days and provide substantive responses within 30 days as required under Australian privacy law.
                  </p>
                </div>
              </div>
            </section>

            {/* Final Legal Notice */}
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-900 text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Legal Compliance Statement</h3>
                <div className="text-sm space-y-3">
                  <p>
                    This Privacy Policy has been prepared in compliance with the Privacy Act 1988 (Cth), Australian Privacy Principles, Notifiable Data Breaches scheme, and all applicable federal and state privacy legislation in Australia.
                  </p>
                  <p>
                    This policy should be read in conjunction with our Terms of Service, Data Processing Agreements, and other legal documentation. In the event of any conflict between this Privacy Policy and applicable law, the law will prevail.
                  </p>
                  <p>
                    <strong>Effective Date:</strong> 1 December 2024 | <strong>Next Review:</strong> 1 December 2025
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md"></div>
              <span className="font-medium text-gray-900">FairForm</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <NavigationLink href="/privacy" className="hover:text-gray-900 transition-colors font-medium text-gray-900">
                Privacy Policy
              </NavigationLink>
              <NavigationLink href="/terms" className="hover:text-gray-900 transition-colors">
                Terms of Service
              </NavigationLink>
              <NavigationLink href="/contact" className="hover:text-gray-900 transition-colors">
                Contact
              </NavigationLink>
              <NavigationLink href="/help" className="hover:text-gray-900 transition-colors">
                Help
              </NavigationLink>
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
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-green-900">Quality Assured</div>
                    <div className="text-xs text-green-700">Industry Standards</div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 max-w-md">
                * Compliance badges represent our commitment to industry standards. Users should verify specific requirements for their registration status.
              </div>
              
              <div>© 2024 FairForm. All rights reserved.</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-100 mt-8 pt-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Important Legal Disclaimer</h3>
              <div className="text-xs text-gray-600 space-y-2 leading-relaxed">
                <p>
                  <strong>Professional Advice:</strong> FairForm provides AI-generated compliance documents for informational purposes only. These documents do not constitute legal, professional, or regulatory advice. Users should always consult with qualified legal professionals, compliance specialists, or industry experts before implementing any policies or procedures.
                </p>
                <p>
                  <strong>Refund Policy:</strong> All sales are final. Due to the instant digital delivery nature of our products, refunds are not provided once documents have been downloaded. We encourage users to carefully review product descriptions and contact our support team with questions before purchasing.
                </p>
                <p>
                  <strong>NDIS Compliance:</strong> Our NDIS document templates are designed to align with NDIS Practice Standards and Quality and Safeguards Framework. However, NDIS compliance requirements may vary by provider type and services offered. Users must ensure their specific obligations are met.
                </p>
                <p>
                  <strong>Regulatory Compliance:</strong> While our documents are designed to align with current regulatory standards, compliance requirements vary by jurisdiction, industry, and specific business circumstances. Users are solely responsible for ensuring their policies meet applicable laws and regulations in their specific context.
                </p>
                <p>
                  <strong>No Warranty:</strong> FairForm makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for purpose of generated documents. We do not guarantee that our documents will ensure regulatory compliance or prevent legal issues.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, FairForm, its officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our platform or generated documents.
                </p>
                <p>
                  <strong>User Responsibility:</strong> Users must review, customize, and validate all generated documents for their specific needs, applicable laws, and industry standards. Regular updates and reviews of policies are essential to maintain compliance as regulations evolve.
                </p>
                <p>
                  <strong>Audit and Implementation:</strong> While our documents are designed to support your compliance efforts, users should conduct their own compliance audits and seek professional guidance for implementation and ongoing compliance monitoring.
                </p>
                <p className="pt-2 border-t border-gray-200">
                  By using FairForm, you acknowledge that you have read, understood, and agree to these terms. You confirm that you will seek appropriate professional advice and conduct proper due diligence before implementing any generated documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}