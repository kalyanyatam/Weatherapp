import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import './App.css';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const defaultWeather = {
    name: 'Atreyapuram',
    weather: [{ description: 'Clear sky' }],
    main: { temp: 20, humidity: 50 }
  };

  useEffect(() => {
    // Load favourites from localStorage on component mount
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    setError(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da88006cac3b22b8ef1f782b75e70b35&units=metric`
      );
      setWeather(response.data);
      console.log(`Temperature in ${city}: ${response.data.main.temp} °C`);
      console.log(`Humidity in ${city}: ${response.data.main.humidity}%`);
    } catch (error) {
      setError('Error fetching weather data. Please make sure the city name is correct.');
      console.error('Error fetching weather data', error);
    }
  };

  const addToFavourites = () => {
    if (weather && !favourites.some(fav => fav.name === weather.name)) {
      const newFavourites = [...favourites, weather];
      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites)); // Save to localStorage
    }
  };

  const removeFromFavourites = () => {
    if (selectedCity) {
      const updatedFavourites = favourites.filter(fav => fav.name !== selectedCity);
      setFavourites(updatedFavourites);
      localStorage.setItem('favourites', JSON.stringify(updatedFavourites)); // Update localStorage
      setSelectedCity(null); // Clear selection after removal
    }
  };

  return (
    <div>
      <Navbar onCityChange={setCity} getWeather={getWeather} />
      <div className="app-container">
        <div className="left-side">
          <div className="card">
            <div className="card-body">
              <h1 className='text'>Weather</h1>
              <p className='text'>AT</p>
              {error && <p className="error">{error}</p>}
              <div className="weather-details">
                <h2>{weather ? weather.name : defaultWeather.name}</h2>
                <p>{weather ? weather.weather[0].description : defaultWeather.weather[0].description}</p>
                <p>Temperature: {weather ? weather.main.temp : defaultWeather.main.temp} °C</p>
                <p>Humidity: {weather ? weather.main.humidity : defaultWeather.main.humidity}%</p>
                <button className='button' onClick={addToFavourites}>Add to favourites</button>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="favourites-container">
            <h3>Favourites</h3>
            <ul>
              {favourites.map((fav, index) => (
                <li key={index}>
                  <input
                    type="radio"
                    id={`fav-${index}`}
                    name="favourite"
                    value={fav.name}
                    checked={selectedCity === fav.name}
                    onChange={() => setSelectedCity(fav.name)}
                  />
                  <label htmlFor={`fav-${index}`}>
                    {fav.name} - {fav.weather[0].description}
                  </label>
                </li>
              ))}
            </ul>
            <button className='button' onClick={removeFromFavourites} disabled={!selectedCity}>
              Remove Selected City
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
