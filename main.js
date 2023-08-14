import './style.css'
import { getWeather } from './weather'

// Retrieves desired API information on page load
getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).then(
  res => {
    console.log(res.data);
  }
)