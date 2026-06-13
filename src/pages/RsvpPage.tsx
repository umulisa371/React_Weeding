import { useState } from "react";

export default function RsvpPage() {
  const [option, setOption] = useState("");

 const handleSubmit = async (event: any) => {
  event.preventDefault();

  const form = new FormData(event.target);

  const payload = {
    name: form.get("name"),
    email: form.get("email"),
    side: form.get("side"),
    relationship: form.get("relationship"),
    guests: Number(form.get("guests") || 0),
    message: form.get("message"),
    attendance: form.get("attendance"),
    meal: form.get("meal"),
  };

  console.log("Sending:", payload);

  try {
    const response = await fetch("http://localhost:5000/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  console.log("Status:", response.status);

  const text = await response.text();
console.log("Response:", text);

    alert("RSVP Submitted!");
  } catch (err) {
    console.error("POST ERROR:", err);
  }
};

  return (
    <div className="rsvp-wrapper">
      <div className="rsvp-card">

        <div className="header">
          <h1>Wedding Invitation</h1>
          <p>Please kindly confirm your attendance</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* BASIC INFO */}
          <div className="grid">
            <input name="name" placeholder="Full Name" required />
            <input name="email" type="email" placeholder="Email Address" required />
          </div>

          {/* SIDE */}
          <div className="grid">
            <select
              name="side"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              required
            >
              <option value="">Family Side</option>
              <option value="male">Groom's Side 🎩</option>
              <option value="female">Bride's Side 💐</option>
            </select>

            <input name="guests" type="number" placeholder="Guests" min="0" />
          </div>

          {/* 👇 NEW: RELATIONSHIP FIELD */}
          <select name="relationship" required>
            <option value="">Relationship to Couple</option>
            <option value="friend">Friend</option>
            <option value="family">Family Member</option>
            <option value="colleague">Colleague</option>
            <option value="neighbor">Neighbor</option>
          </select>

          {/* 👇 GROOM BLOCK */}
          {option === "male" && (
            <div className="section">
              <h3>🎩 Groom’s Side</h3>
              <p className="hint">You are connected to the groom</p>

              <textarea
                name="message"
                placeholder="Message to the Groom"
                rows={3}
              />
            </div>
          )}

          {/* 👇 BRIDE BLOCK */}
          {option === "female" && (
            <div className="section">
              <h3>💐 Bride’s Side</h3>
              <p className="hint">You are connected to the bride</p>

              <textarea
                name="message"
                placeholder="Message to the Bride"
                rows={3}
              />
            </div>
          )}

          {/* ATTENDANCE + MEAL */}
          <div className="grid">
            <select name="attendance" required>
              <option value="yes">Attending</option>
              <option value="no">Not Attending</option>
            </select>

            <select name="meal">
              <option>Chicken</option>
              <option>Beef</option>
              <option>Vegetarian</option>
            </select>
          </div>

          <button type="submit">Submit RSVP</button>
        </form>
      </div>

      <style>{`
        .rsvp-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f7f7;
          padding: 20px;
        }

        .rsvp-card {
          width: 100%;
          max-width: 560px;
          background: #fff;
          border-radius: 16px;
          padding: 40px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
          font-family: "Inter", sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 25px;
        }

        .header h1 {
          font-size: 26px;
          font-weight: 600;
        }

        .header p {
          color: #777;
          font-size: 14px;
        }

        form input,
        form select,
        form textarea {
          width: 100%;
          padding: 12px;
          margin-top: 12px;
          border-radius: 10px;
          border: 1px solid rgba(0,0,0,0.12);
          font-size: 14px;
        }

        form input:focus,
        form select:focus,
        form textarea:focus {
          border-color: #c9a227;
          box-shadow: 0 0 0 3px rgba(201,162,39,0.15);
          outline: none;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .section {
          background: #fafafa;
          padding: 15px;
          border-radius: 12px;
          margin-top: 15px;
        }

        .section h3 {
          margin-bottom: 5px;
        }

        .hint {
          font-size: 12px;
          color: #888;
          margin-bottom: 10px;
        }

        button {
          width: 100%;
          margin-top: 18px;
          padding: 12px;
          border: none;
          border-radius: 10px;
          background: #c9a227;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover {
          background: #b8921f;
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}