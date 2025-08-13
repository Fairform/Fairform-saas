'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Menu, X } from 'lucide-react';

function GenerateCTA() {
  const { user } = useAuth()
  
  const href = user ? '/generate' : '/(auth)/login?next=/generate'
  
  return (
    <Link 
      href={href} 
      className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
    >
      Generate Document
    </Link>
  )
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Smart Audit', href: '/audit' },
  { label: 'Products', href: '/product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const NAV_CTA = { label: 'Generate Document', href: '/generate' };

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="w-full border-b border-gray-100 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-4 py-2 rounded">
        Skip to content
      </a>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-lg font-medium text-gray-900">
            Formative
          </Link>
          
          <ul className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map(item => {
              const active = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm transition-colors ${
                      active 
                        ? 'text-gray-900 font-medium' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/(auth)/login"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <GenerateCTA />
            </>
          )}
        </div>

        <button 
          className="md:hidden p-2" 
          aria-expanded={open} 
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="md:hidden border-t bg-white">
          <ul className="px-6 py-4 space-y-3">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className="block py-2 text-sm text-gray-600 hover:text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user ? (
              <>
                <li>
                  <Link href="/dashboard" className="block py-2 text-sm text-gray-600" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="block py-2 text-sm text-gray-600">
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/(auth)/login" className="block py-2 text-sm text-gray-600" onClick={() => setOpen(false)}>
                    Log in
                  </Link>
                </li>
                <li>
                  <div className="block py-2">
                    <GenerateCTA />
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
