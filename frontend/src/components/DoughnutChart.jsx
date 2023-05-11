import ReactECharts from "echarts-for-react";

const option = {
  title: {
    text: "Completion",
    left: "center",
    top: "center",
  },
  series: [
    {
      type: "pie",
      data: [
        { value: 335, name: "Complete" },
        { value: 234, name: "Ongoing" },
      ],
      radius: ["60%", "80%"],
      color: ["darkblue", "lightblue"],
    },
  ],
};

const DoughnutChart = (props) => {
  const { status } = props;

  console.log(status);

  const option = {
    title: {
      text: "Completion",
      left: "center",
      top: "center",
    },
    series: [
      {
        type: "pie",
        data: [
          { value: status.complete, name: "Complete" },
          { value: status.left, name: "Ongoing" },
        ],
        radius: ["60%", "80%"],
        color: ["darkblue", "lightblue"],
      },
    ],
  };
  return <ReactECharts option={option} />;
};

export default DoughnutChart;
