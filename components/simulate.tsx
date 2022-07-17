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
        variant="outlined"
        sx={{ color: "#2196f3", backgroundColor: '#e3f2fd', padding: "1rem", mx: "1rem", fontSize: "medium", fontWeight: 500, width: "16rem", mb: 2, border: "2px solid" }}
        onClick={() => setIntervalId(handleStart())}
      ><PlayArrowIcon style={{ 'color': "#1e88e5" }} sx={{ mr: "1rem" }} />Start Simulation</Button>
      <Button
        id="createOrderButton"
        variant="outlined"
        sx={{
          color: "#fb8c00", backgroundColor: '#fff3e0', padding: "1rem", mx: "1rem", fontSize: "medium", fontWeight: 500, width: "16rem", border: "2px solid #fb8c00", ':hover': {
            bgcolor: '#ffebee'
          },
        }}
        onClick={() => {
          clearInterval(intervalId);
        }}
      ><StopIcon style={{ 'color': "#fb8c00" }} sx={{ mr: "1rem" }} />Stop Simulation</Button>
    </div >

  )
});

export default SimulateButton;
