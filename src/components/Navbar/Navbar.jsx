import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/my-reservations", label: "Mes Réservations" },
  { to: "/reservations/new", label: "Nouvelle Réservation" },
  { to: "/signin", label: "Connexion" },
  { to: "/signup", label: "Inscription" },
];

const BarNav = () => {
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
      console.log("Token décodé Navbar :", userInfo); // Debug
      isAdmin = userInfo.role_id === 1;
    } catch (e) {
      console.error("Erreur décodage token :", e);
    }
  }
  return (
    <nav className="flex gap-6 items-center border-b border-neutral-200 mb-8 bg-white px-2 py-3">
      {navLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`text-neutral-800 text-sm font-medium px-1 pb-1 border-b-2 transition 
            ${
              location.pathname === link.to
                ? "border-neutral-900"
                : "border-transparent hover:border-neutral-400"
            }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default BarNav;
