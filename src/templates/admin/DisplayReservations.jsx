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
  color: "#222", // Texte en noir
};

const titleStyle = {
  color: "#222", // Texte en noir
  fontWeight: 600,
  fontSize: "1.15rem",
  marginBottom: "6px",
};

const statusLabel = (status_id) => {
  switch (status_id) {
    case 1:
      return "Pas commencé";
    case 2:
      return "En cours";
    case 3:
      return "Terminé";
    default:
      return "Inconnu";
  }
};

const DisplayReservations = () => {
  const token = localStorage.getItem("token");

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");
      try {
        const user_id = localStorage.getItem("user_id");
        const res = await fetch("http://localhost:3001/reservations", {
          headers: {
            Authorization: `Bearer ${token}`,
            user_id: user_id, // Ajout du user_id dans le header
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

  const updateStatus = async (id, status_id) => {
    try {
      const user_id = localStorage.getItem("user_id");
      const reservation = reservations.find(r => r.id === id);
      if (!reservation) throw new Error("Réservation introuvable");

      // Affiche le body envoyé pour debug
      const debugBody = {
        user_id: Number(reservation.user_id),
        reservation_id: Number(reservation.id),
        numberPeople: Number(reservation.number_people),
        date: reservation.date,
        status_id: Number(status_id)
      };
      console.log("Body envoyé PUT /reservations/:id", debugBody);

      const res = await fetch(`http://localhost:3001/reservations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // Supprime user_id du header, il ne sert à rien ici pour la logique backend
        },
        body: JSON.stringify(debugBody),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Erreur lors de la mise à jour du statut : " + errorText);
      }
      setReservations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status_id } : r
        )
      );
    } catch (e) {
      alert(e.message);
    }
  };

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
            {/* Affiche la date et l'heure seulement si elles existent */}
            {r.date && r.date !== "null" && r.date !== null ? (() => {
              // Affichage heure locale sans décalage UTC
              const dateObj = new Date(r.date);
              const datePart = dateObj.toLocaleDateString('fr-FR');
              const heure = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false });
              return (
                <>
                  <div><b>Date :</b> {datePart}</div>
                  <div><b>Heure :</b> {heure}</div>
                </>
              );
            })() : (
              <div style={{ color: "#d32f2f" }}><b>Date :</b> Non renseignée</div>
            )}
            <div><b>Nombre de personnes :</b> {r.number_people}</div>
            <div><b>Statut :</b> {statusLabel(r.status_id)}</div>
            {r.note && <div><b>Note :</b> {r.note}</div>}
            {/* Supprime tout affichage JSON brut ici */}
            <div style={{display: "flex", gap: 8, marginTop: 8}}>
              <button
                onClick={() => updateStatus(r.id, 2)}
                disabled={r.status_id === 2 || r.status_id === 3}
                style={{
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 12px",
                  cursor: r.status_id === 2 || r.status_id === 3 ? "not-allowed" : "pointer"
                }}
              >
                Passer en cours
              </button>
              <button
                onClick={() => updateStatus(r.id, 3)}
                disabled={r.status_id === 3}
                style={{
                  background: "#388e3c",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 12px",
                  cursor: r.status_id === 3 ? "not-allowed" : "pointer"
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayReservations;
