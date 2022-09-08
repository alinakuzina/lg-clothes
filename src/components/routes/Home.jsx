import CategoryContainer from "../Category/CategoryContainer";
import video from "../../assets/background-video.mp4";
import "./Home.scss";
import React from "react";
const Home = () => {
  const categories = [
    {
      id: "ladies_all",
      title: "Woman",
    },
    {
      id: "men_all",
      title: "Men",
    },
  ];
  return (
    <div className="home-page">
      <CategoryContainer categories={categories} />
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
