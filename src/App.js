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
import { useDispatch } from "react-redux";
import { userActions } from "./store/User/UserReducer.js";
const App = () => {
  const dispatch = useDispatch();

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
      <Route exact path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="authentication" element={<Authentification />} />
        <Route path="men/:path" element={<Shop />} />
        <Route path="ladies/:path" element={<Shop />} />
        <Route path="home/:path" element={<Shop />} />
        <Route path="kids/:path" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
