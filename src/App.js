import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('Tokyo');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  // Fetch coordinates for the city
  const fetchCoordinates = async (cityName) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const { latitude, longitude } = data.results[0];
        setCoordinates({ latitude, longitude });
      } else {
        setError('City not found. Please try a different city.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to fetch location. Please try again.');
      setLoading(false);
    }
  };

  // Fetch weather data
  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`
      );
      const data = await response.json();
      
      if (data.current_weather) {
        setWeather(data);
        setError(null);
      } else {
        setError('Weather data not available.');
      }
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      setWeather(null);
      await fetchCoordinates(city);
    };

    loadWeather();
  }, [city]);

  useEffect(() => {
    if (coordinates) {
      fetchWeather(coordinates.latitude, coordinates.longitude);
    }
  }, [coordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements.city.value.trim();
    if (inputCity) {
      setCity(inputCity);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-title">Weather Now</h1>
        <p className="app-subtitle">Current conditions for any city</p>
        
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            name="city"
            placeholder="Enter city name..."
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        {weather && !loading && !error && (
          <WeatherDisplay weather={weather.current_weather} city={city} />
        )}
      </div>
    </div>
  );
}

export default App;

