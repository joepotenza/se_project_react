import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  return (
    <li className="card" onClick={onClick} item-id={item._id}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.link} alt={item.name} />
      <span className="card__weather">{item.weather}</span>
    </li>
  );
}

export default ItemCard;
