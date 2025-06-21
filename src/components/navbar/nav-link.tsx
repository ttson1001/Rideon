import { Link, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <div className="relative">
      <Link
        to={href}
        onClick={onClick}
        className={cn(
          "text-gray-700 hover:text-[#00a8ff] transition-colors duration-200 font-medium",
          isActive && "text-[#00a8ff] font-semibold",
          className,
        )}
      >
        {children}
      </Link>
    </div>
  )
}
