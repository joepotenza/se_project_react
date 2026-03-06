import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard(props) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentTemperature = props.weatherData.temp[currentTemperatureUnit];
  return currentTemperature === 999 ? (
    ""
  ) : (
    <section className="weather">
      <p className="weather__temperature">
        {currentTemperature}&deg; {currentTemperatureUnit}
      </p>
      <img
        className="weather__image"
        alt={`Weather: ${props.weatherData.type}`}
        src={props.weatherData.conditionImage}
      />
    </section>
  );
}

export default WeatherCard;
