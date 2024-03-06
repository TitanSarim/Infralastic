import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip, ArcElement
} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import '../chart.scss';
ChartJS.register(ArcElement);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options: any = {
    responsive: true,
    maintainAspectRatio: false,
};
export const data = {
    labels: ['License Used', 'Active License', 'Blocked', 'Total Employees'],
    datasets: [
        {
            label: 'Total Percentage',
            data: [14,72,28,36],
            backgroundColor: [
                '#740006',
                '#F81521',
                '#8C929D',
                '#E9ECEF',
            ],
        },
    ],
};
const AssetDetailChart = () => {

    return(
        <div className='d-flex justify-content-center asset-detail-chart-h'>
            <Doughnut data={data}/>
        </div>
    )
}
export default AssetDetailChart;