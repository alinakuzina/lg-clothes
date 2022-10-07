import { Outlet, Link } from "react-router-dom";
import { Fragment, useEffect, useState, useContext } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import style from "./Navigation.module.scss";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";
import { UserContext } from "../../context/UserContext";
import { signOutUser } from "../../utilits/Farebase";
import CartIcon from "../Cart/CartPreview/CartIcon/CartIcon";
import CartDropdown from "../Cart/CartPreview/CartDropdown/CartDropdown";
import { CartContext } from "../../context/CartContext";

const Navigation = () => {
  const context = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
      <div className={style.navigation}>
        <Link className={style.logo_container} to="/">
          <Logo className={style.logo} />
        </Link>
        <div className={style.links_container}>
          {context.categories.map((category) => {
            return <NavLink category={category} key={category.tagCode} />;
          })}

          <div className={style.permanent_items}>
            {!context.currentUser && (
              <Link className={style.nav_link_sign} to="/authentication">
                Sign In
              </Link>
            )}

            {context.currentUser && (
              <span className={style.nav_link_sign} onClick={signOutHandler}>
                Sign Out
              </span>
            )}
            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <MobileNav />
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
