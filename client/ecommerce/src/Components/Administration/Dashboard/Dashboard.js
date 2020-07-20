import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import theme from '../../../theme'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { ThemeProvider } from '@material-ui/styles'

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '40px'
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                >
                <Budget />
                </Grid>
                <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                >
                <TotalUsers />
                </Grid>
                <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                >
                <TasksProgress />
                </Grid>
                <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
                >
                <TotalProfit />
                </Grid>
                <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
                >
                <LatestSales />
                </Grid>
                <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
                >
                <UsersByDevice />
                </Grid>
                <Grid
                item
                lg={4}
                md={6}
                xl={3}
                xs={12}
                >
                <LatestProducts />
                </Grid>
                <Grid
                item
                lg={8}
                md={12}
                xl={9}
                xs={12}
                >
                <LatestOrders />
                </Grid>
            </Grid>
        </div>
    </ThemeProvider>
  );
};

export default Dashboard;
