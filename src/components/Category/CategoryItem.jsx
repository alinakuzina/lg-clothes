import "./CategoryItem.scss";

const CategoryItem = ({ category }) => {
  return (
    <div className="category-container">
      <div className="category-body-container">
        <h2>{category.title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
