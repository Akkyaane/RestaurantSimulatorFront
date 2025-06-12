import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './templates/authentication/SignIn'
import SignUp from './templates/authentication/SignUp'
import DisplayMenu from './templates/menu/DisplayMenu'
import AddReservation from './templates/reservation/AddReservation.jsx'
import DisplayMyReservations from './templates/reservation/DisplayMyReservations.jsx'
import DisplayReservations from './templates/admin/DisplayReservations.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/menu" element={<DisplayMenu />} />
        <Route path="/my-reservations" element={<DisplayMyReservations />} />
        <Route path="/reservations/new" element={<AddReservation />} />
        <Route path="/reservations" element={<DisplayReservations />} />
      </Routes>
    </>
  )
} 