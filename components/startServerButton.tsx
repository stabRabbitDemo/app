import { FC, ReactElement } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const StartServerButton: FC = (): ReactElement => {

  const startServer: Function = (): void => {
    fetch('/api/dockerStart')
      .then(res => res.json())
      .then(data => {
      })
      .catch(error => console.log(error))
  };

  return (
    <Button
      id="createOrderButton"
      variant="contained"
      sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
      onClick={() => startServer()}
    ><AddIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Start Server</Button>
  )
}

export default StartServerButton;
