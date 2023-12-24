import { useState } from "react";
import { format, differenceInMinutes } from "date-fns";

function FlightList({ flights }) {
  const [sortOption, setSortOption] = useState(null);

  const formatTime = (time) => {
    const dateObject = new Date(time);
    return format(dateObject, "HH:mm");
  };
  const handleSort = (option) => {
    setSortOption(option);
  };
  const getSortedFlights = () => {
    let sortedFlights = [...flights];
    console.log("sortedFlights", sortedFlights);

    switch (sortOption) {
      case "departure":
        sortedFlights.sort(
          (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
        );
        break;
      case "arrival":
        sortedFlights.sort(
          (a, b) => new Date(a.arrivalTime) - new Date(b.arrivalTime)
        );
        break;
      case "price":
        sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case "duration":
        sortedFlights.sort((a, b) => {
          const durationDifferenceA = differenceInMinutes(
            new Date(a.departureTime),
            new Date(a.arrivalTime)
          );
          const durationDifferenceB = differenceInMinutes(
            new Date(b.departureTime),
            new Date(b.arrivalTime)
          );

          return durationDifferenceB - durationDifferenceA;
        });
        break;
      default:
        // No sorting
        break;
    }

    return sortedFlights;
  };
  return (
    <div>
      {flights.length > 0 && (
        <div className="list-container">
          <div className="list-header">
            <div className="direction">Departure</div>
            <div className="selected-date">
              {`${flights[0].departureCity} - ${
                flights[0].arrivalCity
              } , ${format(new Date(flights[0].departureTime), "PP")}`}
            </div>
          </div>
          <div className="filter-container">
            <button
              className="filter-button"
              onClick={() => handleSort("departure")}
            >
              Departure
            </button>
            <button
              className="filter-button"
              onClick={() => handleSort("duration")}
            >
              Duration
            </button>
            <button
              className="filter-button"
              onClick={() => handleSort("arrival")}
            >
              Arrival
            </button>
            <button
              className="filter-button"
              onClick={() => handleSort("price")}
            >
              Price
            </button>
          </div>
          <ul className="list">
            {getSortedFlights().map((flight) => {
              return (
                <li key={flight.id}>
                  <div className="flight-info">
                    <div className="departure-info">
                      <p className="time">{formatTime(flight.departureTime)}</p>
                      <p className="airport-code">{flight.departureCode}</p>
                      <p className="city">{flight.departureCity}</p>
                    </div>
                    <p className="airline">{flight.airline}</p>
                    <p className="duration">{flight.duration}</p>
                    <div className="arrival-info">
                      <p className="time">{formatTime(flight.arrivalTime)}</p>
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
      )}
    </div>
  );
}

export default FlightList;
