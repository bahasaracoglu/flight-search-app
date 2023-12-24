const flights = require("./mock-data.json");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // cors eklenmiş

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

// Basit bir uçuş veri seti

app.get("/flights", (req, res) => {
  // Parametrelerden gelen filtreleme
  const { departureCity, arrivalCity, departureDate, returnDate } = req.query;
  console.log(req.query);
  let filteredFlights = flights;

  if (departureCity) {
    console.log("depp");
    filteredFlights = filteredFlights.filter(
      (flight) =>
        flight.departureCity.toLowerCase() === departureCity.toLowerCase()
    );
  }

  if (arrivalCity) {
    filteredFlights = filteredFlights.filter(
      (flight) => flight.arrivalCity.toLowerCase() === arrivalCity.toLowerCase()
    );
  }

  if (departureDate && departureDate !== "null") {
    filteredFlights = filteredFlights.filter(
      (flight) =>
        new Date(flight.departureTime).toDateString() ===
        new Date(departureDate).toDateString()
    );
  }

  if (returnDate && returnDate !== "null") {
    filteredFlights = filteredFlights.filter(
      (flight) =>
        new Date(flight.arrivalTime).toDateString() ===
        new Date(returnDate).toDateString()
    );
  }

  // Sunucu gecikmesi taklit ediliyor
  setTimeout(() => {
    res.json(filteredFlights);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Mock API listening at http://localhost:${port}`);
});
