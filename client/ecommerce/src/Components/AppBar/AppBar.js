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
  test: {
      marginTop: '100px'
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
