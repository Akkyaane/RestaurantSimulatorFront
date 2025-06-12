import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

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
            user_id: user_id,
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
      <Navbar />
      <h2 className="text-xl font-semibold p-6">Toutes les réservations</h2>

      {loading && <div style={{ textAlign: "center" }}>Chargement...</div>}
      {error && <div style={{ textAlign: "center" }}>{error}</div>}
      {!loading && !error && reservations.length === 0 && (
        <div>Aucune réservation trouvée.</div>
      )}

      <div className="flex flex-col gap-6 py-4">
        {reservations.map((r) => (
          <div key={r.id} className="flex flex-col rounded border-1 border-white p-6 gap-2">
            <div className="text-lg">Réservation n°{r.id}</div>
            {(!r.date || !r.number_people || !r.status_id) && (
              <pre>{JSON.stringify(r, null, 2)}</pre>
            )}
            <div className="text-sm">UserId : {r.user_id}</div>
            {r.date && (() => {
              const [datePart, timePart] = r.date.split('T');
              const heure = timePart ? timePart.substring(0, 5) : '';
              return (
                <>
                  <div className="text-sm">Date : {datePart}</div>
                  <div className="text-sm">Heure : {heure}</div>
                </>
              );
            })()}
            {r.number_people !== undefined && <div className="text-sm">Nombre de personnes : {r.number_people}</div>}
            {r.status_id !== undefined && <div className="text-sm">Statut : {statusLabel(r.status_id)}</div>}
            {r.note && <div>Note : {r.note}</div>}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => updateStatus(r.id, 2)}
                disabled={r.status_id === 2 || r.status_id === 3}
                className="w-fit bg-transparent hover:outline-2 hover:outline-white focus:outline-2 focus:outline-white text-white p-2 rounded outline-1 outline-white"
              >
                Passer en cours
              </button>
              <button className="w-fit bg-transparent hover:outline-2 hover:outline-white focus:outline-2 focus:outline-white text-white p-2 rounded outline-1 outline-white"
                onClick={() => updateStatus(r.id, 3)}
                disabled={r.status_id === 3}
              >
                Annuler
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayReservations;
