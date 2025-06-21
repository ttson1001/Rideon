import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/src/assets/RideOnLogo.png" alt="RideOn Logo" className="h-8 w-auto" />
    </Link>
  )
}
