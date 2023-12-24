const flights = require("./mock-data.json");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/flights", (req, res) => {
  const { departureCity, arrivalCity, departureDate, returnDate } = req.query;
  console.log(req.query);
  let filteredFlights = flights;

  if (departureCity) {
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
  if (filteredFlights.length === 0) {
    res.status("400").statusMessage("No flights matching the criteria");
  }

  // Sunucu gecikmesi taklit ediliyor
  setTimeout(() => {
    res.json(filteredFlights);
  }, 1000);
});

app.listen(port, () => {
  console.log(`Mock API listening at http://localhost:${port}`);
});
