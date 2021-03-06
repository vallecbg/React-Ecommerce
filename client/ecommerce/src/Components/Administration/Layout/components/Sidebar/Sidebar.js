import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, Drawer, colors } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ListIcon from "@material-ui/icons/List";
import ListAltIcon from "@material-ui/icons/ListAlt";
import HomeIcon from '@material-ui/icons/Home';

import { StoreContext } from "../../../../../Store/Store";

import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;
  const { state, dispatch, fetchUserDetails } = useContext(StoreContext);
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const { result, error, loading } = fetchUserDetails;
    setLoading(loading);
    setError(error);
    setResult(result);
  }, [fetchUserDetails]);

  const classes = useStyles();

  const pagesAdmin = [
    {
      title: "Home Page",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Create Product",
      href: "/productCreate",
      icon: <ShoppingBasketIcon />,
    },
    {
      title: "Create Category",
      href: "/categoryCreate",
      icon: <ListIcon />,
    },
    {
      title: "Categories",
      href: "/categoryList",
      icon: <ListIcon />,
    },
    {
      title: "Users",
      href: "/users",
      icon: <PeopleIcon />,
    },
    {
      title: "Products",
      href: "/productList",
      icon: <ShoppingBasketIcon />,
    },
    {
      title: "Orders",
      href: "/orders",
      icon: <ListAltIcon />,
    },
    {
      title: "My Orders",
      href: "/myOrders",
      icon: <ListAltIcon />,
    },
  ];

  const pagesUser = [
    {
      title: "Home Page",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      title: "My Orders",
      href: "/myOrders",
      icon: <ListAltIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        {result && <Profile currentUser={result} />}
        <Divider className={classes.divider} />
        {result && <SidebarNav className={classes.nav} pages={result.role === "Admin" ? pagesAdmin : pagesUser} />}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
