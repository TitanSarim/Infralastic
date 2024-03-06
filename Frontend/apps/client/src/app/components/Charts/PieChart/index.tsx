import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Laptop', 'Mouse', 'Keyboard', 'Desktop', 'LED TV', 'Wires'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        '#F81521',
        '#FFE802',
        '#FF8131',
        '#299AFF',
        '#4F5D70',
        '#28DAC6',
      ]
    },
  ],
};

function PieChart() {
  return (
    <div className='d-flex justify-content-center report-page-charts-h w-100'>
      <Pie data={data} />
    </div>
  );
}
export default PieChart;
