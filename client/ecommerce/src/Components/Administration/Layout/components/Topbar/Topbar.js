import React, { useState, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, Button } from '@material-ui/core'
import { StoreContext } from '../../../../../Store/Store'
import { logout } from '../../../../../Store/Actions'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  navLink : {
    textDecoration: 'none',
    color : 'white'
  }
}));



const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const { dispatch } = useContext(StoreContext)
  const history = useHistory()

  const logoutFunction = () => {
    dispatch(logout())
    history.push('/')
  }

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <Typography variant = "h6" style={{flexGrow:1}} color="inherit" ><RouterLink className={classes.navLink} to="/">Reactify</RouterLink></Typography>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton> */}
          
          <RouterLink className={classes.navLink} to="/products">
            <Button variant = "text" className = {classes.padding} color="inherit" >Products</Button>
          </RouterLink>
          <RouterLink className={classes.navLink} to="/dashboard">
            <Button variant = "text" className = {classes.padding} color="inherit" >Admin Panel</Button>
          </RouterLink>
          <Button variant = "text" className = {classes.padding} color="inherit" onClick={logoutFunction}>Logout</Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
