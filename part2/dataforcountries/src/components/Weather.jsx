import { useState, useEffect } from "react";
import axios from "axios";

const baseURL = 'http://api.openweathermap.org/data/2.5/weather'

const Weather = ({ country }) => {
    // States
    const [weatherData, setWeatherData] = useState(null)

    // Event henlers
    useEffect(() => {
        const params = {
            lat: country.latlng[0],
            lon: country.latlng[1],
            units: 'metric',
            APPID: import.meta.env.VITE_API_KEY,
        }

        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const url = `${baseURL}?${queryString}`

        axios
            .get(url)
            .then(response => {
                const data = {
                    'temp': response.data.main.temp,
                    'icon': `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                    'speed': response.data.wind.speed
                }
                setWeatherData(data)
            })
    }, [country])

    if (weatherData === null) {
        return null
    }

    return (
        <div>
            <h1>Weather in {country.capital}</h1>
            <p>temperature {weatherData.temp} Celcius</p>
            <img src={weatherData.icon}></img>
            <p>wind {weatherData.speed} m/s</p>
        </div>
    )
}

export default Weather