import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const MonthsSummary = ({ data }) => {
  return (
    <div id="ms" style={{ height: "300px" }}>
      <Line
        data={{
          labels: data.map((val) => moment(val.day).format("Do")),
          datasets: [
            {
              label: "Items",
              data: data.map((val) => val.amount),
              backgroundColor: "transparent",
              borderColor: "#f9a109",
            },
          ],
        }}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 20,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "This month",
                },
              },
            ],
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default MonthsSummary;
