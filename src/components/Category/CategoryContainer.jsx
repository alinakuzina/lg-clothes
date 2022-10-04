import "./CategoryContainer.scss";
import CategoryItem from "./CategoryItem.jsx";

let CategoryContainer = () => {
  const categories = [
    {
      id: "ladies_all",
      title: "Woman",
      tagCode: "ladies_new",
    },
    {
      id: "men_all",
      title: "Men",
      tagCode: "men_new",
    },
  ];
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </div>
  );
};

export default CategoryContainer;
