import React from "react";
import { Link, useLocation } from "react-router-dom";

const navStyle = {
  marginBottom: "24px",
  background: "#222",
  padding: "14px 24px",
  display: "flex",
  gap: "18px",
  alignItems: "center",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "1.05rem",
  padding: "6px 14px",
  borderRadius: "5px",
  transition: "background 0.2s",
};

const activeLinkStyle = {
  background: "#ff9800",
  color: "#222",
};

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
    <nav style={navStyle}>
      <Link
        to="/menu"
        style={{
          ...linkStyle,
          ...(location.pathname === "/menu" ? activeLinkStyle : {}),
        }}
      >
        Menu
      </Link>
      <Link
        to="/my-reservations"
        style={{
          ...linkStyle,
          ...(location.pathname === "/my-reservations" ? activeLinkStyle : {}),
        }}
      >
        Mes Réservations
      </Link>
      <Link
        to="/reservations/new"
        style={{
          ...linkStyle,
          ...(location.pathname === "/reservations/new" ? activeLinkStyle : {}),
        }}
      >
        Nouvelle Réservation
      </Link>
      <Link
        to="/sign-in"
        style={{
          ...linkStyle,
          ...(location.pathname === "/sign-in" ? activeLinkStyle : {}),
        }}
      >
        Connexion
      </Link>
      <Link
        to="/sign-up"
        style={{
          ...linkStyle,
          ...(location.pathname === "/sign-up" ? activeLinkStyle : {}),
        }}
      >
        Inscription
      </Link>
      {isAdmin && (
        <Link
          to="/reservations"
          style={{
            ...linkStyle,
            ...(location.pathname === "/admin/reservations"
              ? activeLinkStyle
              : {}),
          }}
        >
          Reservations
        </Link>
      )}
    </nav>
  );
};

export default BarNav;
