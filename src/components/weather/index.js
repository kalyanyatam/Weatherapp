import React from 'react';
import './index.css';

const Weather = ({ weather, error }) => {
  return (
    <div className="weather-info">
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-details">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
