import React, { useState, useEffect } from 'react';
import './index.css';

const Navbar = ({ onCityChange, getWeather }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setCity(searchTerm.trim()); // Update the city state
    }
  };

  useEffect(() => {
    if (city) {
      onCityChange(city); 
      getWeather(); // Call getWeather after the city is updated
      console.log('Search:', city); 
    }
  }, [city, onCityChange, getWeather]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">Weather App</a>
      </div>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button className='button' type="submit" disabled={!searchTerm.trim()}>
          Search
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
