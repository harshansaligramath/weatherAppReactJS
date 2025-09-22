import { Oval } from 'react-loader-spinner';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { API_URL, API_KEY } from '../config';

function WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const search = async (event) => {
    event.preventDefault();
    setInput('');
    setWeather({ ...weather, loading: true });

    try {
      const res = await axios.get(API_URL, {
        params: {
          q: input,
          units: 'metric',
          appid: API_KEY,
        },
      });
      console.log("response===",res)
      setWeather({ data: res.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      setInput('');
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <h1 className="app-name">Weather App</h1>

        <form className="search" onSubmit={search}>
          <input
            type="text"
            className="city-search"
            placeholder="Enter City Name.."
            name="query"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        {weather.loading && (
          <div className="loader-container">
            <Oval color="red" height={100} width={100} margin />
          </div>
        )}
        {weather.error && (
          <>
            <br />
            <br />
            <span className="error-message">
              <FontAwesomeIcon icon={faFrown} />
              <span style={{ fontSize: '20px' }}>City not found</span>
            </span>
          </>
        )}
        {weather.data.main && (
          <div>
            <div className="city-name">
              <h2>{weather.data.name}, <span>{weather.data.sys.country}</span></h2>
              <h2>Humidity: {Math.round(weather.data.main.humidity)}%</h2>
            </div>
            <div className="icon-temp">
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt={weather.data.weather[0].description}
              />
              {Math.round(weather.data.main.temp)}
              <sup className="deg">°C</sup>
            </div>
            <div className="des-wind">
              <p>{weather.data.weather[0].description.toUpperCase()}</p>
              <p>Wind Speed: {weather.data.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
