import { useEffect, useState } from "react";

export default function Admin() {
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/rsvps")
      .then((res) => res.json())
      .then((data) => setRsvps(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>📋 All RSVPs</h2>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Side</th>
            <th>Guests</th>
            <th>Attendance</th>
          </tr>
        </thead>

        <tbody>
          {rsvps.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.side}</td>
              <td>{r.guests}</td>
              <td>{r.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}