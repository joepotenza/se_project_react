import validator from "validator";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onOpen, onClose, onLogin, signupHandler }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!validator.isEmail(values.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.password) {
      errors.password = "Please enter a password.";
    }

    return errors;
  };

  const { values, handleChange, errors, resetForm, handleSubmit } =
    useFormWithValidation(defaultValues, validate);

  const handleFormSubmit = (evt) => {
    handleSubmit(evt, () => onLogin(values, resetForm));
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      name="user-login"
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      signupHandler={signupHandler}
    >
      <label
        htmlFor="login-email"
        className={`modal__label ${errors.email ? "modal__label_has-error" : ""}`}
      >
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={`modal__input ${errors.email ? "modal__input_has-error" : ""}`}
          id="login-email"
          placeholder="Email"
        />
        <span
          className={`modal__error ${errors.email ? "modal__error_has-error" : ""}`}
          id="login-email-error"
        >
          {errors.email}
        </span>
      </label>

      <label
        htmlFor="login-password"
        className={`modal__label ${errors.password ? "modal__label_has-error" : ""}`}
      >
        Password
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={`modal__input ${errors.password ? "modal__input_has-error" : ""}`}
          id="login-password"
          placeholder="Password"
        />
        <span
          className={`modal__error ${errors.password ? "modal__error_has-error" : ""}`}
          id="login-password-error"
        >
          {errors.password}
        </span>
      </label>
    </ModalWithForm>
  );
};
export default LoginModal;
