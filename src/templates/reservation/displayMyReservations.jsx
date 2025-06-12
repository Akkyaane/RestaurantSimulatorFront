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

const DisplayMyReservations = () => {
  const token = localStorage.getItem("token");

  const user_id = localStorage.getItem("user_id");

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");
      try {
        // Debug : affiche l'user_id et le contenu du token décodé
       
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const decoded = JSON.parse(jsonPayload);
        }

        const res = await fetch(`http://localhost:3001/my-reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'user_id': user_id, // <-- Correction ici
          },
        });
        if (!res.ok) {
          const text = await res.text();
          console.error("Réponse erreur:", res, text);
          throw new Error("Erreur lors de la récupération des réservations : " + text);
        }
        const data = await res.json();
        setReservations(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [token, user_id]);

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = !!token && !!user_id;

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

  return (
    <>
      <BarNav />
      <h2 style={{ textAlign: "center", margin: "24px 0 32px 0", color: "#222" }}>Mes Réservations</h2>
      {/* Affiche l'user_id pour debug */}
    
      {/* N'affiche PAS les liens ou composants d'inscription/connexion si connecté */}
      {!isAuthenticated && (
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* Remplace ceci par tes vrais liens ou composants */}
          <a href="/sign-in" style={{ marginRight: 12 }}>Connexion</a>
          <a href="/sign-up">Inscription</a>
        </div>
      )}
      {loading && <div style={{ textAlign: "center" }}>Chargement...</div>}
      {error && <div style={{ color: "#d32f2f", textAlign: "center" }}>{error}</div>}
      {!loading && !error && reservations.length === 0 && (
        <div style={{ textAlign: "center", color: "#888" }}>Aucune réservation trouvée.</div>
      )}
      <div>
        {reservations.map((r) => (
          <div key={r.id} style={cardStyle}>
            <div style={titleStyle}>Réservation #{r.id}</div>
            {/* Debug : affiche la réservation brute si les champs sont manquants */}
            {(!r.date || !r.number_people || !r.status_id) && (
              <pre style={{color: "#d32f2f", fontSize: "0.85em"}}>{JSON.stringify(r, null, 2)}</pre>
            )}
            {r.date && (() => {
              // Séparation date et heure
              const [datePart, timePart] = r.date.split('T');
              const heure = timePart ? timePart.substring(0,5) : '';
              return (
                <>
                  <div style={{color: "#222"}}><b>Date :</b> {datePart}</div>
                  <div style={{color: "#222"}}><b>Heure :</b> {heure}</div>
                </>
              );
            })()}
            {r.number_people !== undefined && <div style={{color: "#222"}}><b>Nombre de personnes :</b> {r.number_people}</div>}
            {r.status_id !== undefined && <div style={{color: "#222"}}><b>Statut :</b> {statusLabel(r.status_id)}</div>}
            {r.note && <div><b>Note :</b> {r.note}</div>}
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayMyReservations;
