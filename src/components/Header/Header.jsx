import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.png";
import menuBtn from "../../images/menu_button.png";
import closeMenuBtn from "../../images/close_icon_black.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import UserAvatar from "../UserAvatar/UserAvatar";

function Header({
  weatherData,
  openModalHandler,
  isProfilePage,
  signupHandler,
  loginHandler,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  function handleSignupButton(evt) {
    setIsMobileMenuOpened(false);
    signupHandler(evt);
  }
  function handleLoginButton(evt) {
    setIsMobileMenuOpened(false);
    loginHandler(evt);
  }

  return (
    <header
      className={`header ${isProfilePage ? "header_page_profile" : ""} ${isMobileMenuOpened ? "header_menu_open" : ""}`}
    >
      <Link to="/" className="header__logo">
        <img src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__menu">
        <img
          src={closeMenuBtn}
          alt="Close Menu"
          className="header__menu-close-btn"
          onClick={toggleMobileMenu}
        />
        <ToggleSwitch />
        {isLoggedIn ? (
          <button
            className="header__add-clothes-btn"
            onClick={openModalHandler}
          >
            + Add Clothes
          </button>
        ) : (
          ""
        )}
        <div className="header__user-container">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="header__user-name">
                {currentUser.name}
              </Link>
              <Link to="/profile" className="header__avatar">
                <UserAvatar />
              </Link>
            </>
          ) : (
            <>
              <button
                className="header__user-signup"
                onClick={handleSignupButton}
              >
                Sign Up
              </button>
              <button
                className="header__user-login"
                onClick={handleLoginButton}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
      <img
        src={menuBtn}
        alt="Menu"
        className="header__menu-btn"
        onClick={toggleMobileMenu}
      />
    </header>
  );
}

export default Header;
