import Home from "./routes/Home/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Authentification from "./routes/Authentification/Authentification";
import Shop from "./routes/Shop/Shop.jsx";
import Checkout from "./routes/Checkout/Checkout.jsx";
import Favorites from "./routes/Favorites/Favorites.jsx";
import { useEffect } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utilits/Farebase";
import { useDispatch } from "react-redux";
import { userActions } from "./store/User/UserReducer.js";
import Payment from "./routes/Payment/Payment.jsx";
import Profile from "./routes/Profile/Profile.jsx";
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
        <Route path="profile" element={<Profile />} />
        <Route path="men/:path" element={<Shop />} />
        <Route path="ladies/:path" element={<Shop />} />
        <Route path="home/:path" element={<Shop />} />
        <Route path="kids/:path" element={<Shop />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="payment" element={<Payment />} />
      </Route>
    </Routes>
  );
};

export default App;
