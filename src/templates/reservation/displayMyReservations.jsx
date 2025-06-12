import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from 'react-router-dom';

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
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
        }

        const res = await fetch(`http://localhost:3001/my-reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'user_id': user_id,
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

  const isAuthenticated = token && user_id;

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
      <Navbar />
      <h2 className="text-xl font-semibold p-6">Mes réservations</h2>

      {loading && <div className="text-center">Chargement...</div>}
      {error && <div className="text-center">{error}</div>}
      {!loading && !error && reservations.length === 0 && (
        <div className="text-center">Aucune réservation trouvée.</div>
      )}

      <div className="flex flex-col gap-6 py-4">
        {reservations.map((r) => (
          <div key={r.id} className="flex flex-col rounded border-1 border-white p-6 gap-2">
            <div className="text-lg">Réservation n°{r.id}</div>
            {(!r.date || !r.number_people || !r.status_id) && (
              <pre>{JSON.stringify(r, null, 2)}</pre>
            )}
            {r.date && (() => {
              // Séparation date et heure
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
          </div>
        ))}
        <Link
          to="/reservations/new"
          className="w-fit bg-transparent hover:outline-2 hover:outline-white focus:outline-2 focus:outline-white text-white p-2 rounded outline-1 outline-white"
        >
          Ajouter une réservation
        </Link>
      </div>
    </>
  );
};

export default DisplayMyReservations;
