import { Link } from "react-router-dom";
import logo from "@/assets/RideOnLogo.png";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src={logo} alt="RideOn Logo" className="h-8 w-auto" />
    </Link>
  );
}
