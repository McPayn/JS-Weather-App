import axios from "axios";

// API call to retrieve desired weather data
// Nothing more should need to be done here
export function getWeather(lat, lon, timezone) {
    return axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,cloudcover,windspeed_10m&temperature_unit=fahrenheit&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=America%2FLos_Angeles', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone
        },
    });
}