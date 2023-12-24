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
    departureCode: "CA",
    arrivalCity: "City B",
    arrivalCode: "CB",
    departureTime: "2023-01-01T10:00:00",
    arrivalTime: "2023-01-01T12:00:00",
    duration: "2 hours",
    price: 200,
  },
  {
    id: 2,
    airline: "Airline 1",
    departureCity: "City C",
    departureCode: "CC",
    arrivalCity: "City D",
    arrivalCode: "CD",
    departureTime: "2023-01-02T14:30:00",
    arrivalTime: "2023-01-02T16:45:00",
    duration: "2 hours 15 minutes",
    price: 250,
  },
  {
    id: 3,
    airline: "Airline 1",
    departureCity: "City E",
    departureCode: "CE",
    arrivalCity: "City F",
    arrivalCode: "CF",
    departureTime: "2023-01-03T08:45:00",
    arrivalTime: "2023-01-03T11:30:00",
    duration: "2 hours 45 minutes",
    price: 180,
  },
  {
    id: 4,
    airline: "Airline 1",
    departureCity: "City G",
    departureCode: "CG",
    arrivalCity: "City H",
    arrivalCode: "CH",
    departureTime: "2023-01-04T13:15:00",
    arrivalTime: "2023-01-04T15:30:00",
    duration: "2 hours 15 minutes",
    price: 220,
  },
  {
    id: 5,
    airline: "Airline 2",
    departureCity: "City I",
    departureCode: "CI",
    arrivalCity: "City J",
    arrivalCode: "CJ",
    departureTime: "2023-01-05T09:30:00",
    arrivalTime: "2023-01-05T11:45:00",
    duration: "2 hours 15 minutes",
    price: 190,
  },
  {
    id: 6,
    airline: "Airline 2",
    departureCity: "City K",
    departureCode: "CK",
    arrivalCity: "City L",
    arrivalCode: "CL",
    departureTime: "2023-01-06T17:00:00",
    arrivalTime: "2023-01-06T19:30:00",
    duration: "2 hours 30 minutes",
    price: 270,
  },
  {
    id: 7,
    airline: "Airline 2",
    departureCity: "City M",
    departureCode: "CM",
    arrivalCity: "City N",
    arrivalCode: "CN",
    departureTime: "2023-01-07T11:45:00",
    arrivalTime: "2023-01-07T14:00:00",
    duration: "2 hours 15 minutes",
    price: 200,
  },
  {
    id: 8,
    airline: "Airline 2",
    departureCity: "City O",
    departureCode: "CO",
    arrivalCity: "City P",
    arrivalCode: "CP",
    departureTime: "2023-01-08T08:00:00",
    arrivalTime: "2023-01-08T10:15:00",
    duration: "2 hours 15 minutes",
    price: 180,
  },
  {
    id: 9,
    airline: "Airline 2",
    departureCity: "City Q",
    departureCode: "CQ",
    arrivalCity: "City R",
    arrivalCode: "CR",
    departureTime: "2023-01-09T14:30:00",
    arrivalTime: "2023-01-09T17:00:00",
    duration: "2 hours 30 minutes",
    price: 250,
  },
  {
    id: 10,
    airline: "Airline 3",
    departureCity: "City S",
    departureCode: "CS",
    arrivalCity: "City T",
    arrivalCode: "CT",
    departureTime: "2023-01-10T16:45:00",
    arrivalTime: "2023-01-10T19:15:00",
    duration: "2 hours 30 minutes",
    price: 260,
  },
  {
    id: 11,
    airline: "Airline 3",
    departureCity: "City U",
    departureCode: "CU",
    arrivalCity: "City V",
    arrivalCode: "CV",
    departureTime: "2023-01-11T12:00:00",
    arrivalTime: "2023-01-11T14:30:00",
    duration: "2 hours 30 minutes",
    price: 240,
  },
  {
    id: 12,
    airline: "Airline 3",
    departureCity: "City W",
    departureCode: "CW",
    arrivalCity: "City X",
    arrivalCode: "CX",
    departureTime: "2023-01-12T09:15:00",
    arrivalTime: "2023-01-12T11:30:00",
    duration: "2 hours 15 minutes",
    price: 200,
  },
  {
    id: 13,
    airline: "Airline 4",
    departureCity: "City Y",
    departureCode: "CY",
    arrivalCity: "City Z",
    arrivalCode: "CZ",
    departureTime: "2023-01-13T18:30:00",
    arrivalTime: "2023-01-13T20:45:00",
    duration: "2 hours 15 minutes",
    price: 220,
  },
  {
    id: 14,
    airline: "Airline 4",
    departureCity: "City AA",
    departureCode: "CAA",
    arrivalCity: "City BB",
    arrivalCode: "CBB",
    departureTime: "2023-01-14T15:00:00",
    arrivalTime: "2023-01-14T17:15:00",
    duration: "2 hours 15 minutes",
    price: 230,
  },
  {
    id: 15,
    airline: "Airline 4",
    departureCity: "City CC",
    departureCode: "CCC",
    arrivalCity: "City DD",
    arrivalCode: "CDD",
    departureTime: "2023-01-15T13:30:00",
    arrivalTime: "2023-01-15T16:00:00",
    duration: "2 hours 30 minutes",
    price: 260,
  },
  {
    id: 16,
    airline: "Airline 4",
    departureCity: "City EE",
    departureCode: "CEE",
    arrivalCity: "City FF",
    arrivalCode: "CFF",
    departureTime: "2023-01-16T10:45:00",
    arrivalTime: "2023-01-16T13:15:00",
    duration: "2 hours 30 minutes",
    price: 240,
  },
  {
    id: 17,
    airline: "Airline 4",
    departureCity: "City GG",
    departureCode: "CGG",
    arrivalCity: "City HH",
    arrivalCode: "CHH",
    departureTime: "2023-01-17T07:00:00",
    arrivalTime: "2023-01-17T09:30:00",
    duration: "2 hours 30 minutes",
    price: 220,
  },
  {
    id: 18,
    airline: "Airline 5",
    departureCity: "City II",
    departureCode: "CII",
    arrivalCity: "City JJ",
    arrivalCode: "CJJ",
    departureTime: "2023-01-18T16:15:00",
    arrivalTime: "2023-01-18T18:45:00",
    duration: "2 hours 30 minutes",
    price: 260,
  },
  {
    id: 19,
    airline: "Airline 5",
    departureCity: "City KK",
    departureCode: "CKK",
    arrivalCity: "City LL",
    arrivalCode: "CLL",
    departureTime: "2023-01-19T12:30:00",
    arrivalTime: "2023-01-19T15:00:00",
    duration: "2 hours 30 minutes",
    price: 230,
  },
  {
    id: 20,
    airline: "Airline 5",
    departureCity: "City MM",
    departureCode: "CMM",
    arrivalCity: "City NN",
    arrivalCode: "CNN",
    departureTime: "2023-01-20T09:15:00",
    arrivalTime: "2023-01-20T11:30:00",
    duration: "2 hours 15 minutes",
    price: 200,
  },
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
