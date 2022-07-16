import { FC, ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import { Box, Stack, Typography } from '@mui/material';
import Dot from './@extended/Dot';
import { styled } from '@mui/material/styles';


const tableDisplay: FC<{ data: Array<Array<string | number>>, tableType: String, refreshData: Boolean, setRefreshData: Function}> = ({ data, tableType, refreshData, setRefreshData }): ReactElement => {
    // {"orderId":"1", "productName":"brush", "unitPrice": "20", "quantity": 1, "status": "?"}
    // ==============================|| ORDER TABLE - STATUS ||============================== //

    const OrderStatus: FC<{ status: string | number }> = ({ status }) => {
        let color;
        let title;

        switch (status) {
            case 'PAID':
                color = 'success';
                title = 'Paid';
                break;
            case 'UNPAID':
                color = 'error';
                title = 'Unpaid';
                break;
            default:
                color = 'primary';
                title = 'None';
        }

        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <Dot color={color} />
                <Typography>{title}</Typography>
            </Stack>
        );
    };

    const ColumnHeader = styled(Typography)({
        fontSize: "19px",
        fontWeight: "500"
    }) as typeof Typography

    const TableHeader: FC<{ type: String }> = ({ type }) => {
        if (type === 'unpaid') {
            return (
                <TableRow sx={{ font: "Public Sans", fontWeight: "600" }}>
                    <TableCell><ColumnHeader>Order ID</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Product</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Unit Price</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Quantity</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Status</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Pay</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Archive</ColumnHeader></TableCell>
                </TableRow>
            )
        } else if (type === 'paid'){
            return (
                <TableRow sx={{ font: "Public Sans", fontWeight: "600" }}>
                    <TableCell><ColumnHeader>Order ID</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Product</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Unit Price</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Quantity</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Status</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Archive</ColumnHeader></TableCell>
                </TableRow>
            )
        } else {
            return (
                <TableRow sx={{ font: "Public Sans", fontWeight: "600" }}>
                <TableCell><ColumnHeader>Order ID</ColumnHeader></TableCell>
                <TableCell><ColumnHeader>Product</ColumnHeader></TableCell>
                <TableCell><ColumnHeader>Unit Price</ColumnHeader></TableCell>
                <TableCell><ColumnHeader>Quantity</ColumnHeader></TableCell>
             </TableRow>
            )
        }
    }

    const RowsBody: FC<{ type: String, rowData: Array<Array<string | number>> }> = ({ type, rowData }): JSX.Element | null => {
        let tableCellFontSize = "16px";

         // method to insert new row with updated status value
         const updateOrder: Function = (update: String, row: (string | number)[]): void => {
            if (update === 'pay'){  
              fetch('/api/payone', {
                  body: JSON.stringify(row),
                  method: 'POST'
              })
                  .then(res => res.json())
                  .then(data => {
                    setTimeout(() => {
                      setRefreshData(!refreshData)
                    }, 100);

                  })
                  .catch(error => console.log(error))
              }else if (update ==="archive") {
                  fetch('/api/archiveone', {
                      body: JSON.stringify(row),
                      method: 'POST'
                  })
                      .then(res => res.json())
                      .then(data => {
                          setTimeout(() => {
                              setRefreshData(!refreshData)
                          }, 100);
                      })
              }
          }
        

        if (type === 'unpaid') {
            return (
                <TableBody>
                    {Array.isArray(rowData) ? rowData.map((row: (string | number)[], index: number) => {
                        const isItemSelected: boolean = index % 2 === 0;

                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}>
                                <TableCell id="OrderIDCell" sx={{ color: 'gray' }} align="center">{row[0]}</TableCell>
                                <TableCell id="ProductCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[1]}</TableCell>
                                <TableCell id="unitPriceCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[2]}</TableCell>
                                <TableCell id="quantityCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[3]}</TableCell>
                                <TableCell id="statusCell" align="center">
                                    <OrderStatus status={row[4]} />
                                </TableCell>
                                <TableCell id="payButtonCell">
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={() => updateOrder("pay", row)}
                                    >Pay</Button>
                                </TableCell>
                                <TableCell id="archiveButtonCell">
                                    <Button 
                                        variant="outlined"
                                        onClick={() => updateOrder("archive", row)}
                                    >Archive</Button>
                                </TableCell>
                            </TableRow>)
                    }) : null}
                </TableBody>
            )
        } else if (type === 'paid') {
            return (
                <TableBody>
                    {Array.isArray(rowData) ? rowData.map((row: (string | number)[], index: number) => {
                        const isItemSelected: boolean = index % 2 === 0;

                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}>
                                <TableCell id="OrderIDCell" sx={{ color: 'gray' }} align="center">{row[0]}</TableCell>
                                <TableCell id="ProductCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[1]}</TableCell>
                                <TableCell id="unitPriceCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[2]}</TableCell>
                                <TableCell id="quantityCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[3]}</TableCell>
                                <TableCell id="statusCell" align="center">
                                    <OrderStatus status={row[4]} />
                                </TableCell>
                                <TableCell id="archiveButtonCell">
                                    <Button 
                                        variant="outlined"
                                        onClick = {() => updateOrder("archive", row)}
                                    >Archive</Button>
                                </TableCell>
                            </TableRow>)
                    }) : null}
                </TableBody>

            )
        } else {
            return (
                <TableBody>
                    {Array.isArray(rowData) ? rowData.map((row: (string | number)[], index: number) => {
                        const isItemSelected: boolean = index % 2 === 0;

                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}>
                                <TableCell id="OrderIDCell" sx={{ color: 'gray' }} align="center">{row[0]}</TableCell>
                                <TableCell id="ProductCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[1]}</TableCell>
                                <TableCell id="unitPriceCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[2]}</TableCell>
                                <TableCell id="quantityCell" sx={{ fontSize: tableCellFontSize }} align="center">{row[3]}</TableCell>
                            </TableRow>)
                    }) : null}
                </TableBody>
            )
        }
    }


    return (
        <Box sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: '8px',
            border: "1px",
            borderColor: "gray",
        }}>
            <TableContainer
                sx={{
                    overflowX: 'auto',
                    overflowY: 'scroll',
                    height: '27vh',
                    position: 'relative',
                    display: 'block',
                    border: "1px solid rgb(230, 235, 241)",
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}>
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-of-type': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <TableHead>
                        <TableHeader type={tableType} />
                    </TableHead>
                    <RowsBody type={tableType} rowData={data} />
                </Table>
            </TableContainer>
        </Box>
    )
}

export default tableDisplay;
