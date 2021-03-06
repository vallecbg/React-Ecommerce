import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Typography, Button } from "@material-ui/core";
import { StoreContext } from "../../../../../Store/Store";
import { logout } from "../../../../../Store/Actions";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  navLink: {
    textDecoration: "none",
    color: "white",
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const { state, dispatch, fetchUserDetails } = useContext(StoreContext);
  const history = useHistory();

  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const { result, error, loading } = fetchUserDetails;
    setLoading(loading);
    setError(error);
    setResult(result);
  }, [fetchUserDetails]);

  const logoutFunction = () => {
    dispatch(logout());
    history.push("/");
  };

  const classes = useStyles();

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      {result && (
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }} color="inherit">
            <RouterLink className={classes.navLink} to="/">
              Reactify
            </RouterLink>
          </Typography>
          <div className={classes.flexGrow} />
          <Hidden mdDown>
            <RouterLink className={classes.navLink} to="/products">
              <Button
                variant="text"
                className={classes.padding}
                color="inherit"
              >
                Products
              </Button>
            </RouterLink>
            {result.role === "Admin" ? (
              <RouterLink className={classes.navLink} to="/dashboard">
              <Button
                variant="text"
                className={classes.padding}
                color="inherit"
              >
                Admin Panel
              </Button>
            </RouterLink>
            ) : (
              <RouterLink className={classes.navLink} to="/myOrders">
              <Button
                variant="text"
                className={classes.padding}
                color="inherit"
              >
                Dashboard
              </Button>
            </RouterLink>
            )}
            
            <Button
              variant="text"
              className={classes.padding}
              color="inherit"
              onClick={logoutFunction}
            >
              Logout
            </Button>
          </Hidden>
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onSidebarOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      )}
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
