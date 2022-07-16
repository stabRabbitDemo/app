import React, { useState, useEffect, createContext } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Sidebar from '../components/sidebar'
import styles from '../styles/Home.module.css'
import { Avatar, Button, Grid, Typography, Stack, Card, LinearProgress, CardContent, CardActions, Box, CircularProgress, Backdrop } from '@mui/material';
import TableDisplay from '../components/table';
import BarChart from '../components/BarChart'
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import { SettingOutlined } from '@ant-design/icons';
import CheckServerButton from "../components/CheckServerButton";

const RefreshDataContext = createContext({});

const Home: NextPage = () => {

  // set-up table data in state
  const [unpaidData, setUnpaidData] = useState([]);
  const [paidData, setPaidData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [serverStatus, setServerStatus] = useState("Down");

  //setLoading for tables test - javan
  const [isLoading, setIsLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(true);
  console.log('app rendered');
  // useEffect to pull in data and update state

  useEffect(() => {
    fetch('/api/unpaidTable')
      .then(res => res.json())
      .then(data => {
        setUnpaidData(data)
      })
      .catch((err) => setUnpaidData([]));
  }, [refreshData]);

  useEffect(() => {
    fetch('/api/paidTable')
      .then(res => res.json())
      .then(data => {
        setPaidData(data)
      })
      .catch((err) => setPaidData([]));
  }, [refreshData]);

  useEffect(() => {
    fetch('/api/archiveTable')
      .then(res => res.json())
      .then(data => {
        setArchiveData(data)
      })
      .catch((err) => setArchiveData([]))
  }, [refreshData]);

  useEffect(() => {
    fetch('/api/serverStatus')
      .then(res => res.json())
      .then(data => {
        console.log("data returned from serverStatus in useEffect is: ", data);
        if (data === true) {
          setServerStatus("Good");
        } else {
          setServerStatus("Down");
        }
      })
      .catch((err) => setServerStatus("Down"));
  }, [refreshData]);

  const summaryCard = (
    <React.Fragment>
      <CardContent>
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography variant="h5" component="div">
          Total orders
        </Typography>
        <Typography sx={{ mb: 1 }} color="test.primary">
          {unpaidData.length + paidData.length}
        </Typography>
        <Typography variant="h6" component="div">
          Paid orders
        </Typography>
        <Typography sx={{ mb: 1 }} color="success.main">
          {paidData.length}
        </Typography>
        <Typography variant="h6" component="div">
          Unpaid orders
        </Typography>
        <Typography sx={{ mb: 1 }} color="primary.main">
          {unpaidData.length}
        </Typography>
        <Typography variant="h6" component="div">
          Archived Orders
        </Typography>
        <Typography sx={{ mb: 1 }} color="warning.main">
          2
        </Typography>
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </React.Fragment>
  );

  const StyledHeader = styled(Typography)({
    fontSize: "24px",
    fontWeight: "600",
    padding: "10px"

  }) as typeof Typography

  return (
    <div className={styles.container}>
      <RefreshDataContext.Provider value={refreshData}>
        <CssBaseline />
        <Head>
          <title>KSQLDB-JS Demo</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Sidebar setRefreshData={setRefreshData} setIsLoading={setIsLoading} setServerStatus={setServerStatus} />
        <main>
          <Grid container spacing={2.75} sx={{ ml: 2, mb: 3 }}>

            <Grid container item columnSpacing={2.75} xs={12} md={7} lg={8}>
              {/* column 1 */}
              <Grid item xs={12} md={12} lg={12} sx={{ mb: 3.5 }}>
                <StyledHeader variant="h5">Unpaid Orders</StyledHeader>
                <TableDisplay refreshData={refreshData} setRefreshData={setRefreshData} data={unpaidData} tableType="unpaid" />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sx={{ mb: 3.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems={"center"}>
                  <StyledHeader variant="h5">Paid Orders</StyledHeader>
                  <Stack direction="row" alignItems="center" spacing={0}>
                    <Button
                      size="small"
                      color={'secondary'}
                      variant={'outlined'}
                    >
                      PRICE
                    </Button>
                    <Button
                      size="small"
                      color={'primary'}
                      variant={'outlined'}
                    >
                      QUANTITY
                    </Button>
                  </Stack>
                </Stack>
                <TableDisplay refreshData={refreshData} setRefreshData={setRefreshData} data={paidData} tableType="paid" />
              </Grid>
              <Grid item xs={12} md={12} lg={12} sx={{ mb: 3 }}>
                <StyledHeader variant="h5">Archived Orders</StyledHeader>
                <TableDisplay refreshData={refreshData} setRefreshData={setRefreshData} data={archiveData} tableType="archive" />
              </Grid>
            </Grid>
            {/* column 2 */}
            <Grid container item columnSpacing={2.75} xs={0} md={4} lg={3} >
              <Grid item>
                <Box sx={{ minWidth: 275, m: 2 }}>
                  <Card variant="outlined">{summaryCard}</Card>
                </Box>
                <Box sx={{ p: 0, m: 2, bgcolor: "white", border: "1px solid rgb(230, 235, 241)" }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-evenly" alignItems={"center"}>
                      {/* <Avatar
                    sx={{
                      color: 'info.main',
                      bgcolor: 'error.lighter'
                    }}
                  >
                    <SettingOutlined />
                  </Avatar> */}
                      <CheckServerButton setRefreshData={setRefreshData} serverStatus={serverStatus} setServerStatus={setServerStatus} />
                      <Typography variant="h6" component="div">
                        Server Status: {serverStatus}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Box>
                <Box sx={{ m: 2, p: 2, bgcolor: "white", border: "1px solid rgb(230, 235, 241)" }}>
                  <BarChart paidData={paidData} unpaidData={unpaidData} archiveData={archiveData} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </main>
        {/* chart */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          Starting Up Docker &nbsp;
          <CircularProgress color="inherit" />
        </Backdrop>
      </RefreshDataContext.Provider>
    </div >
  )
}

export default Home
