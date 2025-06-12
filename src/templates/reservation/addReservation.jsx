import React, { useState } from "react";
import BarNav from "../../components/Navbar/Navbar";

const formContainerStyle = {
  maxWidth: "420px",
  margin: "32px auto",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
  padding: "32px 28px",
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  fontWeight: 500,
  color: "#222",
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  marginTop: "4px",
  marginBottom: "18px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  background: "#ff9800",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "12px",
  fontWeight: 600,
  fontSize: "1.1rem",
  cursor: "pointer",
  transition: "background 0.2s",
};

const errorStyle = {
  color: "#d32f2f",
  marginBottom: "16px",
  fontWeight: 500,
  textAlign: "center",
};

const AddReservationForm = ({ onReservationCreated }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const userName = localStorage.getItem("name"); 
  const [form, setForm] = useState({
    number_people: 1,
    date: "",
    time: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    if (form.number_people < 1) return "Nombre de personnes invalide";
    if (!form.date) return "La date est requise";
    if (form.date < today) return "La date doit être aujourd'hui ou plus tard";
    if (!form.time) return "L'heure est requise";
    return "";
  };

  const getUserIdFromToken = () => {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userInfo = JSON.parse(jsonPayload);
      return userInfo.id;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setLoading(true);

    const userIdFromToken = getUserIdFromToken();
    if (!userIdFromToken) {
      setError("Utilisateur non authentifié. Veuillez vous reconnecter.");
      setLoading(false);
      return;
    }

    // Fusionne date et heure en format "YYYY-MM-DD HH:mm"
    function combineDateTimeLocal(date, time) {
      return `${date} ${time}`;
    }
    const dateTime = combineDateTimeLocal(form.date, form.time);

    try {
      const res = await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: userIdFromToken,
          status_id: 1,
          numberPeople: Number(form.number_people),
          date: dateTime, // <-- format "YYYY-MM-DD HH:mm"
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la réservation");
      setForm({
        number_people: 1,
        date: "",
        time: "",
      });
      if (onReservationCreated) onReservationCreated();
      alert("Réservation créée !");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = !!token && !!user_id;

  return (
    <>
      <BarNav />
      {/* Affiche le nom si connecté */}
      {isAuthenticated && userName && (
        <div style={{ textAlign: "center", margin: "12px 0", color: "#222", fontWeight: 500 }}>
          Connecté en tant que : {userName}
        </div>
      )}
      {/* N'affiche PAS les liens ou composants d'inscription/connexion si connecté */}
      {!isAuthenticated && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <a href="/sign-in" style={{ marginRight: 12 }}>Connexion</a>
          <a href="/sign-up">Inscription</a>
        </div>
      )}
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center", marginBottom: 24, color: "#222" }}>Nouvelle Réservation</h2>
          {error && <div style={errorStyle}>{error}</div>}
          <label style={labelStyle}>
            Nombre de personnes
            <input
              name="number_people"
              type="number"
              min={1}
              value={form.number_people}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Date
            <input
              name="date"
              type="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <label style={labelStyle}>
            Heure
            <input
              name="time"
              type="time"
              value={form.time}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Envoi..." : "Réserver"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddReservationForm;
