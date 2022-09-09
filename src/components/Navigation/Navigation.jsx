import { Outlet, Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./Navigation.scss";
import NavLink from "./NavLink";
import MobileNav from "./MobileNav";

const Navigation = () => {
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bf55e94a67mshb9ff325d6bed36cp1524a0jsn2c8815085b6e",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };

    fetch(
      "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        let temporaryCat = [];
        response.forEach((category) => {
          if (category.tagCodes[0]) {
            let subCat = [];
            category.CategoriesArray.forEach((category) => {
              if (category.CatName === "Shop by Product") {
                category.CategoriesArray.forEach((el) => {
                  subCat.push({
                    catName: el.CatName,
                    tagCode: el.tagCodes[0],
                  });
                });
              }
            });
            temporaryCat.push({
              catName: category.CatName.replaceAll("H&M", "").toUpperCase(),
              tagCode: category.tagCodes[0],
              subCategories: subCat,
            });
          }
        });
        setCategories(temporaryCat);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="links-container">
          {categories.map((category) => {
            return <NavLink category={category} key={category.tagCode} />;
          })}
        </div>
        {/* <MobileNav categories={categories} /> */}
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
