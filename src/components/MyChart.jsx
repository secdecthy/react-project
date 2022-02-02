import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { getProductAPI } from "../API/productsAPI";

function MyChart() {
  const chart = useRef();

  useEffect(async () => {
    // 基于准备好的dom，初始化echarts实例
    const res = await getProductAPI();
    const names = res.data.data.map((item) => item.name);
    const amount = res.data.data.map((item) => item.amount);
    console.log(names, amount);
    var myChart = echarts.init(chart.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: "库存图表",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
      },
      yAxis: {
        type: "category",
        data: names,
      },
      series: [
        {
          name: "库存",
          type: "bar",
          data: amount,
        },
      ],
    });
  }, []);

  return (
    <div>
      <div
        ref={chart}
        className="main"
        style={{ width: "80%", height: "60vh" }}
      ></div>
    </div>
  );
}

export default MyChart;
