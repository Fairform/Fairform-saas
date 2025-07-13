'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getUserDetails, getUser } from '@/lib/supabase'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import type { User } from '@supabase/supabase-js'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    async function fetchSession() {
      const currentUser = await getUser()
      if (currentUser) {
        setUser(currentUser)
        const userDetails = await getUserDetails(currentUser.id)
        if (userDetails?.role) setRole(userDetails.role)
      }
    }
    fetchSession()
  }, [])

  const navigation = [
    { name: 'Industries', href: '/products' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Templates', href: '/templates' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => pathname?.startsWith(href)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-width flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/fairform-logo.png"
            alt="FairForm Logo"
            width={36}
            height={36}
            className="w-9 h-9"
            priority
          />
          <span className="font-heading font-bold text-xl text-gray-900">FairForm</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-black'
              }`}
            >
              {item.name}
            </Link>
          ))}
          {role === 'admin' && (
            <Link
              href="/admin"
              className="text-sm font-semibold text-red-600 hover:text-red-800"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-gray-800 hover:text-black"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-black transition"
            >
              Sign In
            </Link>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block text-sm font-medium ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {role === 'admin' && (
            <Link
              href="/admin"
              className="block text-sm font-semibold text-red-600"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          {user ? (
            <Link
              href="/dashboard"
              className="block text-sm font-semibold text-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="block px-4 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-black transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
