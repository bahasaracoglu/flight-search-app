import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

function FlightSearchForm({ setLoading, setFlights }) {
  const [formValues, setFormValues] = useState({
    departureCity: "City A",
    arrivalCity: "City B",
    departureDate: null,
    returnDate: null,
    tripSelection: "round",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams({
        departureCity: formValues.departureCity,
        arrivalCity: formValues.arrivalCity,
        departureDate: formValues.departureDate
          ? formValues.departureDate.toISOString()
          : null,
        returnDate: formValues.returnDate
          ? formValues.returnDate.toISOString()
          : null,
        tripSelection: formValues.tripSelection,
      });
      console.log(params.toString());
      const url = `http://localhost:8000/flights?${params.toString()}`;

      const response = await fetch(url, {
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
      alert("No flights matching the criteria");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    validateForm();
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const isReturnDisabled = formValues.tripSelection === "one-way";
  useEffect(() => {
    if (isReturnDisabled) {
      setFormValues((prevValues) => ({ ...prevValues, returnDate: null }));
    }
  }, [isReturnDisabled]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    console.log(newErrors);

    if (formValues.departureCity.trim() === "") {
      newErrors.departureCity = "Departure city is required";
      isValid = false;
    }

    if (formValues.arrivalCity.trim() === "") {
      newErrors.arrivalCity = "Arrival city is required";
      isValid = false;
    }

    if (!formValues.departureDate) {
      newErrors.departureDate = "Departure date is required";
      isValid = false;
    }

    if (!isReturnDisabled && !formValues.returnDate) {
      newErrors.returnDate = "Return date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="trip-selection-wrapper">
          <div className="trip-selection">
            <input
              type="radio"
              name="tripSelection"
              value="round"
              checked={formValues.tripSelection === "round"}
              onChange={handleChange}
            />
            <label>Round trip</label>
          </div>
          <div className="trip-selection">
            <input
              type="radio"
              name="tripSelection"
              value="one-way"
              checked={formValues.tripSelection === "one-way"}
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
              name="departureCity"
              value={formValues.departureCity}
              onChange={handleChange}
            />
            {errors.departureCity && (
              <p className="error-message">{errors.departureCity}</p>
            )}
          </label>
          <label>
            To:
            <input
              type="text"
              name="arrivalCity"
              value={formValues.arrivalCity}
              onChange={handleChange}
            />
            {errors.arrivalCity && (
              <p className="error-message">{errors.arrivalCity}</p>
            )}
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
            {errors.departureDate && (
              <p className="error-message">{errors.departureDate}</p>
            )}
          </label>

          <label>
            <span className={isReturnDisabled ? "disabled-label" : ""}>
              Return:
            </span>
            <DatePicker
              disabled={isReturnDisabled}
              selected={formValues.returnDate}
              onChange={(date) =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  returnDate: date,
                }))
              }
            />{" "}
            {errors.returnDate && !isReturnDisabled && (
              <p className="error-message">{errors.returnDate}</p>
            )}
          </label>
        </div>

        <button type="submit" id="search-button">
          Search flights <span>&#x2192;</span>
        </button>
      </form>
    </div>
  );
}

export default FlightSearchForm;
