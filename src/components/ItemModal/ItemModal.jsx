import "./ItemModal.css";

function ItemModal({ name, image, title, text, isOpen, onClose, children }) {
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
      </div>
    </div>
  );
}

export default ItemModal;
