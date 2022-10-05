import { Link } from "react-router-dom";
import style from "./NavLink.module.scss";

let NavLink = (props) => {
  return (
    <div className={style.dropdown}>
      <Link
        className={style.nav_link}
        to={`${props.category.tagCode}`}
        id={`${props.category.tagCode}`}
        key={`${props.tagCode}${Math.random()}`}
      >
        {props.category.catName}
      </Link>
      {props.category.subCategories.length > 0 && (
        <div className={style.dropdown_content}>
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
