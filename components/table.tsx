import { FC, ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const tableDisplay :FC<{data: Array<Array<string | number>>}>= ({data}): ReactElement => {

    
    return (
        <TableContainer                 
        sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' }
        }}>
        <Table
            aria-labelledby="tableTitle"
            sx={{
                '& .MuiTableCell-root:first-child': {
                    pl: 2
                },
                '& .MuiTableCell-root:last-child': {
                    pr: 3
                }
            }}
        >
        <TableHead>
            <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {Array.isArray(data) ? data.map((row: (string | number)[], index: number) => {
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
                    <TableCell align="left">{row[0]}</TableCell>
                    <TableCell align="left">{row[1]}</TableCell>
                    <TableCell align="right">{row[2]}</TableCell>
                    <TableCell align="left">{row[3]}</TableCell>
                    <TableCell align="right">{row[4]}</TableCell>
                </TableRow>)
            }): null}
        </TableBody>
        </Table>
    </TableContainer>
    )
}

export default tableDisplay