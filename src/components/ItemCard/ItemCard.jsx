import "./ItemCard.css";

function ItemCard({ item, onClick, showLikeButton, isLiked, onCardLike }) {
  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name" onClick={() => onClick(item)}>
          {item.name}
        </h2>
        {showLikeButton && (
          <button
            className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
            onClick={() => onCardLike(item, isLiked)}
          ></button>
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onClick(item)}
      />
    </li>
  );
}

export default ItemCard;
