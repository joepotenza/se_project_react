import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onOpen, onClose, onAddItem }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
  const handleOpen = () => {
    handleReset();
    onOpen();
  };
  const handleReset = () => {
    setValues(defaultValues);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values, handleReset);
  };
  return (
    <ModalWithForm
      name="new-item"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onOpen={handleOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="item-name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="modal__input"
          id="item-name"
          placeholder="Name"
          required
        />
      </label>
      <span className="modal__error" id="item-name-error"></span>
      <label htmlFor="item-imageUrl" className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          className="modal__input"
          id="item-image"
          placeholder="Image URL"
          required
        />
      </label>
      <span className="modal__error" id="item-image-error"></span>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            id="item-radio-hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="item-radio-hot"
            className="modal__label modal__label_type_radio"
          >
            Hot
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            id="item-radio-warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label
            htmlFor="item-radio-warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            type="radio"
            className="modal__radio-input"
            id="item-radio-cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label
            htmlFor="item-radio-cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </div>
        <span className="modal__error" id="item-type-error"></span>
      </fieldset>
    </ModalWithForm>
  );
};
export default AddItemModal;
