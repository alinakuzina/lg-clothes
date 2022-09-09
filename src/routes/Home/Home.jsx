import CategoryContainer from "../../components/Category/CategoryContainer";
import video from "../../../src/assets/background-video.mp4";
import "./Home.scss";
import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      <CategoryContainer />
      <video className="videoTag" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Home;
