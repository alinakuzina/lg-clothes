import Home from "./routes/Home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Authentification from "./routes/Authentification/Authentification";
import Shop from "./routes/Shop/Shop.jsx";
import Checkout from "./routes/Checkout/Checkout.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext.jsx";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utilits/Farebase";
import { setCurrentUser } from "./store/User/UserAction.js";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  let { categories } = useContext(UserContext);
  let subCategoriesArray = categories.map((category) =>
    category.subCategories.map((subCat) => (
      <Route
        key={subCat.id + Math.random()}
        path={subCat.tagCode}
        element={<Shop url={subCat.tagCode} />}
      />
    ))
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="authentication" element={<Authentification />} />
        {categories.map((category) => (
          <Route
            key={category.id + Math.random()}
            path={category.tagCode}
            element={<Shop url={category.tagCode} />}
          />
        ))}
        {subCategoriesArray.flat()}
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
