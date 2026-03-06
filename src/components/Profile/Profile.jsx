import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, clickItemHandler, clickAddLinkHandler }) {
  return (
    <main className="profile">
      <SideBar />
      <ClothesSection
        showAddLink={true}
        clothingItems={clothingItems}
        currentWeatherCondition=""
        onClickItem={clickItemHandler}
        onClickAddLink={clickAddLinkHandler}
      />
    </main>
  );
}
export default Profile;
