const weatherConditions = {
  day: {
    clear: new URL("../images/condition-day-clear.png", import.meta.url).href,
    cloudy: new URL("../images/condition-day-cloudy.png", import.meta.url).href,
    fog: new URL("../images/condition-day-fog.png", import.meta.url).href,
    rain: new URL("../images/condition-day-rain.png", import.meta.url).href,
    snow: new URL("../images/condition-day-snow.png", import.meta.url).href,
    storm: new URL("../images/condition-day-storm.png", import.meta.url).href,
  },
  night: {
    clear: new URL("../images/condition-night-clear.png", import.meta.url).href,
    cloudy: new URL("../images/condition-night-cloudy.png", import.meta.url)
      .href,
    fog: new URL("../images/condition-night-fog.png", import.meta.url).href,
    rain: new URL("../images/condition-night-rain.png", import.meta.url).href,
    snow: new URL("../images/condition-night-snow.png", import.meta.url).href,
    storm: new URL("../images/condition-night-storm.png", import.meta.url).href,
  },
};

const weatherAPIConfig = {
  key: "cd4ab79901f6f8879c3f939d2c1f4442",
  lat: 28.321260551913426,
  long: -81.43602167606302,
};

export { weatherAPIConfig, weatherConditions };
