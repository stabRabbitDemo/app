import { ApexOptions } from "apexcharts";

export interface Data {
  orderId: string;
  productName: string;
  unitPrice: string;
  quantity: number;
  status: string;
}

export interface ClientResponse {
  status: number;
  statusText: string;
  headers: Object;
  data: Array<{
    statementText: string;
  }>;
}

export interface IRefreshData {
  paidTable: number;
  unpaidTable: number; 
  archiveTable: number; 
  serverStatus: number; 
  barChart: number;

}

export interface IReactApexChartOptions {
  chart: {
    type?: any;
    series?: ApexOptions["series"];
    width?: string | number;
    height?: string | number;
    options?: ApexOptions;
    [key: string]: any;
    //   toolbar: {
    //     show: boolean;
    //   };
    // };
    // plotOptions: {
    //   bar: {
    //     columnWidth: string;
    //     borderRadius: number;
    //   };
    // };
    // dataLabels: {
    //   enabled: boolean;
    // };
    // colors?: string[];
    // xaxis?: {
    //   categories?: string[];
    //   axisBorder?: {
    //     show: boolean;
    //   };
    //   axisTicks?: {
    //     show: boolean;
    //   };
    //   labels?: {
    //     style: {
    //       colors: string[];
    //     };
    //   };
    // };
    // yaxis: {
    //   show: boolean;
    // };
    // grid: {
    //   show: boolean;
  };
  // tooltip?: { theme: string };
}
