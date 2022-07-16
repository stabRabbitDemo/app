import { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import fakeData from '../fakeData';

const ClearOrderButton: FC<{ setRefreshData: Function }> = ({ setRefreshData }): ReactElement => {

  const clearOrder: Function = (): void => {
    fetch('/api/archive')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setRefreshData(!refreshData)
        }, 200);
      })
      .catch(error => console.log(error))
  };

  return (
    <Button
      id="clearOrderButton"
      variant="contained"
      color="secondary"
      sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
      onClick={() => clearOrder()}
    ><ClearAllIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} /> Archive All</Button>
  )
}

export default ClearOrderButton;
