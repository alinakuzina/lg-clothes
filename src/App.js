import Home from "./routes/Home/Home.jsx";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Authentification from "./routes/Authentification/Authentification";
import Shop from "./routes/Shop/Shop.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="authentication" element={<Authentification />} />
        <Route path="men_all" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
