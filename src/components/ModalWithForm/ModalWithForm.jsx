import { useEffect } from "react";
import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  onOpen,
  children,
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <button
        className="modal__close-btn"
        type="button"
        onClick={onClose}
      ></button>
      <div className="modal__header">
        <h2 className="modal__title">{title}</h2>
      </div>
      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}
        <button
          className="modal__submit-btn modal__submit-btn_disabled"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
