import { Link } from "react-router-dom";
import style from "./MobileNav.module.scss";
import { Fragment, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

let MobileNav = (props) => {
  let [open, setOpen] = useState(false);
  let context = useContext(UserContext);

  let openMabileNavHandler = () => {
    setOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <Fragment>
      <button className={style.mobile_icon} onClick={openMabileNavHandler}>
        <div
          className={`${style.bar} ${style.bar1} ${open && style.close_icon}`}
        ></div>
        <div
          className={`${style.bar} ${style.bar2} ${open && style.close_icon}`}
        ></div>
        <div
          className={`${style.bar} ${style.bar3} ${open && style.close_icon}`}
        ></div>
      </button>
      <div
        className={`${style.mobile_container} ${open && style.open_mobile_nav}`}
      >
        {context.categories.map((category) => {
          return (
            <Link
              className={style.mobile_nav_item}
              to={`/${category.tagCode}`}
              key={`/${category.tagCode}${Math.random()}`}
              onClick={openMabileNavHandler}
            >
              {category.catName}
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};

export default MobileNav;
