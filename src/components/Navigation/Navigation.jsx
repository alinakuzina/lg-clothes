import { Outlet, Link } from "react-router-dom";
import { Fragment, useEffect, useState, useContext } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./Navigation.scss";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";
import { Context } from "../../context/context";

const Navigation = () => {
  const context = useContext(Context);

  useEffect(() => {
    context.recieveCategories();
  }, []);

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
          <Link className="nav-link" to="/sign_in">
            Sign In
          </Link>
        </div>

        {/* <MobileNav /> */}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
