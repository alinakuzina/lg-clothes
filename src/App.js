import Home from "./routes/Home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Authentification from "./routes/Authentification/Authentification";
import Shop from "./routes/Shop/Shop.jsx";
import Checkout from "./routes/Checkout/Checkout.jsx";
import { useEffect } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utilits/Farebase";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "./store/Categories/CategoriesSelector.js";
import { userActions } from "./store/User/UserReducer.js";
const App = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
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
      dispatch(userActions.setCurrentUser({ user: user }));
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
