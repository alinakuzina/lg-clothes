import "./CategoryContainer.scss";
import CategoryItem from "./CategoryItem.jsx";

let CategoryContainer = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default CategoryContainer;
