import { useState, useEffect } from "react";
import { Carousel } from "antd";

import { getBannersAPI } from "../API/bannersAPI";
import { dalImg } from "../NET/tools";
function MyBanner() {
  const [list, setList] = useState([]);

  const contentStyle = {
    height: "360px",
    width: "900px",
    margin: "auto",
  };

  useEffect(() => {
    getBannersAPI().then((res) => {
      console.log(res.data.data);
      setList(res.data.data);
    });
  }, []);

  return (
    <Carousel autoplay>
      {list.map((item) => {
        console.log(item.id);
        return (
          <div key={item.id}>
            <img
              src={dalImg(item.coverImage)}
              // rowKey="item.id"
              style={contentStyle}
            />
          </div>
        );
      })}
    </Carousel>
  );
}

export default MyBanner;
