import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import {
  weatherAPIConfig,
  weatherConditions,
  TOKEN_KEY,
} from "../../utils/constants.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import WeatherAPI from "../../utils/WeatherAPI.js";
const weatherAPI = new WeatherAPI(weatherAPIConfig);

/**
 * Note: This was all in one api file to avoid duplicate code but Sprint 14 calls for a separate auth.js for auth functions
 */
import ItemApi from "../../utils/Api.js";
const itemApi = new ItemApi({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

import AuthApi from "../../utils/auth.js";
const authApi = new AuthApi({
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
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const emptyCard = {
    _id: "",
    imageUrl: "",
    name: "",
    weather: "",
    owner: "",
  };
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    temp: { F: 999, C: 999 },
    type: "",
    isDay: false,
    conditionImage: "",
  });
  const emptyUserInfo = {
    _id: 0,
    name: "",
    email: "",
    avatar: "",
  };
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(emptyCard);
  const [currentUser, setCurrentUser] = useState(emptyUserInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /**
   * isCheckingAuth is used to make sure isLoggedIn is set properly before determining whether or not to show a protected route
   * If visiting /profile directly, the page would not load because isLoggedIn was not set yet
   * By adding this check, the URL can be accessed directly without redirecting to the homepage incorrectly
   */
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Handler to display "sign up" modal
  function handleOpenRegistrationModal() {
    setActiveModal("user-signup");
  }

  // Handler to display "log in" modal
  function handleOpenLoginModal() {
    setActiveModal("user-login");
  }

  // Handler to display "edit profile" modal
  function handleOpenEditProfileModal() {
    setActiveModal("user-profile");
  }

  // Handler to display "new garment" modal
  function handleOpenModalWithForm() {
    setActiveModal("new-item");
  }

  // Handler to display "item detail" modal
  function handleOpenItemModal(item) {
    setActiveModal("item-detail");
    setSelectedCard(item);
  }

  // Handler to close any active modal
  function handleCloseModal() {
    setActiveModal("");
    //setSelectedCard(emptyCard);
    /*
    TBD: whether to reset selected card on modal close or not, since it doesn't cause any issues with current implementation
    and allows for smoother UX when going from item detail modal to delete confirmation modal or closing modal
    because setting it to empty results in a brief flash of empty content
    */
  }

  // User Signup
  function handleRegisterSubmit(data, afterSubmit) {
    authApi
      .registerUser(data)
      .then(() => {
        // User registered successfully, handle login (be sure to use properties of "data" to get both email and password)
        handleLoginSubmit(
          { email: data.email, password: data.password },
          afterSubmit,
        );
      })
      .catch(console.error);
  }

  // User Login
  function handleLoginSubmit(data, afterSubmit) {
    authApi
      .loginUser(data)
      .then((data) => {
        // User logged in successfully, set token and close modal
        localStorage.setItem(TOKEN_KEY, data.token);
        authApi.setUserToken(data.token);
        itemApi.setUserToken(data.token);
        // set current user data and set isLoggedIn state
        getCurrentUserData();
        handleCloseModal();
        afterSubmit();
      })
      .catch(console.error);
  }

  // User logout
  function handleUserLogout() {
    setCurrentUser(emptyUserInfo);
    setIsLoggedIn(false);
    authApi.setUserToken("");
    itemApi.setUserToken("");
    localStorage.clear();
  }

  // Edit User Profile
  function handleEditProfileSubmit(data, afterSubmit) {
    authApi
      .editUserProfile(data)
      .then((user) => {
        // User profile updated
        setCurrentUser((prev) => ({
          ...prev,
          name: user.name,
          avatar: user.avatar,
        }));
        handleCloseModal();
        afterSubmit();
      })
      .catch(console.error);
  }

  // Add item to clothing array.
  function handleAddItemSubmit(data, afterSubmit) {
    itemApi
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

  // Like/unlike clothing item
  function handleCardLike(item, isLiked) {
    // Check if this card is not currently liked
    if (!isLiked) {
      itemApi
        .likeClothingItem(item._id)
        .then((updatedCard) => {
          setClothingItems((prev) =>
            prev.map((cardItem) =>
              item._id === cardItem._id ? updatedCard : cardItem,
            ),
          );
        })
        .catch(console.error);
    } else {
      itemApi
        // the first argument is the card's id
        .unlikeClothingItem(item._id)
        .then((updatedCard) => {
          setClothingItems((prev) =>
            prev.map((cardItem) =>
              item._id === cardItem._id ? updatedCard : cardItem,
            ),
          );
        })
        .catch(console.error);
    }
  }
  function handleConfirmDeleteItem() {
    itemApi
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

  // Update Temperature Unit when user clicks the toggle switch
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Get Current user data from API and validate before setting state and context variables
  const getCurrentUserData = () => {
    authApi
      .getCurrentUser()
      .then((user) => {
        if (!user || !user._id) {
          localStorage.clear();
          authApi.setUserToken("");
          itemApi.setUserToken("");
          setCurrentUser(emptyUserInfo);
          setIsLoggedIn(false);
        } else {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsCheckingAuth(false);
      });
  };

  useEffect(() => {
    // Check local storage for user token
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      authApi.setUserToken(token);
      itemApi.setUserToken(token);
      getCurrentUserData();
    } else {
      setIsCheckingAuth(false);
    }

    //Get the current Weather
    const fetchWeather = (lat, long) => {
      weatherAPI
        .getCurrentWeatherData(lat, long)
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
    };

    // Fetch the weather data via browser geolocation
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser");
      fetchWeather();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting geolocation: ${error.message}`);
          fetchWeather();
        },
      );
    }

    // Get clothing items
    itemApi.getClothingItems().then(setClothingItems).catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              openModalHandler={handleOpenModalWithForm}
              signupHandler={handleOpenRegistrationModal}
              loginHandler={handleOpenLoginModal}
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
                    clickItemLikeHandler={handleCardLike}
                  />
                }
              />
              {!isCheckingAuth && (
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        clothingItems={clothingItems}
                        clickItemHandler={handleOpenItemModal}
                        clickAddLinkHandler={handleOpenModalWithForm}
                        clickEditProfileHandler={handleOpenEditProfileModal}
                        clickLogoutHandler={handleUserLogout}
                        clickItemLikeHandler={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
              )}
            </Routes>
            <Footer />

            <EditProfileModal
              isOpen={activeModal === "user-profile"}
              onClose={handleCloseModal}
              onEditProfile={handleEditProfileSubmit}
            ></EditProfileModal>

            <RegisterModal
              isOpen={activeModal === "user-signup"}
              onClose={handleCloseModal}
              onRegister={handleRegisterSubmit}
              loginHandler={handleOpenLoginModal}
            ></RegisterModal>

            <LoginModal
              isOpen={activeModal === "user-login"}
              onClose={handleCloseModal}
              onLogin={handleLoginSubmit}
              signupHandler={handleOpenRegistrationModal}
            ></LoginModal>

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
              isOwn={selectedCard.owner === currentUser._id}
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
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
