// API call to retrieve desired weather data
// Nothing more should need to be done here
export function getWeather(lat, lon, timezone) {
    return axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation_probability,precipitation,weathercode,cloudcover,windspeed_10m&current_weather=true&temperature_unit=fahrenheit&daily=weathercode,precipitation_probability_max,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=America%2FLos_Angeles', {
        params: {
            latitude: lat,
            longitude: lon,
            timezone
        },
    }).then(({data}) => {
        console.log(data);
        // Calls functions to parse and return specific weather data
        return {
            current: getCurrentWeather(data),
            daily: getDailyWeather(data)
        }
    })
}

// Returns the rounded values for the current day's current temp/high temp/low temp
function getCurrentWeather({current_weather, daily}) {
    const {temperature: currentTemp} = current_weather;
    const {temperature_2m_max: [maxTemp], temperature_2m_min: [minTemp]} = daily;
    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp)
    }
}

// Returns the min/max temp for the next 6 days
function getDailyWeather({ daily }) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time,
            maxTemp: Math.round(daily.temperature_2m_max[index]),
            minTemp: Math.round(daily.temperature_2m_min[index]),
            rainChance: Math.round(daily.precipitation_probability_max[index])
        }
    })
}