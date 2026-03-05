import "./WeatherCard.css";
function WeatherCard(props) {
  return props.weatherData.temp === -100 ? (
    <></>
  ) : (
    <>
      <section className="weather">
        <p className="weather__temperature">{props.weatherData.temp}&deg; F</p>
        <img
          className="weather__image"
          src={props.weatherData.conditionImage}
        />
      </section>
    </>
  );
}

export default WeatherCard;
