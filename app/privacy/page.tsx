'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

          <p className="text-gray-700 mb-6">
            At FairForm, we are committed to protecting your personal information and your right to privacy. This privacy policy outlines how we collect, use, store, and disclose your information when you use our website, products, and services.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-4">
            We collect both personal and non-personal information when you interact with FairForm. This includes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>Your name, email address, and company details during sign-up</li>
            <li>Billing information when purchasing a plan</li>
            <li>Usage data such as generated documents, selected agents, and interaction logs</li>
            <li>Technical data such as browser type, IP address, and device information</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect for a variety of purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6">
            <li>To provide and improve our services</li>
            <li>To process payments and manage subscriptions</li>
            <li>To send important updates, receipts, and service notifications</li>
            <li>To personalize your experience based on your industry and preferences</li>
            <li>To conduct analytics and monitor service performance</li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10 mb-4">3. Sharing of Information</h2>
          <p className="text-gray-700 mb-6">
            We do not sell your personal data. We may share your information with trusted third parties who help us operate FairForm, such as payment processors (e.g. Stripe), analytics providers, and hosting services. These parties are contractually obligated to keep your data secure.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">4. Data Storage and Security</h2>
          <p className="text-gray-700 mb-6">
            Your data is stored securely in Supabase and AWS-backed infrastructure. We implement technical and organizational measures to protect it against unauthorized access, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">5. Cookies and Tracking</h2>
          <p className="text-gray-700 mb-6">
            We use cookies to enhance your experience, remember preferences, and analyze traffic. You can control or disable cookies via your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-6">
            You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <a href="mailto:support@fairform.com" className="text-blue-600 underline">support@fairform.com</a>.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">7. Data Retention</h2>
          <p className="text-gray-700 mb-6">
            We retain your data as long as your account is active or as needed to comply with our legal obligations. You may request full deletion of your account and associated data at any time.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. If we make significant changes, we’ll notify you via email or a banner on the site.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">9. Contact Us</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions or concerns about our privacy practices, contact us at:
          </p>
          <address className="text-gray-700 not-italic">
            FairForm Pty Ltd<br />
            123 Policy Street<br />
            Sydney, NSW 2000<br />
            Australia<br />
            Email: <a href="mailto:privacy@fairform.com" className="text-blue-600 underline">privacy@fairform.com</a>
          </address>
        </div>
      </main>

      <Footer />
    </div>
  )
}
