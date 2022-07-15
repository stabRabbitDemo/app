import React, { FC, ReactElement } from 'react';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';


const CheckServerButton: FC<{ refreshData: Boolean, setRefreshData: Function, serverStatus: string, setServerStatus: Function }> = ({ refreshData, setRefreshData, serverStatus, setServerStatus }): ReactElement => {

  const checkServerStatus: Function = (): void => {
    fetch('/api/serverStatus')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setRefreshData(!refreshData)
        }, 100);
        if (data === true) {
          setServerStatus("Good");
        }
      })
      .catch(error => console.log(error))
  };

  return (
    <IconButton
      aria-label="refresh"
      color="primary"
      onClick={() => checkServerStatus()}
    >
      <RefreshIcon />
    </IconButton>
  )
}

export default CheckServerButton;
