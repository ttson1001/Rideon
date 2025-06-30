import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="http://somith.site:8080/uploads/ff8fa35a-a07a-4c02-8251-3e014929a4b8.png"
        alt="RideOn Logo"
        className="h-8 w-auto"
      />
    </Link>
  );
}
