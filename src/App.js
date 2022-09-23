import Home from "./routes/Home/Home.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Authentification from "./routes/Authentification/Authentification";
import Shop from "./routes/Shop/Shop.jsx";
import Checkout from "./routes/Checkout/Checkout.jsx";
import { useContext } from "react";
import { Context } from "./context/Context.jsx";

const App = () => {
  let { categories } = useContext(Context);
  let subCategoriesArray = categories.map((category) =>
    category.subCategories.map((subCat) => (
      <Route
        key={subCat.id + Math.random()}
        path={subCat.tagCode}
        element={<Shop url={subCat.tagCode} />}
      />
    ))
  );

  console.log(
    categories.map((category) => (
      <Route
        key={category.id + Math.random()}
        path={category.tagCode}
        element={<Shop url={category.tagCode} />}
      />
    ))
  );

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
