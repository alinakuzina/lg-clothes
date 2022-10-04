import { Outlet, Link } from "react-router-dom";
import { Fragment, useEffect, useState, useContext } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./Navigation.scss";
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
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="links-container">
          {context.categories.map((category) => {
            return <NavLink category={category} key={category.tagCode} />;
          })}
          {!context.currentUser && (
            <Link className="nav-link" to="/authentication">
              Sign In
            </Link>
          )}
          {context.currentUser && (
            <span className="nav-link" onClick={signOutHandler}>
              Sign Out
            </span>
          )}{" "}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
        {/* <MobileNav /> */}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
