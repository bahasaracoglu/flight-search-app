import React, { useState } from "react";
import "./reset.css";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const App = () => {
  const [formValues, setFormValues] = useState({
    departureAirport: "",
    arrivalAirport: "",
    departureDate: null,
    returnDate: null,
    round: true,
    oneWay: false,
  });

  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Mock API'ye istek gönderme (burada gerçek bir API'ye istek gönderilmeli)
      const response = await fetch("http://localhost:8000/flights", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      setFlights(result);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <header>Flight Search Application</header>
      <form onSubmit={handleSubmit}>
        <div className="trip-selection-wrapper">
          <div className="trip-selection">
            <input
              type="radio"
              name="round"
              checked={formValues.round}
              onChange={handleChange}
            />
            <label>Round trip</label>
          </div>
          <div className="trip-selection">
            <input
              type="radio"
              name="oneWay"
              checked={formValues.oneWay}
              onChange={handleChange}
            />
            <label>One way</label>
          </div>
        </div>
        <div className="destinations">
          <label>
            From:
            <input
              type="text"
              name="departureAirport"
              value={formValues.departureAirport}
              onChange={handleChange}
            />
          </label>
          <label>
            To:
            <input
              type="text"
              name="arrivalAirport"
              value={formValues.arrivalAirport}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="dates">
          <label>
            Departure:
            <DatePicker
              selected={formValues.departureDate}
              onChange={(date) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  departureDate: date,
                }))
              }
            />
          </label>
          {!formValues.oneWay && (
            <label>
              Return:
              <DatePicker
                selected={formValues.returnDate}
                onChange={(date) =>
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    returnDate: date,
                  }))
                }
              />
            </label>
          )}
        </div>

        <button type="submit" id="search-button">
          Search flights <span>&#x2192;</span>
        </button>
      </form>

      {loading && <p>Yükleniyor...</p>}
      <div className="filter-container">
        <button className="filter-button">Departure</button>
        <button className="filter-button">Arrival</button>
        <button className="filter-button">Airline</button>
        <button className="filter-button">Duration</button>
      </div>
      <div className="list-container">
        <ul className="list">
          {flights.map((flight) => {
            const departureTime = flight.departureTime;
            const arrivalTime = flight.arrivalTime;
            const depDateObject = new Date(departureTime);
            const arrDateObject = new Date(arrivalTime);
            const formattedDepartureTime = format(depDateObject, "HH:mm");
            const formattedArrivalTime = format(arrDateObject, "HH:mm");
            return (
              <li key={flight.id}>
                <div className="flight-info">
                  <div className="departure-info">
                    <p className="time">{formattedDepartureTime}</p>
                    <p className="airport-code">{flight.departureCode}</p>
                    <p className="city">{flight.departureCity}</p>
                  </div>
                  <p className="duration">{flight.duration}</p>
                  <div className="arrival-info">
                    <p className="time">{formattedArrivalTime}</p>
                    <p className="airport-code">{flight.arrivalCode}</p>
                    <p className="city">{flight.arrivalCity}</p>
                  </div>
                </div>
                <span className="price"> {flight.price} $</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
