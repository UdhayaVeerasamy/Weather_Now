import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weather, city }) => {
  const getWeatherIcon = (code) => {
    // Weather codes from Open-Meteo API
    if (code === 0) return '☀️'; // Clear sky
    if (code >= 1 && code <= 3) return '🌤️'; // Mainly clear, partly cloudy
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 67) return '🌧️'; // Drizzle and rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Rain showers
    if (code >= 85 && code <= 86) return '🌨️'; // Snow showers
    if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
    return '🌡️';
  };

  const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snowy';
    if (code >= 80 && code <= 82) return 'Rain Showers';
    if (code >= 85 && code <= 86) return 'Snow Showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Unknown';
  };

  return (
    <div className="weather-display">
      <div className="weather-header">
        <h2 className="city-name">{city}</h2>
        <div className="weather-icon">{getWeatherIcon(weather.weathercode)}</div>
      </div>
      
      <div className="weather-main">
        <div className="temperature">
          {weather.temperature.toFixed(0)}°
        </div>
        <div className="weather-description">
          {getWeatherDescription(weather.weathercode)}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.windspeed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{weather.winddirection}°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;

