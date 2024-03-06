import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
};


interface ChartData {
  purchased: any;
  assigned: any
}


function ReportAssetChart(props: ChartData) {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Purchased',
        data: props.purchased,
        borderColor: '#F81521',
        backgroundColor: '#F81521',
      },
      {
        fill: true,
        label: 'Assigned',
        data: props.assigned,
        borderColor: '#FF9F43',
        backgroundColor: '#FF9F43',
      },
    ],
  };
  return (
      <div className='d-flex justify-content-center report-page-charts-h'>
        <Line options={options} data={data} />
      </div>
    )
}
export default ReportAssetChart;
