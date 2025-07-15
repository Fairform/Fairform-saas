import { Shield, Award } from 'lucide-react'
import { NavigationLink } from './NavigationLink'

export const Footer = () => (
  <footer className="border-t border-gray-100">
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded-md"></div>
          <span className="font-medium text-gray-900">FairForm</span>
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
                <Award className="w-4 h-4 text-white" />
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
)
