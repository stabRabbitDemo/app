import { FC, ReactElement, useState, useEffect, useContext, memo } from 'react';
import Button from '@mui/material/Button';
import LoopIcon from '@mui/icons-material/Loop';

const SimulateButton: FC<{ refreshData: {}, setRefreshData: Function }> = memo(({ refreshData, setRefreshData }): ReactElement => {
  const [intervalId, setIntervalId] = useState(0);

  console.log('simulate button rendered');
  let hackSwitch = true;
  const simulateOrders: Function = () => {
    fetch('/api/create')
      .then(res => res.json())
      .then(data => {
        console.log('added');
        setRefreshData({..., updateTable: Math.random()});
      })
      .catch(error => console.log(error))
  };

  const handleStart = () => {
    const id = setInterval(simulateOrders, 500);
    return id;
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Button
        id="createOrderButton"
        variant="contained"
        color="primary"
        sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
        onClick={() => setIntervalId(handleStart())}
      ><LoopIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Start</Button>
      <Button
        id="createOrderButton"
        variant="contained"
        color="primary"
        sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
        onClick={() => {
          clearInterval(intervalId);
        }}
      ><LoopIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Stop</Button>
    </div >

  )
});

export default SimulateButton;
