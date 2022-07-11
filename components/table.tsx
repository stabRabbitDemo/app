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


const tableDisplay: FC<{ data: Array<Array<string | number>>, tableType: String }> = ({ data, tableType }): ReactElement => {
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
        fontSize: "20px",
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
                    <TableCell><ColumnHeader>Clear</ColumnHeader></TableCell>
                </TableRow>
            )
        } else {
            return (
                <TableRow sx={{ font: "Public Sans", fontWeight: "600" }}>
                    <TableCell><ColumnHeader>Order ID</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Product</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Unit Price</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Quantity</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Status</ColumnHeader></TableCell>
                    <TableCell><ColumnHeader>Clear</ColumnHeader></TableCell>
                </TableRow>
            )
        }
    }

    const RowsBody: FC<{ type: String, rowData: Array<Array<string | number>> }> = ({ type, rowData }): JSX.Element | null => {
        if (type === 'unpaid') {
            return (
                <TableBody>
                    {Array.isArray(rowData) ? rowData.map((row: (string | number)[], index: number) => {
                        const isItemSelected: boolean = index % 2 === 0;

                        // method to insert new row with updated status value
                        const updateOrder: Function = (): void => {
                            fetch('/api/payone', {
                                body: JSON.stringify(row),
                                method: 'POST'
                            })
                                .then(res => res.json())
                                .then(data => console.log(data))
                        }

                        return (
                            <TableRow
                                hover
                                role="checkbox"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}>
                                <TableCell id="OrderIDCell" sx={{ color: 'gray' }}>{row[0]}</TableCell>
                                <TableCell id="ProductCell" align="left">{row[1]}</TableCell>
                                <TableCell id="unitPriceCell" align="left">{row[2]}</TableCell>
                                <TableCell id="quantityCell" align="left">{row[3]}</TableCell>
                                <TableCell id="statusCell" align="right">
                                    <OrderStatus status={row[4]} />
                                </TableCell>
                                <TableCell id="payButtonCell">
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={() => updateOrder()}
                                    >Pay</Button>
                                </TableCell>
                                <TableCell id="clearButtonCell">
                                    <Button variant="outlined">Clear</Button>
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
                                <TableCell id="OrderIDCell" sx={{ color: 'gray' }}>{row[0]}</TableCell>
                                <TableCell id="ProductCell" align="left">{row[1]}</TableCell>
                                <TableCell id="unitPriceCell" align="left">{row[2]}</TableCell>
                                <TableCell id="quantityCell" align="left">{row[3]}</TableCell>
                                <TableCell id="statusCell" align="right">
                                    <OrderStatus status={row[4]} />
                                </TableCell>
                                <TableCell id="clearButtonCell">
                                    <Button variant="outlined">Clear</Button>
                                </TableCell>
                            </TableRow>)
                    }) : null}
                </TableBody>

            )
        }
    }


    return (
        <Box sx={{
            backgroundColor: "white",
            borderRadius: '8px',
            border: "1px",
            borderColor: "gray",
        }}>
            <TableContainer
                sx={{
                    overflowX: 'auto',
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
