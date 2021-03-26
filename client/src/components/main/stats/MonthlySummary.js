import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const MonthlySummary = ({ data }) => {
  return (
    <div id="sm" style={{ height: "300px" }}>
      <Line
        data={{
          labels: data.map((val) => moment(val.month).format("MMM")),
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
                  labelString: "Months",
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

export default MonthlySummary;
