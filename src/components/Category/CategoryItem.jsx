import "./CategoryItem.scss";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link className="category-container" to={`/${category.tagCode}`}>
      <div className="category-body-container">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
