'use client'

import { Shield, Check, Scale, AlertTriangle, FileText, Users, Lock, Globe, Gavel, CreditCard } from 'lucide-react'
import Logo from '../../components/Logo'

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

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="w-full border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavigationLink href="/" className="flex items-center space-x-2">
              <span className="text-lg font-medium text-gray-900">Formative</span>
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
            Terms of Service
          </h1>
          <div className="flex items-center space-x-4 text-lg text-gray-600">
            <span>Effective Date: 1 December 2024</span>
            <span>•</span>
            <span>Last Updated: 15 December 2024</span>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <Scale className="w-4 h-4" />
            <span>Governed by Australian Law and subject to the jurisdiction of Australian Courts</span>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-red-900 mb-2">Important Legal Agreement</h2>
              <p className="text-red-700 mb-4">
                These Terms of Service constitute a legally binding agreement between you and Formative Pty Ltd (ACN: [Company Number]). By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these terms and all applicable laws and regulations.
              </p>
              <p className="text-red-700">
                <strong>PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR SERVICES. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE THE SERVICES.</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-10">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Definitions and Interpretation</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">1.1 Definitions</h3>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>"Agreement"</strong> means these Terms of Service, as amended from time to time;</p>
                      <p><strong>"Australian Consumer Law"</strong> means the Australian Consumer Law contained in Schedule 2 of the Competition and Consumer Act 2010 (Cth);</p>
                      <p><strong>"Business Day"</strong> means a day that is not a Saturday, Sunday, or public holiday in New South Wales, Australia;</p>
                      <p><strong>"Confidential Information"</strong> means any proprietary, confidential, or commercially sensitive information disclosed by either party;</p>
                      <p><strong>"Content"</strong> means all text, documents, policies, templates, data, graphics, images, and other materials;</p>
                      <p><strong>"Fees"</strong> means all charges, subscription fees, usage fees, and other amounts payable for the Services;</p>
                    </div>
                    <div>
                      <p><strong>"Force Majeure Event"</strong> means any cause beyond the reasonable control of a party, including acts of God, war, terrorism, pandemic, or government action;</p>
                      <p><strong>"Intellectual Property Rights"</strong> means all intellectual property rights, including patents, trade marks, copyrights, trade secrets, and know-how;</p>
                      <p><strong>"Personal Information"</strong> has the meaning given in the Privacy Act 1988 (Cth);</p>
                      <p><strong>"Services"</strong> means all software, applications, platforms, websites, APIs, content, and related services provided by Formative;</p>
                      <p><strong>"User"</strong> or "you" means any individual or entity accessing or using the Services;</p>
                      <p><strong>"User Content"</strong> means all content, data, and materials uploaded, created, or generated by Users;</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">1.2 Interpretation</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>References to "include" or "including" are not limiting and mean "include without limitation"</li>
                <li>References to statutes include all amendments, replacements, and subordinate legislation</li>
                <li>Headings are for convenience only and do not affect interpretation</li>
                <li>Where context permits, singular includes plural and vice versa</li>
                <li>References to persons include corporations, partnerships, and other legal entities</li>
                <li>References to Australian dollars (AUD) are to the lawful currency of Australia</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Agreement Formation and Acceptance</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">2.1 Contractual Capacity and Authority</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using the Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>You are at least 18 years of age or the age of majority in your jurisdiction</li>
                <li>You have the legal capacity to enter into binding contracts</li>
                <li>If acting for an organisation, you have authority to bind that organisation to this Agreement</li>
                <li>Your execution and performance of this Agreement will not violate any applicable laws or other agreements</li>
                <li>All information provided during registration is accurate, complete, and current</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">2.2 Electronic Acceptance</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>Electronic Transactions Act Compliance:</strong> This Agreement may be executed electronically in accordance with the Electronic Transactions Act 1999 (Cth) and equivalent state legislation. Your electronic acceptance constitutes execution of this Agreement.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">2.3 Business vs Consumer Classification</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services are primarily intended for business use. Where you acquire Services for business purposes, certain consumer protections under the Australian Consumer Law may not apply. We will clearly identify any consumer transactions and ensure compliance with applicable consumer protection legislation.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Services Description and Scope</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">3.1 Core Services</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Document Generation Services</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• AI-powered policy and procedure generation</li>
                    <li>• Industry-specific compliance documentation</li>
                    <li>• Template customisation and personalisation</li>
                    <li>• Multi-format document export capabilities</li>
                    <li>• Version control and document management</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Collaboration Platform</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Team workspace and sharing capabilities</li>
                    <li>• Role-based access control and permissions</li>
                    <li>• Real-time collaboration and editing features</li>
                    <li>• Comment and review workflow systems</li>
                    <li>• Audit trails and activity monitoring</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Compliance Solutions</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Regulatory framework alignment</li>
                    <li>• Industry standard compliance checking</li>
                    <li>• Audit preparation and documentation</li>
                    <li>• Compliance monitoring and updates</li>
                    <li>• Expert advisory and consultation services</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-6 h-6 text-gray-600" />
                    <h4 className="text-md font-semibold text-gray-900">Platform Integration</h4>
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• API access and integration capabilities</li>
                    <li>• Third-party software connectivity</li>
                    <li>• Data import and export functionality</li>
                    <li>• Custom workflow automation</li>
                    <li>• Enterprise system integration</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">3.2 Service Levels and Availability</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We endeavour to provide Services with 99.5% uptime availability, measured monthly and excluding scheduled maintenance. Service levels may vary based on your subscription tier and are subject to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Planned maintenance windows (notified 48 hours in advance)</li>
                <li>Emergency maintenance and security updates</li>
                <li>Force Majeure Events and circumstances beyond our control</li>
                <li>Third-party service dependencies and internet connectivity issues</li>
                <li>User-specific technical limitations and configuration issues</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">3.3 Service Modifications and Updates</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to modify, update, suspend, or discontinue any aspect of the Services at any time, with or without notice, provided that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Material changes affecting paid Services will be communicated with 30 days' notice</li>
                <li>Discontinued features will be replaced with substantially equivalent functionality where possible</li>
                <li>Users will be provided migration tools and assistance for significant platform changes</li>
                <li>Emergency changes required for security or legal compliance may be implemented immediately</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Registration, Accounts, and Access</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">4.1 Account Registration Requirements</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 text-sm">
                      <strong>Identity Verification:</strong> We may require verification of your identity and business registration for certain Services in compliance with Australian anti-money laundering and counter-terrorism financing legislation.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain Services, you must create an account by providing:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Accurate and complete personal or business information</li>
                <li>Valid contact details including email address and phone number</li>
                <li>Secure authentication credentials (username and password)</li>
                <li>Business registration details (ABN/ACN) where applicable</li>
                <li>Professional licensing information for regulated industries</li>
                <li>Payment information for subscription or purchase transactions</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">4.2 Account Security and Responsibilities</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You are responsible for maintaining the security and confidentiality of your account credentials and for all activities occurring under your account. You must:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Use strong, unique passwords and enable two-factor authentication</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Immediately notify us of any unauthorised access or security breaches</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Regularly update your account information and contact details</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Monitor account activity and report suspicious transactions</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Comply with all applicable laws and regulations in your use</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Maintain accurate business and professional licensing information</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Ensure authorised personnel only access your account</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Log out from shared or public computers after use</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">4.3 Account Suspension and Termination</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may suspend or terminate your account immediately, without prior notice, if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>You breach any provision of this Agreement or our policies</li>
                <li>You engage in fraudulent, illegal, or harmful activities</li>
                <li>You violate intellectual property rights or applicable laws</li>
                <li>Your account poses a security risk to our systems or other users</li>
                <li>You fail to pay fees when due (after reasonable notice period)</li>
                <li>We are required to do so by law or regulatory authority</li>
                <li>You provide false or misleading information during registration</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription Plans and Pricing Structure</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">5.1 Service Tiers and Pricing</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <h4 className="text-md font-semibold text-gray-900">One-Time Document Packages</h4>
                  </div>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Lite Pack (PDF Only)</span>
                      <span className="font-semibold">$79 AUD</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Professional Pack (Editable)</span>
                      <span className="font-semibold">$189 AUD</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>NDIS Compliance Suite</span>
                      <span className="font-semibold">$499 AUD</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Industry-Specific Packages</span>
                      <span className="font-semibold">$349+ AUD</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-green-600" />
                    <h4 className="text-md font-semibold text-gray-900">Monthly Subscription Plans</h4>
                  </div>
                  <div className="space-y-3 text-gray-700 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Starter (Limited Access)</span>
                      <span className="font-semibold">$129 AUD/month</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Professional (Full Access)</span>
                      <span className="font-semibold">$179 AUD/month</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span>Agency (Multi-Client)</span>
                      <span className="font-semibold">$499 AUD/month</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Enterprise (Custom)</span>
                      <span className="font-semibold">Quote on Request</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">5.2 Payment Terms and Conditions</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  <strong>GST Notice:</strong> All prices are inclusive of Australian Goods and Services Tax (GST) where applicable. GST-registered businesses will receive tax invoices compliant with Australian taxation law.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Payment terms and conditions:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Payment Due:</strong> Subscription fees are due in advance on the commencement date and each renewal period</li>
                <li><strong>Payment Methods:</strong> We accept major credit cards, bank transfers, and approved corporate payment methods</li>
                <li><strong>Currency:</strong> All fees are quoted and payable in Australian Dollars (AUD) unless otherwise specified</li>
                <li><strong>Late Payment:</strong> Overdue accounts may incur late payment fees and interest charges at the Reserve Bank of Australia cash rate plus 2%</li>
                <li><strong>Failed Payments:</strong> Service access may be suspended for failed payments until account is brought current</li>
                <li><strong>Disputed Charges:</strong> Payment disputes must be raised within 60 days of the charge date</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">5.3 Automatic Renewal and Cancellation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Subscription services automatically renew for successive periods equal to the initial term unless cancelled. Cancellation terms:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Notice Period:</strong> Cancellation must be provided at least 30 days before the next billing cycle</li>
                <li><strong>Cancellation Method:</strong> Cancellations must be submitted through your account dashboard or written notice to our billing department</li>
                <li><strong>Effective Date:</strong> Cancellations take effect at the end of the current billing period</li>
                <li><strong>Data Access:</strong> You retain access to your data for 90 days after cancellation to facilitate export</li>
                <li><strong>Refund Policy:</strong> No refunds are provided for partial billing periods or unused portions of prepaid services</li>
              </ol>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights and Licensing</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">6.1 Our Intellectual Property Rights</h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-purple-800 text-sm">
                      <strong>Copyright Notice:</strong> All content, software, designs, algorithms, and methodologies used in our Services are protected by Australian and international intellectual property laws.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                We own or license all Intellectual Property Rights in the Services, including but not limited to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Software source code, algorithms, and technical methodologies</li>
                  <li>• User interface designs, graphics, and visual elements</li>
                  <li>• Document templates, frameworks, and generation engines</li>
                  <li>• Database structures, schemas, and data models</li>
                  <li>• Trade marks, logos, and brand elements</li>
                </ul>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Training data, machine learning models, and AI systems</li>
                  <li>• Documentation, user guides, and educational materials</li>
                  <li>• API specifications and integration protocols</li>
                  <li>• Business processes, workflows, and operational procedures</li>
                  <li>• Proprietary compliance frameworks and assessment tools</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">6.2 License Granted to Users</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Subject to your compliance with this Agreement and payment of applicable fees, we grant you a limited, non-exclusive, non-transferable, revocable license to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Access and use the Services for your internal business purposes</li>
                <li>Generate, download, and use documents created through the Services</li>
                <li>Modify and customise generated documents for your specific needs</li>
                <li>Share generated documents within your organisation and with clients</li>
                <li>Create derivative works based on generated documents for internal use</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">6.3 Restrictions and Prohibited Uses</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  <strong>Strict Prohibition:</strong> The following activities are strictly prohibited and may result in immediate account termination and legal action.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                You may not:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Reverse engineer, decompile, or disassemble our software</li>
                  <li>• Copy, reproduce, or distribute our proprietary templates</li>
                  <li>• Create competing services using our methodologies</li>
                  <li>• Remove or alter copyright notices and attribution</li>
                  <li>• Use our Services to develop rival platforms</li>
                </ul>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Sublicense, rent, lease, or sell access to the Services</li>
                  <li>• Extract or harvest data using automated means</li>
                  <li>• Attempt to gain unauthorised access to our systems</li>
                  <li>• Use our brand or trademarks without written permission</li>
                  <li>• Circumvent usage limitations or access controls</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">6.4 User Content and Generated Documents</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You retain ownership of content you upload or create using our Services, subject to the following:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Generated Documents:</strong> You own the specific documents generated for your use, but we retain ownership of the underlying templates and generation methodologies</li>
                <li><strong>User Content License:</strong> You grant us a license to use your content solely for providing the Services and improving our algorithms</li>
                <li><strong>Feedback Rights:</strong> Any feedback, suggestions, or improvements you provide may be incorporated into our Services without compensation</li>
                <li><strong>Anonymised Data:</strong> We may use anonymised and aggregated data derived from your usage for research and service improvement</li>
              </ol>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. User Conduct and Acceptable Use Policy</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">7.1 General Conduct Requirements</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All users must comply with applicable laws and maintain professional standards when using our Services. You agree to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Use Services only for lawful business purposes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Respect intellectual property rights of all parties</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Maintain accurate and truthful information</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Protect confidential information appropriately</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Cooperate with security and compliance investigations</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Report security vulnerabilities responsibly</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Follow professional ethics and standards</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Respect system limitations and fair usage policies</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">7.2 Prohibited Activities</h3>
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Illegal and Harmful Activities</h4>
                  <p className="text-gray-700 text-sm">Engaging in money laundering, fraud, terrorism financing, drug trafficking, human trafficking, or any other criminal activities. Using Services to facilitate illegal gambling, weapons trafficking, or violation of sanctions laws.</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                  <h4 className="font-semibold text-gray-900 mb-2">System Abuse and Security Violations</h4>
                  <p className="text-gray-700 text-sm">Attempting to hack, breach, or compromise our systems. Distributing malware, viruses, or conducting denial-of-service attacks. Attempting to access accounts or data belonging to other users.</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Intellectual Property Infringement</h4>
                  <p className="text-gray-700 text-sm">Uploading copyrighted materials without permission. Creating documents that infringe patents, trademarks, or trade secrets. Misrepresenting ownership of intellectual property or content.</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50">
                  <h4 className="font-semibold text-gray-900 mb-2">Misuse of Generated Documents</h4>
                  <p className="text-gray-700 text-sm">Creating fraudulent compliance documentation. Misrepresenting compliance status to regulators or clients. Using generated documents for purposes they were not designed for.</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">7.3 Enforcement and Consequences</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Violations of this Acceptable Use Policy may result in:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Warning and Account Review:</strong> First-time minor violations may result in warnings and mandatory compliance training</li>
                <li><strong>Feature Restrictions:</strong> Temporary or permanent restriction of specific platform features or capabilities</li>
                <li><strong>Account Suspension:</strong> Temporary suspension of account access pending investigation and remediation</li>
                <li><strong>Account Termination:</strong> Permanent termination of account and deletion of data for serious or repeated violations</li>
                <li><strong>Legal Action:</strong> Civil and criminal prosecution for illegal activities, fraud, or intellectual property infringement</li>
                <li><strong>Regulatory Reporting:</strong> Reporting to relevant authorities as required by law, including AUSTRAC, ASIC, or law enforcement</li>
              </ol>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers and Professional Advice Limitations</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-900 mb-2">Critical Legal Disclaimer</h3>
                    <p className="text-red-700 mb-4">
                      <strong>Formative IS NOT A LAW FIRM and our Services DO NOT constitute legal, financial, accounting, or professional advice.</strong> The documents and information provided are for general informational purposes only and may not be suitable for your specific circumstances.
                    </p>
                    <p className="text-red-700">
                      You must seek independent professional advice from qualified practitioners before implementing any policies, procedures, or compliance measures generated through our Services.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">8.1 Service Disclaimers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services are provided "as is" and "as available" without warranties of any kind. We specifically disclaim:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• <strong>Fitness for Purpose:</strong> Documents may not be suitable for all business situations</li>
                  <li>• <strong>Accuracy:</strong> Generated content may contain errors or omissions</li>
                  <li>• <strong>Completeness:</strong> Documents may not address all applicable requirements</li>
                  <li>• <strong>Currency:</strong> Information may become outdated or superseded</li>
                  <li>• <strong>Jurisdiction:</strong> Content may not apply to all legal jurisdictions</li>
                </ul>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• <strong>Regulatory Approval:</strong> No guarantee of regulator acceptance</li>
                  <li>• <strong>Audit Success:</strong> No guarantee documents will pass audits</li>
                  <li>• <strong>Legal Compliance:</strong> No guarantee of compliance with all laws</li>
                  <li>• <strong>Business Outcomes:</strong> No guarantee of specific results</li>
                  <li>• <strong>Third-Party Content:</strong> Accuracy of incorporated external content</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">8.2 Professional Responsibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>You are solely responsible for determining the suitability of generated documents for your needs</li>
                <li>You must review, validate, and customise all documents before implementation</li>
                <li>You should engage qualified professionals for legal, financial, and regulatory advice</li>
                <li>You must conduct your own compliance assessments and due diligence</li>
                <li>You remain liable for all compliance obligations regardless of document source</li>
                <li>You must stay informed of changes to applicable laws and regulations</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">8.3 Australian Consumer Law Compliance</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <strong>Consumer Rights:</strong> Where you acquire our Services as a consumer under the Australian Consumer Law, certain rights and remedies may apply that cannot be excluded or modified by this Agreement.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                To the extent permitted by law, our liability for breach of consumer guarantees is limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Re-supplying the Services or paying for re-supply of the Services</li>
                <li>Repairing defects or paying for repair of defects</li>
                <li>Replacing non-conforming Services or paying for replacement</li>
                <li>Refunding the price paid where appropriate remedies are not possible</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability and Indemnification</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">9.1 Limitation of Liability</h3>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-6">
                <p className="text-gray-800 text-sm mb-4">
                  <strong>Maximum Liability Cap:</strong> To the maximum extent permitted by applicable law, our total aggregate liability to you for all claims arising from or relating to this Agreement shall not exceed the greater of:
                </p>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• The total fees paid by you in the 12 months preceding the claim; or</li>
                  <li>• AUD $1,000</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Loss of profits, revenue, or business opportunities</li>
                  <li>• Loss of data, files, or business information</li>
                  <li>• Business interruption or operational delays</li>
                  <li>• Regulatory fines, penalties, or sanctions</li>
                  <li>• Legal costs and professional fees</li>
                </ul>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Reputational damage or loss of goodwill</li>
                  <li>• Third-party claims or enforcement actions</li>
                  <li>• Audit failures or compliance deficiencies</li>
                  <li>• Market losses or investment damages</li>
                  <li>• Consequential business decisions or actions</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">9.2 User Indemnification Obligations</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Formative, its officers, directors, employees, agents, and contractors from and against all claims, damages, losses, costs, and expenses (including reasonable legal fees) arising from or relating to:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Your Use of Services:</strong> Any use of our Services in violation of this Agreement or applicable laws</li>
                <li><strong>Your Content:</strong> Any content you upload, generate, or share through our platform</li>
                <li><strong>Third-Party Claims:</strong> Claims by third parties arising from your implementation or use of generated documents</li>
                <li><strong>Regulatory Actions:</strong> Government or regulatory enforcement actions related to your compliance practices</li>
                <li><strong>Intellectual Property:</strong> Claims of infringement arising from your modification or use of generated materials</li>
                <li><strong>Business Decisions:</strong> Decisions made based on information or documents obtained through our Services</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">9.3 Force Majeure</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Neither party shall be liable for any failure or delay in performance due to Force Majeure Events, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Natural disasters, pandemics, and public health emergencies</li>
                <li>War, terrorism, civil unrest, and political instability</li>
                <li>Government actions, regulatory changes, and court orders</li>
                <li>Internet infrastructure failures and cyber attacks</li>
                <li>Third-party service disruptions and supply chain failures</li>
                <li>Labour disputes, strikes, and workforce unavailability</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.1 Governing Law and Jurisdiction</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Gavel className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-blue-800 text-sm">
                      <strong>Australian Jurisdiction:</strong> This Agreement is governed by the laws of New South Wales, Australia, and the Commonwealth of Australia. All disputes shall be subject to the exclusive jurisdiction of the courts of New South Wales.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                By using our Services, you irrevocably submit to the jurisdiction of Australian courts and agree that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Australian law governs the interpretation and enforcement of this Agreement</li>
                <li>The courts of New South Wales have exclusive jurisdiction over all disputes</li>
                <li>You will not claim that such courts lack jurisdiction or are an inconvenient forum</li>
                <li>Process may be served by any means permitted by Australian law</li>
                <li>You appoint an agent for service of process if you are located outside Australia</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.2 Dispute Resolution Process</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before commencing legal proceedings, the parties agree to attempt resolution through the following process:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-3 mb-6">
                <li><strong>Direct Negotiation (30 days):</strong> Good faith discussions between authorised representatives to resolve the dispute</li>
                <li><strong>Mediation (60 days):</strong> Binding mediation through the Australian Disputes Centre or equivalent accredited service</li>
                <li><strong>Expert Determination:</strong> For technical disputes, determination by an independent expert agreed upon by both parties</li>
                <li><strong>Arbitration:</strong> Final and binding arbitration under the Commercial Arbitration Act 2010 (NSW) where applicable</li>
                <li><strong>Court Proceedings:</strong> Litigation in the Supreme Court of New South Wales or Federal Court of Australia as appropriate</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.3 Class Action Waiver</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 text-sm">
                  <strong>Individual Claims Only:</strong> To the extent permitted by law, you agree to resolve disputes on an individual basis and waive any right to participate in class action lawsuits or representative proceedings.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">10.4 Injunctive Relief</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Notwithstanding the dispute resolution process, either party may seek immediate injunctive or equitable relief from courts of competent jurisdiction to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Protect intellectual property rights and confidential information</li>
                <li>Prevent ongoing breaches of security or acceptable use policies</li>
                <li>Enforce payment obligations and collect outstanding debts</li>
                <li>Prevent irreparable harm that cannot be adequately compensated by damages</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination and Post-Termination Obligations</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">11.1 Termination Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Agreement may be terminated in the following circumstances:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Termination by User</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• At any time with 30 days' written notice</li>
                      <li>• Immediately for material breach by Formative</li>
                      <li>• Upon completion of one-time purchases</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Termination by Formative</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Immediately for breach of Agreement</li>
                      <li>• For non-payment after 14 days' notice</li>
                      <li>• For violation of acceptable use policy</li>
                      <li>• Upon cessation of business operations</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Automatic Termination</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Insolvency or bankruptcy proceedings</li>
                      <li>• Regulatory prohibition or licensing loss</li>
                      <li>• Criminal conviction related to Services</li>
                      <li>• Extended suspension (90+ days)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Mutual Termination</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• By written agreement of both parties</li>
                      <li>• Upon completion of project-based work</li>
                      <li>• Due to Force Majeure exceeding 180 days</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">11.2 Post-Termination Data and Access</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Upon termination of this Agreement:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Immediate Effect:</strong> Your access to the Services will be suspended or terminated as specified in the termination notice</li>
                <li><strong>Data Export Period:</strong> You will have 90 days to export your data and generated documents</li>
                <li><strong>Account Closure:</strong> Your account and associated data will be permanently deleted after the export period</li>
                <li><strong>Outstanding Obligations:</strong> All outstanding fees and charges remain due and payable</li>
                <li><strong>Document Rights:</strong> You may continue to use previously downloaded documents subject to applicable license terms</li>
                <li><strong>Support Services:</strong> Technical support will be limited to data export assistance only</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">11.3 Survival of Terms</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following provisions shall survive termination of this Agreement:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Payment obligations for Services rendered prior to termination</li>
                <li>Intellectual property rights and license restrictions</li>
                <li>Confidentiality obligations and non-disclosure requirements</li>
                <li>Limitation of liability and indemnification provisions</li>
                <li>Governing law and dispute resolution clauses</li>
                <li>Data protection and privacy obligations</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. General Provisions and Legal Requirements</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">12.1 Amendment and Modification</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may amend this Agreement at any time by posting the revised terms on our website. Material changes will be communicated as follows:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Notice Period:</strong> 30 days' advance notice for material changes affecting existing users</li>
                <li><strong>Communication Method:</strong> Email notification to your registered address and prominent website display</li>
                <li><strong>Acceptance:</strong> Continued use after the effective date constitutes acceptance of revised terms</li>
                <li><strong>Rejection:</strong> You may terminate your account if you do not agree to the revised terms</li>
                <li><strong>Version Control:</strong> Previous versions of terms will be archived for reference</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">12.2 Entire Agreement and Precedence</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Agreement, together with our Privacy Policy and any executed addenda, constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements. In case of conflict:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
                <li>Executed written addenda and amendments take precedence</li>
                <li>These Terms of Service govern general platform use</li>
                <li>Service-specific terms apply to particular features</li>
                <li>Privacy Policy governs data protection matters</li>
                <li>Applicable law overrides conflicting contractual provisions</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">12.3 Severability and Waiver</h3>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
                <p className="text-gray-700 text-sm">
                  <strong>Severability:</strong> If any provision of this Agreement is found to be unenforceable or invalid, the remainder shall remain in full force and effect. Invalid provisions will be replaced with enforceable terms that most closely reflect the original intent.
                </p>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Waiver:</strong> No waiver of any provision shall be effective unless in writing and signed by the waiving party. Failure to enforce any right or provision does not constitute a waiver of future enforcement.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">12.4 Assignment and Transfer</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not assign, transfer, or sublicense your rights under this Agreement without our prior written consent. We may assign this Agreement in connection with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Corporate reorganisation, merger, or acquisition</li>
                <li>Sale of business assets or service lines</li>
                <li>Change of control or ownership structure</li>
                <li>Outsourcing arrangements with qualified service providers</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">12.5 Notices and Communications</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All legal notices must be in writing and delivered to the addresses specified in your account or our contact information. Notices are deemed effective:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Email: Upon successful delivery confirmation</li>
                <li>Registered post: 5 business days after posting</li>
                <li>Courier: Upon delivery confirmation</li>
                <li>Personal service: Upon actual delivery</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information and Legal Service</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Entity and Contact Details</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Company Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Entity Name:</strong> Formative Pty Ltd</p>
                        <p><strong>ACN:</strong> [Company Number]</p>
                        <p><strong>ABN:</strong> [Business Number]</p>
                        <p><strong>ASIC Registration:</strong> [Registration Details]</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Legal Correspondence</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Email:</strong> legal@formative.ai</p>
                        <p><strong>Phone:</strong> +61 2 8123 4567</p>
                        <p><strong>Business Hours:</strong> 9:00 AM - 5:00 PM AEST</p>
                        <p><strong>Emergency:</strong> Available 24/7 for critical issues</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Registered Office Address</h4>
                    <div className="text-sm">
                      <p>Formative Pty Ltd</p>
                      <p>[Registered Office Address]</p>
                      <p>[City, State, Postal Code]</p>
                      <p>Australia</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Service of Legal Process</h4>
                    <p className="text-sm">
                      Legal documents may be served at the registered office address above or via email to legal@formative.ai with confirmation of receipt. International users may serve process through the Australian Securities and Investments Commission (ASIC) or as otherwise permitted by law.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Legal Notice */}
            <section className="border-t border-gray-200 pt-8">
              <div className="bg-gray-900 text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Legal Compliance and Acknowledgment</h3>
                <div className="text-sm space-y-3">
                  <p>
                    These Terms of Service have been prepared in accordance with Australian contract law, consumer protection legislation, and applicable industry regulations. This Agreement complies with the Competition and Consumer Act 2010 (Cth), Australian Securities and Investments Commission Act 2001 (Cth), and relevant state and territory legislation.
                  </p>
                  <p>
                    By clicking "I Accept" or by accessing our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. You confirm that you have authority to enter into this Agreement and that your use of our Services will comply with all applicable legal requirements.
                  </p>
                  <p>
                    <strong>Document Version:</strong> 3.2 | <strong>Effective Date:</strong> 1 December 2024 | <strong>Next Review:</strong> 1 June 2025
                  </p>
                  <p>
                    <strong>Legal Review:</strong> This Agreement has been reviewed by qualified Australian legal practitioners specialising in technology law, consumer protection, and commercial contracts.
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
              <span className="text-lg font-medium text-gray-900">Formative</span>
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <NavigationLink href="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy Policy
              </NavigationLink>
              <NavigationLink href="/terms" className="hover:text-gray-900 transition-colors font-medium text-gray-900">
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
                  <strong>Refund Policy:</strong> All sales are final. Due to the instant digital delivery nature of our products, refunds are not provided once documents have been downloaded. We encourage users to carefully review product descriptions and contact our support team with questions before purchasing.
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
