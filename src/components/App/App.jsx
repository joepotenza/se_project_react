import { useState, useEffect } from "react";
import "./App.css";
import {
  defaultClothingItems,
  weatherAPIConfig,
  weatherConditions,
} from "../../utils/constants.js";
import WeatherAPI from "../../utils/WeatherAPI.js";
const weatherAPI = new WeatherAPI(weatherAPIConfig);

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: 999,
    type: "",
    day: false,
    conditionImage: "",
  });

  useEffect(() => {
    //When rendering, fetch the weather data
    weatherAPI
      .getCurrentWeatherData()
      .then((data) => {
        // Process the API data and insert the correct image based on weather condition and time of day
        const processedData = weatherAPI.processWeatherData(data);
        const conditions =
          weatherConditions[processedData.day ? "day" : "night"];
        const image = conditions[processedData.type]
          ? conditions[processedData.type]
          : "";
        const newData = {
          ...processedData,
          ...{
            conditionImage: image,
          },
        };
        // Update the local variable
        setWeatherData(newData);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
