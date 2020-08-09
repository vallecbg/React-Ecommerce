import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBarNonAuth from './AppBarNonAuth'
import AppBarAuth from './AppBarAuth'
import { StoreContext } from '../../Store/Store'
import Spinner from '../Loader/Spinner'
import userService from '../../Services/userService'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  list : {
    width : 200,
  },
  padding : {
    paddingRight : 30,
    cursor : "pointer",
  },

  sideBarIcon : {
    padding : 0,
    color : "white",
    cursor : "pointer",
  },

  menuIcon : {
    paddingRight: 5
  },

  navLink : {
    textDecoration: 'none',
    color : 'white'
  },
  navLinkMobile : {
    textDecoration: 'none',
    color: 'black'
  }
}));

const Navbar = () => {
  const classes = useStyles()
  const history = useHistory()
  const { state, dispatch } = useContext(StoreContext)
  const location = useLocation()

  const [ role, setRole ] = useState()

  useEffect(() => {
    const id = JSON.parse(window.localStorage.getItem("user"))
      ? JSON.parse(window.localStorage.getItem("user")).id
      : null;
    if (id !== null) {
      userService.details(id).then(({ data: currUser }) => {
        console.log(currUser[0]);
        setRole(currUser[0].role);
      });
    }
  }, [])

  console.log(location.pathname);

  // TODO: add confirmation dialog for logout and delete

  return (
    <div className={classes.grow}>
        <div>
          {location.pathname !== '/checkout' ? (
            <div>
            {state.isAuth ? (
                <AppBarAuth 
                    classes={classes} 
                    history={history} 
                    dispatch={dispatch}
                    roleName={role}
                    cartLength={state.productsCart.length}
                />
                ) : (
                <AppBarNonAuth 
                    classes={classes} 
                    cartLength={state.productsCart.length}
                />
            )}
          </div>
          ) : null}
          
        </div>
        
    </div>
  );
};

export default withRouter(Navbar);
