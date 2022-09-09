import Home from "./components/routes/Home/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/routes/Sing-in/Sing-in";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
