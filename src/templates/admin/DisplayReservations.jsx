import React, { useEffect, useState } from "react";
import BarNav from "../../components/Navbar/Navbar";

const cardStyle = {
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  padding: "22px 28px",
  marginBottom: "18px",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const titleStyle = {
  color: "#222",
  fontWeight: 600,
  fontSize: "1.15rem",
  marginBottom: "6px",
};

const DisplayReservations = () => {
  // Récupération du user_id et du token depuis le localStorage
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");
      try {
        // Utilisation du token récupéré
        const res = await fetch("http://localhost:3001/Allreservations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des réservations");
        const data = await res.json();
        setReservations(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [token]);

  return (
    <>
      <BarNav />
      <h2 style={{ textAlign: "center", margin: "24px 0 32px 0", color: "#222" }}>Toutes les Réservations</h2>
      {loading && <div style={{ textAlign: "center" }}>Chargement...</div>}
      {error && <div style={{ color: "#d32f2f", textAlign: "center" }}>{error}</div>}
      {!loading && !error && reservations.length === 0 && (
        <div style={{ textAlign: "center", color: "#888" }}>Aucune réservation trouvée.</div>
      )}
      <div>
        {reservations.map((r) => (
          <div key={r.id} style={cardStyle}>
            <div style={titleStyle}>Réservation #{r.id}</div>
            <div><b>User ID :</b> {r.user_id}</div>
            <div><b>Date :</b> {r.date}</div>
            <div><b>Nombre de personnes :</b> {r.number_people}</div>
            <div><b>Statut :</b> {r.status_id}</div>
            {r.note && <div><b>Note :</b> {r.note}</div>}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayReservations;
