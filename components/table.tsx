import { FC, ReactElement } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const tableDisplay: FC = (): ReactElement => {

    return (
        <TableContainer>
        <TableHead>
            <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    </TableContainer>
    )
}

export default tableDisplay