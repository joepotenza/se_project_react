import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F toggle-switch__text_${currentTemperatureUnit === "F" ? "" : "in"}active`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C toggle-switch__text_${currentTemperatureUnit === "C" ? "" : "in"}active`}
      >
        C
      </span>
    </label>
  );
};

export default ToggleSwitch;
