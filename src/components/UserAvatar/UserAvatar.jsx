// Consolidate Avatar display since we do it in the header and in the sidebar and there's some logic here for blank avatars
import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function UserAvatar({ avatarClass = "header" }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isAvatarValid, setIsAvatarValid] = useState(
    currentUser.avatar && currentUser.avatar !== "",
  );

  //Watch for changes to currentUser.avatar and update the image tag if necessary
  useEffect(() => {
    setIsAvatarValid(currentUser.avatar && currentUser.avatar !== "");
  }, [currentUser.avatar]);

  //If the user has entered a URL that doesn't load, we fall back to the default display
  function handleAvatarLoadError() {
    setIsAvatarValid(false);
  }
  return (
    <>
      {isAvatarValid ? (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className={`${avatarClass}__avatar-image`}
          onError={handleAvatarLoadError}
        />
      ) : (
        <div className={`${avatarClass}__avatar-default`}>
          {currentUser.name.substr(0, 1).toUpperCase()}
        </div>
      )}
    </>
  );
}

export default UserAvatar;
