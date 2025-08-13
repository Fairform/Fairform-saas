import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Formative</h3>
            <p className="text-sm text-gray-600">
              AI-powered compliance document generation for Australian businesses.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/audit" className="hover:text-gray-900">Smart Audit</Link></li>
              <li><Link href="/generate" className="hover:text-gray-900">Document Generator</Link></li>
              <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-900">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-gray-900">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/help" className="hover:text-gray-900">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; 2024 Formative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
