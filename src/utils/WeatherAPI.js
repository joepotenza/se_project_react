/*
  API for openweathermap.org
*/
export default class WeatherAPI {
  constructor({ key, lat, long }) {
    this._key = key;
    this._lat = lat;
    this._long = long;
    this._url = `https://api.openweathermap.org/data/2.5/weather?lat=${this._lat}&lon=${this._long}&units=imperial&appid=${this._key}`;
  }

  getWeatherType(id) {
    /*
    2xx: Thunderstorm
    3xx: Drizzle, 5xx: Rain
    6xx: Snow
    7xx: Atmosphere
    800: Clear
    801-804: Cloudy
     */
    if (id < 200) return "N/A";
    if (id >= 200 && id < 300) return "storm";
    if ((id >= 300 && id < 400) || (id >= 500 && id < 600)) return "rain";
    if (id < 700) return "snow";
    if (id < 800) return "fog";
    if (id === 800 || id === 801) return "clear";
    if (id < 805) return "cloudy";
    return "N/A";
  }

  // Get simplified "weather condition" type
  // Possible future addition: Allow for these numbers to change based on location
  getWeatherCondition(temperature) {
    if (temperature > 86) {
      return "hot";
    } else if (temperature >= 66 && temperature < 86) {
      return "warm";
    } else {
      return "cold";
    }
  }

  getCurrentWeatherData() {
    return fetch(this._url, {
      method: "GET",
      "Content-Type": "application/json",
    }).then((res) => {
      if (res.ok) {
        // Parse the JSON response on success
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  processWeatherData(data) {
    // get type based on the ID from the API
    const type = this.getWeatherType(data.weather[0].id);
    // The api includes an icon that specifies day or night so use that to set the day/night flag
    const isDay = data.weather[0].icon[data.weather[0].icon.length - 1] === "d";
    const temp = Math.round(data.main.temp);
    return {
      city: data.name,
      temp: temp,
      condition: this.getWeatherCondition(temp),
      type: type,
      isDay: isDay,
    };
  }
}
