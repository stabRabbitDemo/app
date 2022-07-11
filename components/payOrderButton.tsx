import { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import fakeData from '../fakeData';

const PayOrderButton: FC<{ refreshData: Boolean, setRefreshData: Function }> = ({ refreshData, setRefreshData }): ReactElement => {

  const payOrder: Function = (): void => {
    fetch('/api/pay')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  };

  return (
    <Button
      id="payOrderButton"
      variant="contained"
      color="success"
      sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
      onClick={() => console.log('pay order button clicked')}
    ><PaymentIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} /> Pay Order</Button>
  )
}

export default PayOrderButton;
