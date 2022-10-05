import style from "./CategoryItem.module.scss";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link className={style.category_container} to={`/${category.tagCode}`}>
      <div className={style.category_body_container}>
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </Link>
  );
};

export default CategoryItem;
