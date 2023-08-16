import axios from "axios";

// API call that searches for passed in city
// Nothing more should need to be done here
export function searchCities(city) {
    return axios.get('https://geocoding-api.open-meteo.com/v1/search?name=' + city + '&count=10&language=en&format=json');
}