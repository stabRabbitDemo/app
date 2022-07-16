import React, { FC, ReactElement } from 'react';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';


const CheckServerButton: FC<{ setRefreshData: Function, serverStatus: string, setServerStatus: Function }> = ({ setRefreshData, serverStatus, setServerStatus }): ReactElement => {

  const checkServerStatus: Function = (): void => {
    fetch('/api/serverStatus')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setRefreshData(Math.random())
        }, 100);
        if (data === true) {
          setServerStatus("Good");
        } else {
          setServerStatus("Down");
        }
      })
      .catch(error => console.log(error))
  };

  return (
    <IconButton
      aria-label="refresh"
      color="primary"
      sx={{ bgcolor: "#E8E8E8" }}
      onClick={() => checkServerStatus()}
    >
      <RefreshIcon />
    </IconButton>
  )
}

export default CheckServerButton;
