import React, { useState, useEffect } from 'react'
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


const Home: NextPage = () => {

  // set-up table data in state
  const [unpaidData, setUnpaidData] = useState([]);
  const [paidData, setPaidData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);

  //setLoading for tables test - javan
  const [isLoading, setIsLoading] = useState(false);

  const [refreshData, setRefreshData] = useState(true);

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
  },[refreshData]);

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
      <CssBaseline />
      <Head>
        <title>KSQLDB-JS Demo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar refreshData={refreshData} setRefreshData={setRefreshData} setIsLoading={setIsLoading} />
      <main>
        <Grid container spacing={2.75} sx={{ ml: 2 }}>
          {/* row 1 table */}
          <Grid item xs={12} md={7} lg={8} >
            <StyledHeader variant="h5">Unpaid Orders</StyledHeader>
            <TableDisplay refreshData = {refreshData} setRefreshData = {setRefreshData} data={unpaidData} tableType="unpaid" />
          </Grid>
          {/* row 1 graph */}
          <Grid item xs={0} md={4} lg={3}>
            {/* <StyledHeader variant="h5">Summary</StyledHeader> */}
            <Box sx={{ minWidth: 275, m: 2 }}>
              <Card variant="outlined">{summaryCard}</Card>
            </Box>
            <Box sx={{ p: 0.25, m: 1, bgcolor: "white", border: "1px solid rgb(230, 235, 241)" }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-evenly" alignItems={"center"}>
                  <Avatar
                    sx={{
                      color: 'info.main',
                      bgcolor: 'error.lighter'
                    }}
                  >
                    <SettingOutlined />
                  </Avatar>
                  <Typography variant="h6" component="div">
                    Server Status: {"Good"}
                  </Typography>
                </Stack>
              </CardContent>
            </Box>
          </Grid>
          {/* row 2 table */}
          <Grid item xs={12} md={7} lg={8}>
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
            <TableDisplay refreshData = {refreshData} setRefreshData = {setRefreshData} data={paidData} tableType="paid" />
          </Grid>
          {/* row 2 graph */}

          <Grid item xs={0} md={4} lg={3}>
            <Box sx={{ m: 2, p: 2, bgcolor: "white", border: "1px solid rgb(230, 235, 241)" }}>
              <BarChart paidData = {paidData} unpaidData = {unpaidData} archiveData = {archiveData}/>
            </Box>
          </Grid>

          {/* row 3 */}
          <Grid item xs={12} md={7} lg={8} sx={{ mb: 4 }}>
            <StyledHeader variant="h5">Archived Orders</StyledHeader>
            <TableDisplay refreshData = {refreshData} setRefreshData = {setRefreshData} data={archiveData} tableType="archive" />
          </Grid>
          <Grid item xs={0} md={4} lg={3} sx={{ display: { sm: 'block', md: 'block', lg: 'block' } }}>
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
    </div >
  )
}

export default Home
