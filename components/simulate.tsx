import { FC, ReactElement, useState, memo } from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import LoopIcon from '@mui/icons-material/Loop';
import StopIcon from '@mui/icons-material/Stop';

const SimulateButton: FC<{ setRefreshData: Function }> = memo(({ setRefreshData }): ReactElement => {
  const [intervalId, setIntervalId] = useState(0);

  console.log('simulate button rendered');
  let hackSwitch = true;
  const simulateOrders: Function = () => {
    fetch('/api/create')
      .then(res => res.json())
      .then(data => {
        console.log('added');
        setRefreshData(Math.random());
      })
      .catch(error => console.log(error))
    if (Math.random() > 0.7) {
      fetch('/api/pay')
        .then(res => res.json())
        .then(data => { })
        .catch(error => console.log(error))
    }
    if (Math.random() > 0.9) {
      fetch('/api/archive')
        .then(res => res.json())
        .then(data => { })
        .catch(error => console.log(error))
    }
  };

  const handleStart = () => {
    const id = setInterval(simulateOrders, 750);
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
      ><PlayArrowIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Start</Button>
      <Button
        id="createOrderButton"
        variant="contained"
        color="primary"
        sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
        onClick={() => {
          clearInterval(intervalId);
        }}
      ><StopIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Stop</Button>
    </div >

  )
});

export default SimulateButton;
