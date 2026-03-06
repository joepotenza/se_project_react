import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  showSuggestion,
  showAddLink,
  clothingItems,
  currentTemperature,
  currentTemperatureUnit,
  currentWeatherCondition,
  onClickItem,
  onClickAddLink,
}) {
  return (
    <section className="cards">
      {showSuggestion ? (
        currentTemperature !== 999 ? (
          <p className="cards__suggestion">
            Today is {currentTemperature}&deg; {currentTemperatureUnit} / You
            may want to wear:
          </p>
        ) : (
          <p className="cards__suggestion">Loading weather data...</p>
        )
      ) : (
        ""
      )}

      {showAddLink ? (
        <div className="cards__header">
          <div className="cards__header-text">Your Items</div>
          <button
            className="cards__add-link"
            type="button"
            onClick={onClickAddLink}
          >
            + Add new
          </button>
        </div>
      ) : (
        <></>
      )}

      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            // default to showing all if condition is never set
            return (
              currentWeatherCondition === "" ||
              item.weather === currentWeatherCondition
            );
          })
          .map((item) => {
            return (
              <ItemCard key={item._id} item={item} onClick={onClickItem} />
            );
          })}
      </ul>
    </section>
  );
}
export default ClothesSection;
