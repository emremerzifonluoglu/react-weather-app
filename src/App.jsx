import "./App.css";
import axios from "axios";
import React from "react";
import { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0e4878ba13a365777c5fb48b1e78ab5a
  `;

  const searchCity = (e) => {
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setCity("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={searchCity}
          type="text"
          placeholder="Enter City"
          value={city}
        />
      </div>
      <div className="container">
        <div className="info">
          <div className="city">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="date">
            {data.dt ? (
              <p>{new Date(data.dt * 1000).toLocaleDateString()}</p>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KMH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
