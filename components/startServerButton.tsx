import { FC, ReactElement } from 'react';
import DnsIcon from '@mui/icons-material/Dns';
import Button from '@mui/material/Button';

const StartServerButton: FC<{ setIsLoading: Function, refreshData: Boolean, setRefreshData: Function, setServerStatus: Function }> =
  ({ setIsLoading, refreshData, setRefreshData, setServerStatus }): ReactElement => {

    const startServer: Function = (): void => {
      setIsLoading(true);
      fetch('/api/dockerStart', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.isRunning === true) {
            fetch('/api/initializeServer', { method: 'POST' })
              .then(res => res.json())
              .then(data => {
                setIsLoading(false);
                setRefreshData(!refreshData);
                if (data === "Unsuccessful") {
                  setServerStatus('Down');
                } else {
                  setServerStatus("Good");
                }
              })
              .catch(error => console.log(error))
          }
        })
        .catch(error => console.log(error))
    };

    return (
      <Button
        id="createOrderButton"
        variant="contained"
        sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
        onClick={() => startServer()}
      ><DnsIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Start Server</Button>
    )
  }

export default StartServerButton;
