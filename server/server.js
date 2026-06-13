const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// connect DB FIRST
connectDB();

// routes

app.post("/rsvp", async (req, res) => {
  try {
    console.log("Incoming RSVP:", req.body);

    const newRsvp = new Rsvp(req.body);

    await newRsvp.save();

    console.log("Saved:", newRsvp);

    res.status(200).json({
      success: true,
      message: "Welcome to our wedding!",
    });
  } catch (err) {
    console.error("SAVE ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});;
// other routes
const Rsvp = require("./models/Rsvp");

// HOME
app.get("/", (req, res) => {
  res.send("Wedding RSVP API is running");
});

// TEST
app.get("/test", (req, res) => {
  res.json({ message: "TEST WORKS" });
});

// CREATE RSVP
app.post("/rsvps", async (req, res) => {
  try {
    console.log("Incoming RSVP:", req.body);

    const newRsvp = new Rsvp(req.body);
    await newRsvp.save();

    console.log("Saved:", newRsvp);

    res.json({
      success: true,
      message: "Welcome to our wedding!",
    });
  } catch (err) {
    console.error("SAVE ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// GET ALL
app.get("/rsvp", (req, res) => {
  res.json({ message: "RSVP route works" });
});

// STATS
app.get("/stats", async (req, res) => {
  const total = await Rsvp.countDocuments();
  const attending = await Rsvp.countDocuments({ attendance: "yes" });
  const notAttending = await Rsvp.countDocuments({ attendance: "no" });

  res.json({ total, attending, notAttending });
});

// DELETE
app.delete("/rsvp/:id", async (req, res) => {
  await Rsvp.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// listen LAST
app.get("/rsvps", async (req, res) => {
  try {
    console.log("RSVPS ROUTE HIT");

    const data = await Rsvp.find().sort({ _id: -1 });

    console.log("FOUND:", data.length);

    res.json(data);
  } catch (err) {
    console.error("RSVPS ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get("/hello", (req, res) => {
  res.send("HELLO ROUTE");
});