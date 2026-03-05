import { useState, useEffect } from "react";
import "./App.css";

import {
  defaultClothingItems,
  weatherAPIConfig,
  weatherConditions,
} from "../../utils/constants.js";

import {
  enableValidation,
  toggleButtonState,
  hideInputError,
  checkInputValidity,
  validationSettings,
} from "../../utils/validation.js";

import WeatherAPI from "../../utils/WeatherAPI.js";
const weatherAPI = new WeatherAPI(weatherAPIConfig);

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    temp: 999,
    type: "",
    isDay: false,
    conditionImage: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    image: "",
    title: "",
    weather: "",
  });
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  // Handler to display "new garment" modal
  function handleOpenModalWithForm(evt) {
    setActiveModal("new-item");
    document.addEventListener("keydown", closeModalWithEscapeKey);
  }

  // Handler to display "item detail" modal
  function handleOpenItemModal(evt) {
    setActiveModal("item-detail");
    const card = evt.target.closest(".card");
    const image = card.querySelector(".card__image").src;
    const title = card.querySelector(".card__name").textContent;
    const weather = `Weather: ${card.querySelector(".card__weather").textContent}`;
    setSelectedCard({ image, title, weather });
    document.addEventListener("keydown", closeModalWithEscapeKey);
  }

  // Handler to close any active modal
  function handleCloseModal(evt) {
    setActiveModal("");
    document.removeEventListener("keydown", closeModalWithEscapeKey);
  }

  // Close active modal when Escape key is pressed
  function closeModalWithEscapeKey(evt) {
    if (evt.key == "Escape") {
      handleCloseModal(evt);
    }
  }

  // When opening modal form, clear previous cancelled input, hide previous error messages, make sure button state is correct
  function handleOpenNewItemForm() {
    const newItemForm = document.forms["new-item"];
    const newItemName = newItemForm.querySelector("#item-name");
    const newItemImage = newItemForm.querySelector("#item-image");
    const newItemSubmitBtn = newItemForm.querySelector(".modal__submit-btn");
    const inputList = [newItemName, newItemImage];

    newItemForm.reset();

    inputList.forEach((inputElement) => {
      const errorElement = newItemForm.querySelector(
        `#${inputElement.id}-error`,
      );
      hideInputError(
        inputElement,
        errorElement,
        validationSettings.errorClass,
        validationSettings.errorElementClass,
      );
    });
    toggleButtonState(
      inputList,
      newItemSubmitBtn,
      validationSettings.inactiveButtonClass,
    );
  }

  // Quietly clear new item form on submit - form processing TBD in future Sprint
  function handleNewItemSubmit(evt) {
    evt.preventDefault();
    const newItemForm = document.forms["new-item"];
    newItemForm.reset();
    handleCloseModal(evt);
  }

  // Track opening/closing mobile menu, since WeatherCard is located in Main and not Header
  function handleToggleMobileMenu(isOpen) {
    setIsMobileMenuOpened(isOpen);
  }

  useEffect(() => {
    //When rendering, fetch the weather data
    weatherAPI
      .getCurrentWeatherData()
      .then((data) => {
        // Process the API data and insert the correct image based on weather condition and time of day
        const processedData = weatherAPI.processWeatherData(data);
        const imageList =
          weatherConditions[processedData.isDay ? "day" : "night"];
        const newData = {
          ...processedData,
          ...{
            conditionImage: imageList[processedData.type]
              ? imageList[processedData.type]
              : "",
          },
        };
        // Update the local variable
        setWeatherData(newData);
      })
      .catch(console.error);

    enableValidation(validationSettings);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          weatherData={weatherData}
          openModalHandler={handleOpenModalWithForm}
          mobileMenuHandler={handleToggleMobileMenu}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          clickItemHandler={handleOpenItemModal}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <Footer />
        <ModalWithForm
          name="new-item"
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "new-item"}
          onOpen={handleOpenNewItemForm}
          onClose={handleCloseModal}
          onSubmit={handleNewItemSubmit}
        >
          <label htmlFor="item-name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="item-name"
              placeholder="Name"
              required
            />
          </label>
          <span className="modal__error" id="item-name-error"></span>
          <label htmlFor="item-image" className="modal__label">
            Image
            <input
              type="url"
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
                name="item-radio"
                defaultChecked
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
                name="item-radio"
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
                name="item-radio"
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

        <ItemModal
          name="item-detail"
          isOpen={activeModal === "item-detail"}
          onClose={handleCloseModal}
          image={selectedCard.image}
          title={selectedCard.title}
          weather={selectedCard.weather}
        />
      </div>
    </div>
  );
}

export default App;
