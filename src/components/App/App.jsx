import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import { weatherAPIConfig, weatherConditions } from "../../utils/constants.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import WeatherAPI from "../../utils/WeatherAPI.js";
const weatherAPI = new WeatherAPI(weatherAPIConfig);

import Api from "../../utils/Api.js";
const clothingItemAPI = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const emptyCard = {
    _id: "",
    imageUrl: "",
    name: "",
    weather: "",
  };
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    temp: { F: 999, C: 999 },
    type: "",
    isDay: false,
    conditionImage: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(emptyCard);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  // Handler to display "new garment" modal
  function handleOpenModalWithForm(evt) {
    setActiveModal("new-item");
  }

  // Handler to display "item detail" modal
  function handleOpenItemModal(item) {
    setActiveModal("item-detail");
    setSelectedCard(item);
  }

  // Handler to close any active modal
  function handleCloseModal(evt) {
    setActiveModal("");
    //setSelectedCard(emptyCard);
    /*
    TBD: whether to reset selected card on modal close or not, since it doesn't cause any issues with current implementation
    and allows for smoother UX when going from item detail modal to delete confirmation modal or closing modal
    because setting it to empty results in a brief flash of empty content
    */
  }

  // Add item to clothing array.
  function handleAddItemSubmit(data, afterSubmit) {
    clothingItemAPI
      .addClothingItem(data)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        handleCloseModal();
        afterSubmit();
      })
      .catch(console.error);
  }

  // Delete clothing item
  function handleDeleteItem() {
    setActiveModal("delete");
  }
  function handleConfirmDeleteItem() {
    clothingItemAPI
      .deleteClothingItem(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          }),
        );
        handleCloseModal();
        setSelectedCard(emptyCard); // reset selected card after delete since we don't reset it by default on modal close
      })
      .catch(console.error);
  }
  function handleCancelDeleteItem() {
    setSelectedCard(emptyCard); // reset selected card after cancel since we don't reset it by default on modal close
    handleCloseModal();
  }

  // Track opening/closing mobile menu, since WeatherCard is located in Main and not Header
  function handleToggleMobileMenu(isOpen) {
    setIsMobileMenuOpened(isOpen);
  }

  // Update Temperature Unit when user clicks the toggle switch
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    // Fetch the weather data
    weatherAPI
      .getCurrentWeatherData()
      .then((data) => {
        // figure out which background image to show with weather data
        const imageList = weatherConditions[data.isDay ? "day" : "night"];
        const newData = {
          ...data,
          ...{
            conditionImage: imageList[data.type] ? imageList[data.type] : "",
          },
        };
        // Update the local variable
        setWeatherData(newData);
      })
      .catch(console.error);

    // Get clothing items
    clothingItemAPI
      .getClothingItems()
      .then(setClothingItems)
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            weatherData={weatherData}
            openModalHandler={handleOpenModalWithForm}
            mobileMenuHandler={handleToggleMobileMenu}
            isProfilePage={useLocation().pathname === "/profile"}
          />
          <Routes>
            <Route
              path="*"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  clickItemHandler={handleOpenItemModal}
                  isMobileMenuOpened={isMobileMenuOpened}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  clickItemHandler={handleOpenItemModal}
                  clickAddLinkHandler={handleOpenModalWithForm}
                />
              }
            />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "new-item"}
            onClose={handleCloseModal}
            onAddItem={handleAddItemSubmit}
          ></AddItemModal>

          <ItemModal
            name="item-detail"
            isOpen={activeModal === "item-detail"}
            onClose={handleCloseModal}
            imageUrl={selectedCard.imageUrl}
            title={selectedCard.name}
            weather={selectedCard.weather}
            clickDeleteHandler={handleDeleteItem}
          />

          <DeleteItemModal
            isOpen={activeModal === "delete"}
            onClose={handleCloseModal}
            confirmDeleteHandler={handleConfirmDeleteItem}
            cancelDeleteHandler={handleCancelDeleteItem}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
