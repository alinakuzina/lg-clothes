import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
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
import { ReactComponent as HeartLogo } from "../../assets/heart.svg";
import { ReactComponent as UserIcon } from "../../assets/user-icon.svg";
import { userActions } from "../../store/User/UserReducer";
const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const categories = useSelector(selectCategories);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    navigate("/");
    await signOutUser();
    dispatch(userActions.signOut());
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
            <Link className={style.icon_container} to={"/favorites"}>
              <HeartLogo className={style.icon_logo} />
            </Link>
            <CartIcon />
            {!currentUser && (
              <Link className={style.nav_link_sign} to="/authentication">
                Sign In
              </Link>
            )}
            {currentUser && location.pathname === "/profile" && (
              <span className={style.nav_link_sign} onClick={signOutHandler}>
                Sign Out
              </span>
            )}
            {currentUser && location.pathname !== "/profile" && (
              <Link className={style.icon_container} to={"/profile"}>
                <UserIcon className={style.icon_logo} />
              </Link>
            )}
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
