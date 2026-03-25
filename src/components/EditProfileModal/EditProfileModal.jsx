import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onOpen, onClose, onEditProfile }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser.name,
    avatar: currentUser.avatar,
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Please enter a name.";
    }
    if (!values.avatar) {
      errors.avatar = "Please enter an Avatar URL.";
    } else {
      try {
        new URL(values.avatar);
      } catch {
        errors.avatar = "Please enter a valid URL.";
      }
    }

    return errors;
  };

  const { values, handleChange, errors, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues, validate);

  const handleFormSubmit = (evt) => {
    handleSubmit(evt, () => onEditProfile(values, resetForm));
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="user-profile"
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
    >
      <label
        htmlFor="profile-name"
        className={`modal__label ${errors.name ? "modal__label_has-error" : ""}`}
      >
        Name *
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={`modal__input ${errors.name ? "modal__input_has-error" : ""}`}
          id="profile-name"
          placeholder="Name"
        />
        <span
          className={`modal__error ${errors.name ? "modal__error_has-error" : ""}`}
          id="profile-name-error"
        >
          {errors.name}
        </span>
      </label>

      <label
        htmlFor="profile-avatar"
        className={`modal__label ${errors.avatar ? "modal__label_has-error" : ""}`}
      >
        Avatar *
        <input
          type="text"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          className={`modal__input ${errors.avatar ? "modal__input_has-error" : ""}`}
          id="profile-avatar"
          placeholder="Avatar URL"
        />
        <span
          className={`modal__error ${errors.avatar ? "modal__error_has-error" : ""}`}
          id="profile-avatar-error"
        >
          {errors.avatar}
        </span>
      </label>
    </ModalWithForm>
  );
};
export default EditProfileModal;
