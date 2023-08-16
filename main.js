import { getWeather } from './weather'
import { searchCities } from './city';

// Retrieves desired API information on page load
// Need to add listener for search button (or select click, undecided) to call this function with
// desired city's lat/lon/timezone
getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
  res => {
    console.log(res.data);
  }
)

// Listens for updates on the search bar and calls API to search for cities that match string
let search_bar = document.getElementById('search-city');
search_bar.addEventListener('change', (event) => {
  searchCities(search_bar.value).then(
    res => {
      console.log(res.data);
    }
  )
})