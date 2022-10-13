import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import style from "./Navigation.module.scss";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";
import { signOutUser } from "../../utilits/Farebase";
import CartIcon from "../Cart/CartPreview/CartIcon/CartIcon";
import CartDropdown from "../Cart/CartPreview/CartDropdown/CartDropdown";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/User/UserSelector";
import { selectCategories } from "../../store/Categories/CategoriesSelector";
import { recieveCategories } from "../../utilits/Farebase";
import { useDispatch } from "react-redux";
import { categoriesAction } from "../../store/Categories/CategoriesReducer";
import { selectIsCartOpen } from "../../store/Cart/CartSelector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const categories = useSelector(selectCategories);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const signOutHandler = async () => {
    await signOutUser();
  };

  useEffect(() => {
    //recieve categories from firebase base
    let categories = async () => {
      const categories = await recieveCategories();
      dispatch(categoriesAction.recieveCategories({ categories }));
    };

    categories();
  }, []);

  return (
    <Fragment>
      <div className={style.navigation}>
        <Link className={style.logo_container} to="/">
          <Logo className={style.logo} />
        </Link>
        <div className={style.links_container}>
          {categories.map((category) => {
            return <NavLink category={category} key={category.tagCode} />;
          })}

          <div className={style.permanent_items}>
            {!currentUser && (
              <Link className={style.nav_link_sign} to="/authentication">
                Sign In
              </Link>
            )}

            {currentUser && (
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
