const express = require('express');
const db = require('./config/db');
const pool = db;
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes.js');
require('dotenv').config();

app.use(express.json());

// Place ceci AVANT toutes les routes !
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Ensuite seulement, ajoute les routes :
app.use(authRoutes);
app.use(reservationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});