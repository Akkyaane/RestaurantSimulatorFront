import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/my-reservations", label: "Mes réservations" },
  { to: "/signin", label: "Se connecter" },
  { to: "/signup", label: "S'inscrire" },
  { to: "/reservations", label: "Toutes les réservations" },
];

const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const userInfo = JSON.parse(jsonPayload);

      isAdmin = userInfo.role_id === 1;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <nav className="flex gap-2 items-center justify-center border-b-1 p-4">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-sm font-medium px-1 border-b-2 transition 
            ${location.pathname === link.to
              ? "border-white"
              : "border-transparent hover:border-white"
            }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
