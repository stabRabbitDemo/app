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
        enabled: false
    },
    xaxis: {
        categories: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
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
            data: [80, 95, 70, 42, 65, 55, 78]
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
            <ApexCharts options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default BarChart;
