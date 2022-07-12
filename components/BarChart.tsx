import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
// import ReactApexChart from 'react-apexcharts';
import { IReactApexChartOptions } from '../types';
import { ApexOptions } from "apexcharts";
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });


// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 250,
        toolbar: {
            show: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: true
    },
    xaxis: {
        // categories: ['Stream', 'View', 'Clr', 'Sta'],
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //



const BarChart = () => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [series] = useState([
        {
            data: [{
                x: 'Stream',
                y: 80
            },
            {
                x: 'View',
                y: 42
            },
            {
                x: 'Clr',
                y: 67
            },
            {
                x: 'Sta',
                y: 34
            },
            ]
        }
    ]);
    // @ts-ignore
    const [options, setOptions] = useState<ApexOptions>(barChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            <ApexCharts options={options} series={series} type="bar" height={250} />
        </div>
    );
};

export default BarChart;
