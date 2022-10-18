import { useParams } from "react-router-dom";
import ShopPage from "../../components/ShopPage/ShopPage";

const Shop = () => {
  const { path } = useParams();
  return <ShopPage url={path} />;
};

export default Shop;
