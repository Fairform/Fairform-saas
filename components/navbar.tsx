'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, LogOut, User, Settings, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-surface-dark/80 backdrop-blur-xl border-b border-border-subtle' : ''
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />
              <div className="relative w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
            </div>
            <span className="text-xl font-bold text-text-primary">Fairform</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-text-secondary hover:text-text-primary transition-colors">
              Features
            </Link>
            <Link href="/products" className="text-text-secondary hover:text-text-primary transition-colors">
              Products
            </Link>
            <Link href="/pricing" className="text-text-secondary hover:text-text-primary transition-colors">
              Pricing
            </Link>
            <Link href="/resources" className="text-text-secondary hover:text-text-primary transition-colors">
              Resources
            </Link>
          </div>
          
          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-medium">{user.name?.charAt(0) || user.email.charAt(0)}</span>
                  </div>
                  <ChevronDown className={cn(
                    'w-4 h-4 text-text-secondary transition-transform',
                    isUserMenuOpen && 'rotate-180'
                  )} />
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-surface-card border border-border-subtle rounded-xl shadow-xl overflow-hidden"
                    >
                      <div className="p-4 border-b border-border-subtle">
                        <p className="text-sm font-medium text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-elevated transition-colors">
                          <User className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm text-text-primary">Dashboard</span>
                        </Link>
                        <Link href="/dashboard/documents" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-elevated transition-colors">
                          <FileText className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm text-text-primary">My Documents</span>
                        </Link>
                        <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-elevated transition-colors">
                          <Settings className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm text-text-primary">Settings</span>
                        </Link>
                        <hr className="my-2 border-border-subtle" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-elevated transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm text-text-primary">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/pricing">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-text-primary p-2"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-elevated border-b border-border-subtle"
          >
            <div className="container mx-auto px-6 py-6 space-y-4">
              <Link href="/features" className="block text-text-secondary hover:text-text-primary transition-colors">
                Features
              </Link>
              <Link href="/products" className="block text-text-secondary hover:text-text-primary transition-colors">
                Products
              </Link>
              <Link href="/pricing" className="block text-text-secondary hover:text-text-primary transition-colors">
                Pricing
              </Link>
              <Link href="/resources" className="block text-text-secondary hover:text-text-primary transition-colors">
                Resources
              </Link>
              <div className="pt-4 space-y-3">
                {user ? (
                  <>
                    <Link href="/dashboard" className="block">
                      <Button variant="secondary" className="w-full">Dashboard</Button>
                    </Link>
                    <Button onClick={handleSignOut} variant="ghost" className="w-full">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block">
                      <Button variant="secondary" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/pricing" className="block">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}