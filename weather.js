import axios from "axios";

// API link
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,cloudcover,windspeed_10m&daily=weathercode,temperature_2m_max,sunrise,sunset,precipitation_sum&timezone=America%2FLos_Angeles

export function getWeather(lat, lon, timezone) {
    return axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,cloudcover,windspeed_10m&daily=weathercode,temperature_2m_max,sunrise,sunset,precipitation_sum&timezone=America%2FLos_Angeles', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone
        },
    });
}