import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  showSuggestion,
  showAddLink,
  clothingItems,
  currentTemperature,
  currentTemperatureUnit,
  currentWeatherCondition,
  onClickItem,
  onClickAddLink,
  onCardLike,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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
            // Filter by owner for current user Id only when on profile page
            return (
              (!showAddLink || currentUser._id === item.owner) &&
              (currentWeatherCondition === "" ||
                item.weather === currentWeatherCondition)
            );
          })
          .map((item) => {
            const isLiked = item.likes.some((id) => id === currentUser._id);
            return (
              <ItemCard
                key={item._id}
                item={item}
                onClick={onClickItem}
                onCardLike={onCardLike}
                showLikeButton={isLoggedIn}
                isLiked={isLiked}
              />
            );
          })}
      </ul>
    </section>
  );
}
export default ClothesSection;
