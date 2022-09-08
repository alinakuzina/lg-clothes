import { Link } from "react-router-dom";
import "./MobileNav.scss";
import { Fragment, useState } from "react";

let MobileNav = (props) => {
  let [open, setOpen] = useState(false);

  let openMabileNavHandler = () => {
    console.log("click");
    setOpen((prevState) => {
      return !prevState;
    });
  };
  console.log(open);

  return (
    <Fragment>
      <button className="mobile-icon" onClick={openMabileNavHandler}>
        <div class={`bar bar1 ${open && "close-icon"}`}></div>
        <div class={`bar bar2 ${open && "close-icon"}`}></div>
        <div class={`bar bar3 ${open && "close-icon"}`}></div>
      </button>
      <div className={`mobile-container ${open && "open-mobile-nav"}`}>
        {props.categories.map((category) => {
          return (
            <Link
              className="mobile-nav-item "
              to={`/${category.tagCode}`}
              key={`/${category.tagCode}${Math.random()}`}
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
