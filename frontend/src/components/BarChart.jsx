import { dependencies } from "echarts";
import ReactECharts from "echarts-for-react";

const BarChart = (props) => {
  const { data } = props;

  const eChartsOption = {
    xAxis: {
      data: ["HR", "IT", "LAW", "Financial"],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: [data["HR"], data["IT"], data["LAW"]],
      },
    ],
  };

  return <ReactECharts option={eChartsOption} />;
};

export default BarChart;
