import style from "./ProfilePage.module.scss";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserOrders,
} from "../../../store/User/UserSelector";

const ProfilePage = () => {
  const user = useSelector(selectCurrentUser);
  const orders = useSelector(selectUserOrders);
  console.log(user);
  return (
    <div className={style.profile_page_container}>
      <div>
        <h1>Hello {user.displayName}!</h1>
      </div>
      <div>
        <h2>Your orders:</h2>
      </div>
    </div>
  );
};

export default ProfilePage;
