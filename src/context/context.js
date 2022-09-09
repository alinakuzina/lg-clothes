import { useState } from "react";
import React from "react";

export const Context = React.createContext({
  isAuth: false,
  login: () => {},
  categories: [],
  recieveCategories: () => {},
});

const ContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let [categories, setCategories] = useState([
    {
      id: "kids_newbornbaby_viewall0.4015197247428697",
      catName: "BABY",
      tagCode: "kids_newbornbaby_viewall",
      subCategories: [],
    },
    {
      id: "sportswear0.8572295437328288",
      catName: "SPORT",
      tagCode: "sportswear",
      subCategories: [],
    },
    {
      id: "giftguide0.7740156034108596",
      catName: "GIFT GUIDE",
      tagCode: "giftguide",
      subCategories: [],
    },
    {
      id: "ladies_all0.9304966433773658",
      catName: "WOMEN",
      tagCode: "ladies_all",
      subCategories: [],
    },
    {
      id: "ladies_divided0.7456884304752482",
      catName: "DIVIDED",
      tagCode: "ladies_divided",
      subCategories: [],
    },
    {
      id: "men_all0.2094884098512222",
      catName: "MEN",
      tagCode: "men_all",
      subCategories: [],
    },
    {
      id: "kids_all0.31378616495335176",
      catName: "KIDS",
      tagCode: "kids_all",
      subCategories: [],
    },
    {
      id: "home_all0.7608759542783605",
      catName: " HOME",
      tagCode: "home_all",
      subCategories: [],
    },
  ]);

  const recieveCategoriesHandler = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "d4e911b07bmsh22373b0aab03d44p135b46jsnf7e11d0c4ba7",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };

    fetch(
      "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=us",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let temporaryCat = [];
        response.forEach((category) => {
          if (category.tagCodes[0]) {
            let subCat = [];
            category.CategoriesArray.forEach((category) => {
              if (category.CatName === "Shop by Product") {
                category.CategoriesArray.forEach((el) => {
                  subCat.push({
                    id: el.tagCodes[0] + Math.random(),
                    catName: el.CatName,
                    tagCode: el.tagCodes[0],
                  });
                });
              }
            });
            temporaryCat.push({
              id: category.tagCodes[0] + Math.random(),
              catName: category.CatName.replaceAll("H&M", "").toUpperCase(),
              tagCode: category.tagCodes[0],
              subCategories: subCat,
            });
          }
        });
        console.log(temporaryCat);
        setCategories(temporaryCat);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Context.Provider
      value={{
        isAuth: isAuthenticated,
        categories: categories,
        recieveCategories: recieveCategoriesHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
