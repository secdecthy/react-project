import React from "react";
import MyBanner from "../components/MyBanner";
import MyChart from "../components/MyChart";
import "../style/banners.css";

function Home() {
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <div className="banners">
        <MyBanner />
      </div>
      <MyChart />
    </div>
  );
}

export default Home;
