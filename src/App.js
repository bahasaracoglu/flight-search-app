import { useState } from "react";
import "./reset.css";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import FlightList from "./FlightList";
import FlightSearchForm from "./FlightSearchForm";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);

  return (
    <div className="content">
      <header>Flight Search Application</header>
      <FlightSearchForm setLoading={setLoading} setFlights={setFlights} />
      {loading && (
        <Box className="loader" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
      <FlightList flights={flights} />
    </div>
  );
};

export default App;
