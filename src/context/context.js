import { useState } from "react";
import React from "react";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { database } from "../utilits/farebase";

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
      id: "giftguide0.7740156034108596",
      catName: "GIFT GUIDE",
      tagCode: "giftguide",
      subCategories: [],
    },
    {
      id: "home_all0.7608759542783605",
      catName: " HOME",
      tagCode: "home_all",
      subCategories: [],
    },
    {
      id: "kids_all0.31378616495335176",
      catName: "KIDS",
      tagCode: "kids_all",
      subCategories: [],
    },
    {
      id: "kids_newbornbaby_viewall0.4015197247428697",
      catName: "BABY",
      tagCode: "kids_newbornbaby_viewall",
      subCategories: [],
    },
    ,
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
      id: "sportswear0.8572295437328288",
      catName: "SPORT",
      tagCode: "sportswear",
      subCategories: [],
    },
  ]);

  const recieveCategoriesHandler = async () => {
    const querySnapshot = await getDocs(collection(database, "categories"));
    let tempCat = [];
    querySnapshot.forEach((doc) => {
      tempCat.push(doc.data());
    });
    setCategories(tempCat);
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
