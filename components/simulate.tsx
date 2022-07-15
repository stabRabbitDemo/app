import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';

import LoopIcon from '@mui/icons-material/Loop';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const SimulateButton: FC<{ setRefreshData: Function }> = ({ setRefreshData }): ReactElement => {
  const [start, setStart] = useState(false);
  let simulate = false;
  let hackSwitch = false;

  const simulateOrders: Function = () => {
    if (start) {
      console.log('test');
      // fetch('/api/create')
      //   .then(res => res.json())
      //   .then(data => {
      //     hackSwitch = !hackSwitch;
      //     setRefreshData(hackSwitch);
      //   })
      //   .catch(error => console.log(error))

      setTimeout(() => simulateOrders(), 500);
    }
  };

  const newSimOrder = useCallback(simulateOrders, [start])
  return (
    <div>


      <Button
        id="createOrderButton"
        variant="contained"
        color="primary"
        sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
        onClick={() => {
          setStart(true);
        }}
        onChange={() => {

        }}
      ><LoopIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Start</Button>

      <Button
        id="createOrderButton"
        variant="contained"
        color="primary"
        sx={{ padding: "1rem", margin: "1rem", fontSize: "large", width: "16rem" }}
        onClick={() => {
          setStart(false);
        }}

      ><LoopIcon style={{ 'color': "white" }} sx={{ mr: "1rem" }} />Stop</Button>

    </div >

  )
};

export default SimulateButton;
