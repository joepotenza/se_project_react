import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../images/logo.png";
import avatar from "../../images/avatar.png";
import menuBtn from "../../images/menu_button.png";
import closeMenuBtn from "../../images/close_icon_black.svg";

function Header({
  weatherData,
  openModalHandler,
  mobileMenuHandler,
  isProfilePage,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
    mobileMenuHandler(!isMobileMenuOpened);
  }

  return (
    <>
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
          <button
            className="header__add-clothes-btn"
            onClick={openModalHandler}
          >
            + Add Clothes
          </button>
          <div className="header__user-container">
            <Link to="/profile" className="header__user-name">
              Terrence Tegegne
            </Link>
            <Link to="/profile" className="header__avatar">
              <img src={avatar} alt="Joe Potenza" />
            </Link>
          </div>
        </div>
        <img
          src={menuBtn}
          alt="Menu"
          className="header__menu-btn"
          onClick={toggleMobileMenu}
        />
      </header>
    </>
  );
}

export default Header;
