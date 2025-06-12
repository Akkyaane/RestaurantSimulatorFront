import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './templates/authentication/SignIn'
<<<<<<< HEAD
import SignUp from './templates/authentication/SignUp'
import DisplayMenu from './templates/menu/DisplayMenu'
// import DisplayMyReservations from './templates/reservation/DisplayMyReservations'
// import AddReservation from './templates/reservation/AddReservation'
// import DisplayReservations from './templates/admin/DisplayReservations'
=======
import SignUp from './templates/authentication/SignUp.jsx'
import AddReservation from './templates/reservation/AddReservation.jsx'
import DisplayMyReservations from './templates/reservation/DisplayMyReservations.jsx'
import DisplayReservations from './templates/admin/DisplayReservations.jsx'
// import DisplayMenu from './templates/menu/DisplayMenu'

>>>>>>> louis

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
        <Route path="/menu" element={<DisplayMenu />} />
        {/* <Route path="/my-reservations" element={<DisplayMyReservations />} />
=======
         {/* <Route path="/menu" element={<DisplayMenu />} /> */}
        <Route path="/my-reservations" element={<DisplayMyReservations />} />
>>>>>>> louis
        <Route path="/reservations/new" element={<AddReservation />} />
        <Route path="/reservations" element={<DisplayReservations />} />
      </Routes>
    </>
  )
} 