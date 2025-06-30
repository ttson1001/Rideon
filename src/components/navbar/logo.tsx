import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="http://rideonvn.online:8080/uploads/a6607f52-2446-416e-93ed-aa62c6efe1e3.png"
        alt="RideOn Logo"
        className="h-8 w-auto"
      />
    </Link>
  );
}
