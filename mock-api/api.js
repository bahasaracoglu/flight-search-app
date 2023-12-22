const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // cors eklenmiş

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// Basit bir uçuş veri seti
const flights = [
  {
    id: 1,
    airline: "Airline 1",
    departureCity: "City A",
    arrivalCity: "City B",
    departureTime: "2023-01-01T10:00:00",
    arrivalTime: "2023-01-01T12:00:00",
    duration: "2 hours",
    price: 200,
  },
  // Diğer uçuşlar...
];

// Uçuşları listeleme endpoint'i
app.get("/flights", (req, res) => {
  // Sunucu gecikmesi taklit ediliyor
  setTimeout(() => {
    res.json(flights);
  }, 1000);
});

// Uçuş detayları endpoint'i
app.get("/flights/:id", (req, res) => {
  const flightId = parseInt(req.params.id);
  const flight = flights.find((f) => f.id === flightId);

  if (flight) {
    // Sunucu gecikmesi taklit ediliyor
    setTimeout(() => {
      res.json(flight);
    }, 1000);
  } else {
    res.status(404).json({ message: "Flight not found" });
  }
});

app.listen(port, () => {
  console.log(`Mock API listening at http://localhost:${port}`);
});
