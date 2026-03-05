import "./Header.css";
import logo from "../../images/logo.png";
import avatar from "../../images/avatar.png";

function Header({ weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img src={logo} alt="WTWR Logo" className="header__logo" />
      <p className="header__location">
        {currentDate}, {weatherData.city}
      </p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__user-name">Terrence Tegegne</p>
        <img src={avatar} alt="Joe Potenza" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
