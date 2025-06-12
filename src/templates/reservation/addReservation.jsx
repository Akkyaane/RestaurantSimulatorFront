import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";

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
      <Navbar />
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <form onSubmit={handleSubmit} className="border-1 border-white p-8 flex flex-col gap-4 rounded">
          <h2 className="text-xl font-semibold p-6">Ajouter une réservation</h2>
          {error && <div className="text-center">{error}</div>}
          <Input type="number" name="number_people" title="Nombre de personnes" value={form.number_people} onChange={handleChange} min={1} />
          <Input type="date" name="date" title="Date" value={form.date} onChange={handleChange} min={today} />
          <Input type="time" name="time" title="Heure" value={form.time} onChange={handleChange} min={today} />
          <Button type="submit" name="reserve" title="Réserver" />
        </form>
      </div>
    </>
  );
};

export default AddReservationForm;
