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
  recieveUserOrders,
} from "./utilits/Farebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/User/UserReducer.js";
import Payment from "./routes/Payment/Payment.jsx";
import Profile from "./routes/Profile/Profile.jsx";
import { selectCurrentUser } from "./store/User/UserSelector.js";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user) => {
      if (user) {
        createUserDocumentFromAuth(user);
        const orders = await recieveUserOrders(user.uid);

        dispatch(userActions.setCurrentUser({ user: user, orders: orders }));
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="authentication" element={<Authentification />} />
        {user && <Route path="profile" element={<Profile />} />}
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
