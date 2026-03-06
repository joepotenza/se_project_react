import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onOpen, onClose, onAddItem }) => {
  const defaultValues = {
    name: "",
    link: "",
    weather: "hot",
  };
  const { values, handleChange, setValues } = useForm(defaultValues);
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
      onOpen={onOpen}
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
      <label htmlFor="item-link" className="modal__label">
        Image
        <input
          type="url"
          name="link"
          value={values.link}
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
