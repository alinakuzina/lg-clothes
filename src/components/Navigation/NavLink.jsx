import { Link } from "react-router-dom";
import style from "./NavLink.module.scss";
import { useState } from "react";

let NavLink = (props) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const closeDropdownHandler = () => {
    // setIsOpenDropdown((prev) => !prev);
  };

  return (
    <div className={style.dropdown}>
      <Link
        className={style.nav_link}
        to={`${props.category.tagCode}`}
        onClick={closeDropdownHandler}
        id={`${props.category.tagCode}`}
        key={`${props.tagCode}${Math.random()}`}
      >
        {props.category.catName}
      </Link>
      {props.category.subCategories.length > 0 && (
        <div className={style.dropdown_content} onClick={closeDropdownHandler}>
          {props.category.subCategories.map((el) => {
            return (
              <Link
                className={style.nav_link_dropdown}
                to={`${el.tagCode}`}
                id={`${el.tagCode}`}
                key={`${props.tagCode}${Math.random()}`}
              >
                {el.catName}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavLink;
