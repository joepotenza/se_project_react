import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ weatherData, clothingItems, clickItemHandler }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__suggestion">
          {weatherData.temp === 999
            ? ""
            : `Today is ${weatherData.temp} ° F / You may want to wear:`}
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.condition;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onClick={clickItemHandler}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
