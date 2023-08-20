import { getWeather } from './weather.js';
import { searchCities } from './city.js';

let city, state, location = "";
// Gets user location
navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

// On page load, after allowing location to be shared, gets user's current location's weather data
// TODO: Retrieve location name from returned coordinates to display in app
function positionSuccess({ coords }) {
  getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
    res => {
      console.log(res);
      // Get current/high/low temp information for location and displays it on screen
      document.getElementById('temperature').innerHTML = res.current.currentTemp + '&deg F';
      document.getElementById('high_temp').innerHTML = res.current.highTemp + '&deg F';
      document.getElementById('low_temp').innerHTML = res.current.lowTemp + '&deg F';
      document.getElementById('rain_chance').innerHTML = res.daily[0].rainChance + '%';
      if (parseInt(res.daily[0].rainChance) >= 50) {
        document.getElementById("day0icon").src="./img/rain-icon.png";
      } else {
        document.getElementById("day0icon").src="./img/sun-icon.png";
      }
      // Loops through and writes the 7-day forecast information to screen
      for (let i = 1; i < 7; i++ ) {
        document.getElementById('day' + i).innerHTML = res.daily[i].timestamp.slice(5);
        document.getElementById('high_temp' + i).innerHTML = res.daily[i].maxTemp + '&deg F';
        document.getElementById('low_temp' + i).innerHTML = res.daily[i].minTemp + '&deg F';
        document.getElementById('rain_chance' + i).innerHTML = res.daily[i].rainChance + '%';
        if (parseInt(res.daily[i].rainChance) >= 50) {
          document.getElementById("day" + i + "icon").src="./img/rain-icon.png";
        } else {
          document.getElementById("day" + i + "icon").src="./img/sun-icon.png";
        }
      } 
    }
  )
}

function positionError() {
  alert("Error getting location");
}

// Listens for updates on the search bar and calls API to search for cities that match string
let search_bar = document.getElementById('search-city');
search_bar.addEventListener('keyup', (event) => {
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
      let lat = res.data.results[0].latitude;
      let lon = res.data.results[0].longitude;
      let timezone = res.data.results[0].timezone;
      location = city + ", " + state;
      document.getElementById('city').innerHTML = location;
      // Automatically updates temperature information as it's typed in
      // Component is working, but needs to be restructured to update weather info when desired city is chosen from list
      
      getWeather(lat, lon, timezone).then(
        res => {
          console.log(res);
          // Get current/high/low temp information for location and displays it on screen
          document.getElementById('temperature').innerHTML = res.current.currentTemp + '&deg F';
          document.getElementById('high_temp').innerHTML = res.current.highTemp + '&deg F';
          document.getElementById('low_temp').innerHTML = res.current.lowTemp + '&deg F';
          document.getElementById('rain_chance').innerHTML = res.daily[0].rainChance + '%';
          if (parseInt(res.daily[0].rainChance) >= 50) {
            document.getElementById("day0icon").src="./img/rain-icon.png";
          } else {
            document.getElementById("day0icon").src="./img/sun-icon.png";
          }
          // Loops through and writes the 7-day forecast information to screen
          for (let i = 1; i < 7; i++ ) {
            document.getElementById('day' + i).innerHTML = res.daily[i].timestamp.slice(5);
            document.getElementById('high_temp' + i).innerHTML = res.daily[i].maxTemp + '&deg F';
            document.getElementById('low_temp' + i).innerHTML = res.daily[i].minTemp + '&deg F';
            document.getElementById('rain_chance' + i).innerHTML = res.daily[i].rainChance + '%';
            if (parseInt(res.daily[i].rainChance) >= 50) {
              document.getElementById("day" + i + "icon").src="./img/rain-icon.png";
            } else {
              document.getElementById("day" + i + "icon").src="./img/sun-icon.png";
            }
          } 
        }
      )
    }
  )
})