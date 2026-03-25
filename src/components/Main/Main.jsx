import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import ClothesSection from "../ClothesSection/ClothesSection";

function Main({
  weatherData,
  clothingItems,
  clickItemHandler,
  clickItemLikeHandler,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentTemperature = weatherData.temp[currentTemperatureUnit];

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <ClothesSection
        clothingItems={clothingItems}
        showSuggestion={true}
        currentTemperature={currentTemperature}
        currentTemperatureUnit={currentTemperatureUnit}
        currentWeatherCondition={weatherData.condition}
        onClickItem={clickItemHandler}
        onCardLike={clickItemLikeHandler}
      />
    </main>
  );
}

export default Main;
