import { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';


const CreateOrderButton: FC = (): ReactElement => {

  return (
    <Button 
    id="createOrderButton" 
    variant="contained"

    sx={{padding: "2rem", margin: "1rem", fontSize:"large"}}
    >Create Order</Button>
  )
}

export default CreateOrderButton;
