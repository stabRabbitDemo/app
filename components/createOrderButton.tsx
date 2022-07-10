import { FC, ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const CreateOrderButton: FC<{ refreshData: Boolean, setRefreshData: Function }> = ({ refreshData, setRefreshData }): ReactElement => {

  const createOrder: Function = (): void => {
    fetch('/api/create')
      .then(res => res.json())
      .then(data => {
        console.log('refreshdata: ', refreshData)
        setRefreshData(!refreshData)
        // setTimeout(() => {

        // }, 5000);
      })
      .catch(error => console.log(error))
  };

  return (
    <Button
      id="createOrderButton"
      variant="contained"
      color="primary"
      sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
      onClick={() => createOrder()}
    ><AddIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Create Order</Button>
  )
}

export default CreateOrderButton;
