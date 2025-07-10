'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Zap, User, LogOut } from 'lucide-react'

interface User {
  id: string
  email: string
  subscription_status?: 'active' | 'inactive' | 'trial'
  plan_type?: 'lite' | 'pro' | 'enterprise'
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication and subscription status
  useEffect(() => {
    checkUserStatus()
  }, [])

  const checkUserStatus = async () => {
    try {
      // This will be replaced with actual Supabase auth check
      // For now, simulate the check
      const response = await fetch('/api/auth/user')
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.log('User not authenticated')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Check if user has access to premium features
  const hasActivePlan = user && 
    user.subscription_status === 'active' && 
    user.plan_type && 
    ['lite', 'pro', 'enterprise'].includes(user.plan_type)

  // Public navigation for non-paying users
  const publicNavigation = [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Pricing', href: '/pricing' },
  ]

  // Premium navigation only for paying customers
  const premiumNavigation = [
    { name: 'Products', href: '/products' },
    { name: 'Smart Compliance', href: '/smart-compliance' },
    { name: 'Document Engine', href: '/document-engine' },
    { name: 'Pricing', href: '/pricing' },
  ]

  // Choose navigation based on user status
  const navigation = hasActivePlan ? premiumNavigation : publicNavigation

  return (
    <header className="sticky-header">
      <div className="section-container !py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">FairForm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dashboard link for logged-in users */}
            {user && (
              <Link
                href="/dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Menu */}
                <div className="flex items-center space-x-2 text-text-secondary">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                  {user.plan_type && (
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                      {user.plan_type.toUpperCase()}
                    </span>
                  )}
                </div>
                
                {/* Generate Pack Button - only for paying customers */}
                {hasActivePlan ? (
                  <Link
                    href="/document-engine"
                    className="btn-glow"
                  >
                    Generate Pack
                  </Link>
                ) : (
                  <Link
                    href="/pricing"
                    className="btn-glow"
                  >
                    Upgrade Plan
                  </Link>
                )}
                
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-text-primary hover:text-primary-500 font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/pricing"
                  className="btn-glow"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              {/* Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-text-primary hover:text-primary-500 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Dashboard for logged-in users */}
              {user && (
                <Link
                  href="/dashboard"
                  className="text-text-primary hover:text-primary-500 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              {/* Mobile CTA Section */}
              {user ? (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <div className="text-sm text-gray-600">
                    Logged in as: {user.email}
                    {user.plan_type && (
                      <span className="block text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium mt-1 w-fit">
                        {user.plan_type.toUpperCase()} PLAN
                      </span>
                    )}
                  </div>
                  
                  {hasActivePlan ? (
                    <Link
                      href="/document-engine"
                      className="btn-glow text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Generate Pack
                    </Link>
                  ) : (
                    <Link
                      href="/pricing"
                      className="btn-glow text-center block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Upgrade Plan
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-left text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  <Link
                    href="/login"
                    className="text-text-primary hover:text-primary-500 font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/pricing"
                    className="btn-glow text-center block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}