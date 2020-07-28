import React, { useContext, useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBarNonAuth from './AppBarNonAuth'
import AppBarAuth from './AppBarAuth'
import { StoreContext } from '../../Store/Store'
import Spinner from '../Loader/Spinner'

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
  const { state, dispatch, fetchUserDetails } = useContext(StoreContext)
  const [ result, setResult ] = useState()
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState()
  useEffect(() => {
    const { result, error, loading } = fetchUserDetails
    setLoading(loading)
    setError(error)
    setResult(result)
  })

  // TODO: add confirmation dialog for logout and delete

  return (
    <div className={classes.grow}>
        <div>
          {loading && <Spinner/> }
          {error && <div>Error: {error.message}</div>}
          <div>
              {state.isAuth && result ? (
                  <AppBarAuth 
                      classes={classes} 
                      history={history} 
                      dispatch={dispatch}
                      roleName={result.role}
                  />
                  ) : (
                  <AppBarNonAuth classes={classes}/>
              )}
            </div>
        </div>
        
    </div>
  );
};

export default withRouter(Navbar);
