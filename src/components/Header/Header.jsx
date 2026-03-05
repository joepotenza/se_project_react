import { useState } from "react";
import "./Header.css";
import logo from "../../images/logo.png";
import avatar from "../../images/avatar.png";
import menuBtn from "../../images/menu_button.png";
import closeMenuBtn from "../../images/close_icon_black.svg";

function Header({ weatherData, openModalHandler, mobileMenuHandler }) {
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
        className={`header ${isMobileMenuOpened ? "header_menu_open" : ""}`}
      >
        <img src={logo} alt="WTWR Logo" className="header__logo" />
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
          <button
            className="header__add-clothes-btn"
            onClick={openModalHandler}
          >
            + Add Clothes
          </button>
          <div className="header__user-container">
            <p className="header__user-name">Terrence Tegegne</p>
            <img src={avatar} alt="Joe Potenza" className="header__avatar" />
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
