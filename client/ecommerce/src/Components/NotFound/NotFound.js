import React from "react";
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navLink: {
    marginTop: '10px',
    textDecoration: "none",
  },
  container: {
    minHeight: "100vh"
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <Typography variant="h1" component="h2" align="center">
        Route Not Found
      </Typography>
      <Link to="/" className={classes.navLink}>
        <Button variant="contained" color="primary" align="center">
          Go Home
        </Button>
      </Link>
    </Grid>
  );
};

export default NotFound;
