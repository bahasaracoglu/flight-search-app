import "./reset.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <label htmlFor="round-trip">
          <input type="radio" id="round-trip" name="round-trip" value="round" />
            Round trip
        </label>
        <label htmlFor="one-way">
          <input type="radio" id="one-way" name="one-way" value="one-way" /> 
          One way
        </label>
      </div>
      <div>
        <label>
          From: <input name="from" />
        </label>
        <label>
          To: <input name="to" />
        </label>
      </div>
      <div>
        <label for="departure">
          Departure:
          <input type="date" id="departure" name="departure" />
        </label>
      </div>
    </div>
  );
}

export default App;
