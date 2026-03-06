import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
        <div className="sidebar__user-content">
          <p className="sidebar__user-name">Terrence Tegegne</p>
          <p className="sidebar__user-link">Change profile data</p>
          <p className="sidebar__user-link">Logout</p>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
