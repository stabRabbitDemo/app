import React, { FC, ReactElement, Fragment, useState, ReactEventHandler } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { flexbox } from '@mui/system';
import { styled } from '@mui/material/styles';
import CreateOrderButton from './createOrderButton';
import PayOrderButton from './payOrderButton';
import ClearOrderButton from './clearOrderButton';
import styles from '../styles/Home.module.css'
import StartServerButton from './startServerButton';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import reactSyntaxHighlighter from 'react-syntax-highlighter';


const mainListItems = (
  <Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="ksqlDB-JS Demo App" primaryTypographyProps={{ fontSize: '20px', color: "teal" }} />
    </ListItemButton>
    {/* <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton> */}
  </Fragment>
);

// const secondaryListItems = (
//   <Fragment>
//     <ListSubheader sx={{fontSize: 20}} component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <List className={styles.sidebarButtonList}>
//     <ListItem>
//       <CreateOrderButton refreshData = {refreshData} setRefreshData = {setRefreshData} />
//     </ListItem>
//     <ListItem>
//     <PayOrderButton/>
//     </ListItem>

//     <ListItem>
//     <ClearOrderButton />
//     </ListItem>

//     </List>
//   </Fragment>
// );

const Sidebar: FC<{ refreshData: Boolean, setRefreshData: Function, setIsLoading: Function, paidData: (string | number)[][], setServerStatus: Function }> =
  ({ refreshData, setRefreshData, setIsLoading, paidData, setServerStatus }): ReactElement => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    };

    const drawerWidth: number = 340;

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
      ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: drawerWidth,
          height: 'auto', // changed this from auto
          marginBottom: "-5000px", /* any large number will do */
          paddingBottom: "5000px",
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          boxSizing: 'border-box',
          ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
              width: theme.spacing(9),
            },
          }),
        },
      }),
    );

    return (
      <div className={styles.sidebar}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open}
        >
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            <Fragment>
              <ListSubheader sx={{ fontSize: 20, justifyContent: "center" }} component="div" inset >
                Menu
              </ListSubheader>
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <List className={styles.sidebarButtonList}>
                  <ListItem>
                    <CreateOrderButton refreshData={refreshData} setRefreshData={setRefreshData} />
                  </ListItem>
                  <ListItem>
                    <PayOrderButton refreshData={refreshData} setRefreshData={setRefreshData} />
                  </ListItem>
                  <ListItem>
                    <ClearOrderButton refreshData={refreshData} setRefreshData={setRefreshData} />
                  </ListItem>
                </List>
                <List>
                  <ListItem>
                    <StartServerButton setIsLoading={setIsLoading} refreshData={refreshData} setRefreshData={setRefreshData} setServerStatus={setServerStatus} />
                  </ListItem>
                </List>
              </Box>
            </Fragment>
          </List>
        </Drawer >

      </div >
    )
  }

export default Sidebar;
