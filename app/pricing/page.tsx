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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need for compliance
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional-grade features designed for modern businesses.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast Generation",
                  description: "Create comprehensive policy documents in under 60 seconds. Our AI engine processes complex requirements instantly."
                },
                {
                  icon: Shield,
                  title: "Audit-Ready Documents", 
                  description: "Every document meets regulatory standards and passes professional audits. Guarantee compliance with confidence."
                },
                {
                  icon: Brain,
                  title: "Industry Expertise",
                  description: "Trained on thousands of compliance documents across 10+ industries including NDIS, construction, healthcare, and more."
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Share, review, and collaborate on policies with your entire team. Track changes and maintain version control."
                },
                {
                  icon: Download,
                  title: "Export Anywhere",
                  description: "Download as PDF, Word, or integrate with your existing document management systems via our API."
                },
                {
                  icon: Clock,
                  title: "Always Up-to-Date",
                  description: "Policies automatically reflect the latest regulatory changes. Never worry about outdated compliance requirements."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white rounded-lg p-6 border border-gray-200"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions? We've got answers
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know to make the right decision today.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How much will I really save vs hiring consultants?",
                  answer: "Compliance consultants typically charge $5,000-$15,000+ for basic documentation packages. Our Pro Pack at $189 gives you the same professional quality for 95% less. That's $7,000+ saved on your first purchase alone."
                },
                {
                  question: "Are these documents actually legally compliant?",
                  answer: "Yes! Every document follows current regulatory frameworks and industry standards. However, we recommend having them reviewed by your legal team for your specific situation - just like you would with any consultant's work."
                },
                {
                  question: "How do I know these are better than consultant documents?",
                  answer: "Our documents are created using the same frameworks and standards that top-tier consultants use, but with AI precision and consistency. Many consultants actually use similar templates - you're just cutting out the middleman and markup."
                },
                {
                  question: "How quickly can I get my documents?",
                  answer: "Instantly! As soon as your payment is confirmed, you'll receive download links for all your documents. No waiting weeks for consultants - you can be compliant in the next 5 minutes."
                },
                {
                  question: "Can I really customize these with my branding?",
                  answer: "Absolutely! Our Pro Pack and higher include fully editable Word documents. Remove watermarks, add your logo, customize content, and make them 100% yours. It's like having a consultant create them just for you."
                },
                {
                  question: "What if my industry isn't listed?",
                  answer: "Contact us! We create custom compliance packs for unique industries all the time. Many of our most popular packs started as custom requests. We'll work with you to create exactly what you need."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-green-800 font-semibold mb-2">Still have questions?</p>
                <p className="text-green-700 text-sm mb-4">Get answers from our compliance experts in under 2 hours</p>
                <NavigationLink 
                  href="/contact" 
                  className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat with Expert</span>
                </NavigationLink>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full inline-block mb-8">
              <span className="font-bold">LIMITED TIME: Save up to 95% vs consultants</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't wait weeks for compliance.
              <br />
              <span className="text-yellow-400">Get it done today.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 200+ businesses who chose instant compliance over expensive consultants. Download your documents in the next 5 minutes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-400 mb-2">$7,311</div>
                <div className="text-white text-sm">Average savings vs consultants</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">60 sec</div>
                <div className="text-white text-sm">Time to get compliant</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">200+</div>
                <div className="text-white text-sm">Businesses trust Formative</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => {
                  const pricingSection = document.getElementById('pricing')
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-10 py-5 rounded-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2 text-xl shadow-xl"
              >
                <span>Get Instant Compliance</span>
                <ArrowRight className="w-6 h-6" />
              </button>
              <NavigationLink
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-10 py-5 rounded-lg transition-all inline-flex items-center space-x-2 text-xl"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Talk to Expert First</span>
              </NavigationLink>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Instant download</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-400" />
                <span>Lifetime access</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Logo width={24} height={24} showText={true} />
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <NavigationLink href="/privacy" className="hover:text-gray-900 transition-colors">
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
