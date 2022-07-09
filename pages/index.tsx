import React, {useState, useEffect} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar'
import CreateOrderButton from '../components/createOrderButton'
import PayOrderButton from '../components/payOrderButton'
import ClearOrderButton from '../components/clearOrderButton'
import styles from '../styles/Home.module.css'
import {Button, Grid, Typography, Stack} from '@mui/material';
import TableDisplay from '../components/table';

const Home: NextPage = () => {

  // set-up table data in state
  const [unpaidData, setUnpaidData] = useState([]);
  const [paidData, setPaidData] = useState([]);
  const [unusualData, setUnusualData] = useState([]);

  // useEffect to pull in data and update state

  // useEffect(() => {
  //   fetch('/api/unpaidTable')
  //     .then(res => res.json())
  //     .then(data => {
  //       setUnpaidData(data.slice(1))
  //     })
  // },[]);

  // useEffect(() => {
  //   fetch('/api/PaidTable')
  //     .then(res => res.json())
  //     .then(data => {
  //       setPaidData(data.slice(1))
  //     })
  // },[]);

  // useEffect(() => {
  //   fetch('/api/unusualTable')
  //     .then(res => res.json())
  //     .then(data => {
  //       setUnusualData(data.slice(1))
  //     })
  // },[]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      {/* <TableDisplay /> */}
      <main className={styles.main}>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* row 1 */}
          <Grid item xs={12} sx={{ mb: -1 }}>
            <Typography variant="h5">Unpaid Orders</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TableDisplay data={[[1, 'product1', 1, 1, 'PAID'], [2, 'product2', 2, 2, 'UNPAID']]}/>
          </Grid>
          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
          {/* row 2 */}
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h5">Paid Orders</Typography>
                </Grid>
                <Grid item>
                    <Stack direction="row" alignItems="center" spacing={0}>
                        <Button
                            size="small"
                            color={'secondary'}
                            variant={'outlined'}
                        >
                            Month
                        </Button>
                        <Button
                            size="small"
                            color={ 'primary'}
                            variant={'outlined'}
                        >
                            Week
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TableDisplay data={[[3, 'product3', 3, 90, 'PAID'], [4, 'product4', 4, 100, 'PAID']]}/>
                </Grid>
            </Grid>
          </Grid>
          {/* row 3 */}
          <Grid item xs={12} md={7} lg={8}>

          <Grid item xs={12} sx={{ mb: -1 }}>
            <Typography variant="h5">Unusual Activity</Typography>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <TableDisplay data={[[5, 'product5', 5, 23, 'UNPAID'], [6, 'product6', 6, 67, 'UNPAID']]}/>
          </Grid>
          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
          </Grid>
          </Grid>
      </main>
    </div>
  )
}

export default Home
