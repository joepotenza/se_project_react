import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onOpen, onClose, onAddItem }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!values.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required.";
    } else {
      try {
        new URL(values.imageUrl);
      } catch {
        errors.imageUrl = "Please enter a valid URL.";
      }
    }

    if (!values.weather) {
      errors.weather = "Please select a weather type.";
    }

    return errors;
  };

  const { values, handleChange, errors, isSubmitted, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues, validate);

  const handleFormSubmit = (evt) => {
    handleSubmit(evt, () => onAddItem(values, resetForm));
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="new-item"
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <label
        htmlFor="item-name"
        className={`modal__label ${errors.name ? "modal__label_has-error" : ""}`}
      >
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={`modal__input ${errors.name ? "modal__input_has-error" : ""}`}
          id="item-name"
          placeholder="Name"
        />
        <span
          className={`modal__error ${errors.name ? "modal__error_has-error" : ""}`}
          id="item-name-error"
        >
          {errors.name}
        </span>
      </label>

      <label
        htmlFor="item-image"
        className={`modal__label ${errors.imageUrl ? "modal__label_has-error" : ""}`}
      >
        Image
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          className={`modal__input ${errors.imageUrl ? "modal__input_has-error" : ""}`}
          id="item-image"
          placeholder="Image URL"
        />
        <span
          className={`modal__error ${errors.imageUrl ? "modal__error_has-error" : ""}`}
          id="item-image-error"
        >
          {errors.imageUrl}
        </span>
      </label>

      <fieldset
        className={`modal__radio-buttons ${errors.weather ? "modal__radio-buttons_has-error" : ""}`}
      >
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
      </fieldset>
      <span
        className={`modal__error ${errors.weather ? "modal__error_has-error" : ""}`}
        id="item-type-error"
      >
        {errors.weather}
      </span>
    </ModalWithForm>
  );
};
export default AddItemModal;
