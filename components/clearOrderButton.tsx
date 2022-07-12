import { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import fakeData from '../fakeData';

const ClearOrderButton: FC<{ refreshData: Boolean, setRefreshData: Function }> = ({ refreshData, setRefreshData }): ReactElement => {

  const clearOrder: Function = (): void => {
    fetch('/api/clear')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  };

  return (
    <Button
      id="clearOrderButton"
      variant="contained"
      color="secondary"
      sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
      onClick={() => console.log('clear order button clicked')}
    ><ClearAllIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} /> Clear Order</Button>
  )
}

export default ClearOrderButton;
