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
        to="/signin"
        style={{
          ...linkStyle,
          ...(location.pathname === "/signin" ? activeLinkStyle : {}),
        }}
      >
        Connexion
      </Link>
      <Link
        to="/signup"
        style={{
          ...linkStyle,
          ...(location.pathname === "/signup" ? activeLinkStyle : {}),
        }}
      >
        Inscription
      </Link>
    </nav>
  );
};

export default BarNav;
