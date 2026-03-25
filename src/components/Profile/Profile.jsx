import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  clickItemHandler,
  clickAddLinkHandler,
  clickEditProfileHandler,
  clickLogoutHandler,
  clickItemLikeHandler,
}) {
  return (
    <main className="profile">
      <SideBar
        clickEditProfileHandler={clickEditProfileHandler}
        clickLogoutHandler={clickLogoutHandler}
      />
      <ClothesSection
        showAddLink={true}
        clothingItems={clothingItems}
        currentWeatherCondition=""
        onClickItem={clickItemHandler}
        onClickAddLink={clickAddLinkHandler}
        onCardLike={clickItemLikeHandler}
      />
    </main>
  );
}
export default Profile;
