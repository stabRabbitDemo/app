
export interface Data {
  orderId: string;
  productName: string;
  unitPrice: string;
  quantity: number;
  status: string;
};

export interface ClientResponse {
  status: number;
  statusText: string;
  headers: Object;
  data: Array<{
    statementText: string;
  }>;
}