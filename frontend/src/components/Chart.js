import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import data from './data';

Chart.register(...registerables);

const ChartBar = () => {
  const date = Object.keys(data).map((i) => data[i][0]);
  const price = Object.keys(data).map((i) => Number(data[i][1]));
  const barChartData = {
    labels: date,
    datasets: [
      {
        data: price,
        label: 'Цена закрытия',
        borderColor: '#3333ff',
        backgroundColor: 'rgba(0, 255, 42, 0.5)',
        fill: true,
      },
    ],
  };

  const barChart = (
    <div className="overflow-y-auto container">
      <Bar
        type="bar"
        width={200}
        height={70}
        options={{
          title: {
            fontSize: 1,
          },
          legend: {
            display: true, // Is the legend shown?
            position: 'top', // Position of the legend.
          },
        }}
        data={barChartData}
      />
    </div>
  );
  return barChart;
};

const ChartLine = () => {
  const date = Object.keys(data).map((i) => data[i][0]);
  const price = Object.keys(data).map((i) => Number(data[i][1]));
  const lineChartData = {
    labels: date,
    datasets: [
      {
        data: price,
        label: 'Цена закрытия',
        borderColor: 'rgba(0, 255, 42, 0.5)',
        fill: true,
        lineTension: 0.5,
      },
    ],
  };

  return (
    <div className="overflow-y-auto container">
      <Line
        type="line"
        width={200}
        height={70}
        options={{
          title: {
            display: true,
            fontSize: 20,
          },
          legend: {
            display: true, // Is the legend shown?
            position: 'top', // Position of the legend.
          },
        }}
        data={lineChartData}
      />
    </div>
  );
};

export { ChartLine };
export default ChartBar;
