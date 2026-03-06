/** Modal wrapper for any type of Modal dialog **/
import { useEffect } from "react";
import "./Modal.css";

function Modal({ name, isOpen, onClose, onSubmit, onOpen, children }) {
  // Allow for a handler to execute when the modal is opened (for form validation)
  useEffect(() => {
    if (isOpen && onOpen) {
      onOpen();
    }
  }, [isOpen]);

  function handleModalClick(evt) {
    // Close the active modal when clicking on the overlay (outside the modal borders)
    if (evt.target.classList.contains("modal")) {
      onClose(evt);
    }
  }

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""} modal_type_${name}`}
      id={`${name}-modal`}
      onClick={handleModalClick}
    >
      <div className={`modal__container modal__container_type_${name}`}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
