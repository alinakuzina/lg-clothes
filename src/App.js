import Home from "./components/routes/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
