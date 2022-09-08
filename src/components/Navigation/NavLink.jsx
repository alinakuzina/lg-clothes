import { Link } from "react-router-dom";
import "./NavLink.scss";

let NavLink = (props) => {
  console.log(props.category);
  return (
    <div className="dropdown">
      <Link
        className="nav-link"
        to={`/${props.category.tagCode}`}
        id={`${props.category.tagCode}`}
        key={`${props.tagCode}${Math.random()}`}
      >
        {props.category.catName}
      </Link>
      <div className="dropdown-content">
        {props.category.subCategories.map((el) => {
          return (
            <Link
              className="nav-link-dropdown"
              to={`/${el.tagCode}`}
              id={`${el.tagCode}`}
              key={`${props.tagCode}${Math.random()}`}
            >
              {el.catName}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavLink;
