import style from "./ProfilePage.module.scss";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserOrders,
} from "../../../store/User/UserSelector";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Order from "./Order/Order";
const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!user) {
      return navigate("/");
    }
  }, [user]);

  const orders = useSelector(selectUserOrders);
  console.log(orders);
  return (
    <div className={style.profile_page_container}>
      <div>
        <h1>Hello {user.displayName}!</h1>
      </div>
      <div>
        <h2>Your orders:</h2>
        {orders.map((el, index) => (
          <Order order={el} key={index + el.items[0].code} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
