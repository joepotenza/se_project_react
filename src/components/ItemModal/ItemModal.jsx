import "./ItemModal.css";

function ItemModal({ name, image, title, weather, isOpen, onClose, children }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""} modal_type_${name}`}
      id={`${name}-modal`}
    >
      <div className="modal__container modal__container_type_item-detail">
        <button
          className="modal__close-btn modal__close-btn_type_item-detail"
          type="button"
          onClick={onClose}
        ></button>
        <div className="modal__item-container">
          <div className="modal__image-container">
            <img
              className="modal__image"
              src={image}
              alt={title}
              width="325"
            ></img>
          </div>
          <div className="modal__item-details">
            <h2 className="modal__card-name">{title}</h2>
            <div className="modal__item-text">{weather}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
