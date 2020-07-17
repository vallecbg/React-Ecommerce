import React, { useContext } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBarNonAuth from './AppBarNonAuth'
import AppBarAuth from './AppBarAuth'
import { StoreContext } from '../../Store/Store'

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
  }
}));

const Navbar = () => {
  const classes = useStyles()
  const history = useHistory()
  const { state } = useContext(StoreContext)
  const { dispatch } = useContext(StoreContext);


  return (
    <div className={classes.grow}>
        {state.isAuth ? (
            <AppBarAuth 
                classes={classes} 
                history={history} 
                dispatch={dispatch}
            />
            ) : (
            <AppBarNonAuth classes={classes}/>
        )}
    </div>
  );
};

export default withRouter(Navbar);
