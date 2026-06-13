import { Routes, Route, Link } from "react-router-dom";
import RsvpPage from "./pages/RsvpPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <>
      <nav className="p-3 bg-dark text-white">
        <Link to="/" className="text-white me-3">RSVP</Link>
        <Link to="/admin" className="text-white">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RsvpPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}