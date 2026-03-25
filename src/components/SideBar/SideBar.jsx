import "./SideBar.css";
import { useContext } from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ clickEditProfileHandler, clickLogoutHandler }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <div className="sidebar__avatar">
          <UserAvatar avatarClass="sidebar" />
        </div>
        <div className="sidebar__user-content">
          <p className="sidebar__user-name">{currentUser.name}</p>
          <div className="sidebar__buttons sidebar__buttons_type_inline">
            <button
              className="sidebar__button sidebar__button_type_profile"
              onClick={clickEditProfileHandler}
            >
              Change profile data
            </button>
            <button
              className="sidebar__button sidebar__button_type_logout"
              onClick={clickLogoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="sidebar__buttons sidebar__buttons_type_below">
        <button
          className="sidebar__button sidebar__button_type_profile"
          onClick={clickEditProfileHandler}
        >
          Change profile data
        </button>
        <button
          className="sidebar__button sidebar__button_type_logout"
          onClick={clickLogoutHandler}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
