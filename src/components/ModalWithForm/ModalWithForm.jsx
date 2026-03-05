import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""} modal_type_${name}`}
      id={`${name}-modal`}
    >
      <div className="modal__container">
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
      </div>
    </div>
  );
}

export default ModalWithForm;
