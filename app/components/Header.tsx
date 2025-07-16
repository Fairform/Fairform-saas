import { NavigationLink } from './NavigationLink'

export const Header = () => (
  <header className="w-full border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <NavigationLink href="/" className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-black rounded-md"></div>
          <span className="text-lg font-medium text-gray-900">Formative</span>
        </NavigationLink>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationLink href="/product" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Product</NavigationLink>
          <NavigationLink href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</NavigationLink>
          <NavigationLink href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About</NavigationLink>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <NavigationLink href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Log in</NavigationLink>
        <NavigationLink href="/signup" className="bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Sign up
        </NavigationLink>
      </div>
    </div>
  </header>
)
