import "./DeleteItemModal.css";
import Modal from "../Modal/Modal";

function DeleteItemModal({
  isOpen,
  onClose,
  confirmDeleteHandler,
  cancelDeleteHandler,
}) {
  return (
    <Modal name="delete" isOpen={isOpen} onClose={onClose}>
      <button
        className="modal__close-btn modal__close-btn_type_delete"
        type="button"
        onClick={onClose}
      ></button>
      <div className="modal__delete-container">
        <div className="modal__delete-content">
          Are you sure you want to delete this item? This action is
          irreversible.
        </div>
        <button
          className="modal__delete-confirm"
          type="button"
          onClick={confirmDeleteHandler}
        >
          Yes, delete item
        </button>
        <button
          className="modal__delete-cancel"
          type="button"
          onClick={cancelDeleteHandler}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteItemModal;
