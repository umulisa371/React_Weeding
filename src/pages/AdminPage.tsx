import { useEffect, useState } from "react";

type Rsvp = {
  _id: string;
  name: string;
  email: string;
  side: string;
  relationship: string;
  guests: number;
  message: string;
  attendance: string;
  meal: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
  });

  const [rsvps, setRsvps] = useState<Rsvp[]>([]);

  // LOGIN (still simple, but clean)
  const login = () => {
    if (password.trim() === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Wrong password");
    }
  };

  // FETCH ALL DATA
  const fetchData = async () => {
    try {
      setLoading(true);

      const [statsRes, rsvpRes] = await Promise.all([
        fetch("http://localhost:5000/stats"),
        fetch("http://localhost:5000/rsvps"),
      ]);

      if (!statsRes.ok || !rsvpRes.ok) {
        throw new Error("Failed to fetch admin data");
      }

     const statsData = await statsRes.json();
const rsvpData = await rsvpRes.json();

console.log("Stats Data:", statsData);
console.log("RSVP Data:", rsvpData);

setStats(statsData);
setRsvps(rsvpData);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // LOAD AFTER LOGIN
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // DELETE RSVP
  const deleteRsvp = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/rsvp/${id}`, {
        method: "DELETE",
      });

      // refresh data
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="container mt-5">

      {/* LOGIN */}
      
      {!isLoggedIn ? (
        <div className="card p-4 shadow">
          <h3>🔐 Admin Login</h3>

          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter admin password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-dark w-100" onClick={login}>
            Login
          </button>
        </div>
      ) : (
        <>
          {/* DASHBOARD */}
          <div className="card p-3 mb-3 shadow">
            <h3>📊 Admin Dashboard</h3>

            {loading ? (
              <p>Loading data...</p>
            ) : (
              <>
                <p>Total RSVPs: {stats.total}</p>
                <p>Attending: {stats.attending}</p>
                <p>Not Attending: {stats.notAttending}</p>
              </>
            )}
          </div>

          {/* TABLE */}
          <div className="card p-3 shadow">
            <h3>📋 RSVP List</h3>
            <p>Total loaded RSVPs: {rsvps.length}</p>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Side</th>
                  <th>Relationship</th>
                  <th>Guests</th>
                  <th>Attendance</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {rsvps.map((r) => (
                  <tr key={r._id}>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.side}</td>
                    <td>{r.relationship}</td>
                    <td>{r.guests}</td>
                    <td>{r.attendance}</td>
                    <td>{r.message}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRsvp(r._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {rsvps.length === 0 && (
              <p className="text-center mt-3">No RSVPs yet</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}