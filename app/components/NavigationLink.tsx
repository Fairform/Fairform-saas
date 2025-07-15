interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const NavigationLink = ({ href, children, className, onClick }: NavigationLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Only show "Page coming soon!" for routes that don't exist yet
    if (href === '/product' || href === '/pricing' || href === '/login' || href === '/signup' || href === '/contact' || href === '/help') {
      alert('Page coming soon!')
      return
    }
    
    if (onClick) {
      onClick()
    } else {
      console.log(`Navigating to: ${href}`)
      window.location.href = href
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
