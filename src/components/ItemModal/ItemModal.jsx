import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  name,
  imageUrl,
  title,
  weather,
  owner,
  isOpen,
  onClose,
  clickDeleteHandler,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <button
        className="modal__close-btn modal__close-btn_type_item-detail"
        type="button"
        onClick={onClose}
      ></button>
      <div className="modal__item-container">
        <div className="modal__image-container">
          {imageUrl !== "" ? (
            <img
              className="modal__image"
              src={imageUrl}
              alt={title}
              width="325"
            ></img>
          ) : (
            ""
          )}
        </div>
        <div className="modal__item-content">
          <div className="modal__item-details">
            <h2 className="modal__card-name">{title}</h2>
            <div className="modal__item-text">Weather: {weather}</div>
          </div>
          {owner === currentUser._id ? (
            <button
              className="modal__item-delete-btn"
              type="button"
              onClick={clickDeleteHandler}
            >
              Delete item
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
