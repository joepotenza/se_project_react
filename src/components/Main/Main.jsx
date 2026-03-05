import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useState, useEffect } from "react";
import "./Main.css";

function Main(props) {
  return (
    <main className="main">
      <WeatherCard weatherData={props.weatherData} />
      <p className="main__subtext">
        {props.weatherData.temp === 999
          ? ""
          : `Today is ${props.weatherData.temp} ° F / You may want to wear:`}
      </p>
    </main>
  );
}

export default Main;
