import { getWeather } from './weather';
import { searchCities } from './city';

// Retrieves desired API information on page load
// Need to add listener for search button (or select click, undecided) to call this function with
// desired city's lat/lon/timezone
getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
  res => {
    console.log(res.data);
  }
)

let search_button = document.getElementById('search-button');

// Listens for updates on the search bar and calls API to search for cities that match string
let city = "";
let state = "";
let location = "";
let search_bar = document.getElementById('search-city');
search_bar.addEventListener('keydown', (event) => {
  searchCities(search_bar.value).then(
    res => {
      console.log(res.data);
      // Tentative name change based on first search result
      // Locations data are stored under (res.data.results[0-9])
      // Need to pull lat/lon data for weather
      city = res.data.results[0].name;
      // If city is not in the US, display country instead of state
      if (res.data.results[0].country_code === 'US') {
        state = res.data.results[0].admin1;
      } else {
        state = res.data.results[0].country;
      }

      location = city + ", " + state;
      document.getElementById('city').innerHTML = location;
    }
  )
})