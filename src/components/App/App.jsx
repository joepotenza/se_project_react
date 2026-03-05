import { useState, useEffect } from "react";
import "./App.css";
import {
  defaultClothingItems,
  weatherAPIConfig,
  weatherConditions,
} from "../../utils/constants.js";
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
    temp: 999,
    type: "",
    isDay: false,
    conditionImage: "",
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  // Handler to display "new garment" modal
  function handleOpenModalWithForm(evt) {
    setActiveModal("new-item");
    document.addEventListener("keydown", closeModalWithEscapeKey);
  }

  // Handler to display "item detail" modal
  function handleOpenItemModal(evt) {
    console.log("handleOpenItemModal");
    setActiveModal("item-detail");
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

  // Close the active modal when clicking on the overlay (outside the modal borders)
  const allModals = document.querySelectorAll(".modal");
  allModals.forEach((modal) => {
    modal.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        handleCloseModal(evt);
      }
    });
  });

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
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          weatherData={weatherData}
          openModalHandler={handleOpenModalWithForm}
        />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          clickItemHandler={handleOpenItemModal}
        />
        <Footer />
        <ModalWithForm
          name="new-item"
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "new-item"}
          onClose={handleCloseModal}
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
            <label
              htmlFor="item-radio-hot"
              className="modal__label modal__label_type_radio modal__label_type_radio_checked"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="item-radio-hot"
                name="item-radio"
                defaultChecked
              />{" "}
              Hot
            </label>
            <label
              htmlFor="item-radio-warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="item-radio-warm"
                name="item-radio"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="item-radio-cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="item-radio-cold"
                name="item-radio"
              />{" "}
              Cold
            </label>
            <span className="modal__error" id="item-type-error"></span>
          </fieldset>
        </ModalWithForm>

        <ItemModal
          name="item-detail"
          isOpen={activeModal === "item-detail"}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default App;
