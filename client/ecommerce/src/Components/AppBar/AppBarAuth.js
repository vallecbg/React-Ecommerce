import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer, Button, Badge
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { logout } from '../../Store/Actions'
import { StoreContext } from '../../Store/Store'
import CartButton from '../Cart/CartButton'
import DashboardIcon from '@material-ui/icons/Dashboard'

class AppBarAuth extends Component{

  constructor(props){
    super(props);
    this.state = {drawerActivate:false, drawer:false};
    this.createDrawer = this.createDrawer.bind(this);
    this.destroyDrawer = this.destroyDrawer.bind(this);
  }

  componentDidMount(){
    if(window.innerWidth <= 600){
      this.setState({drawerActivate:true});
    }

    window.addEventListener('resize',()=>{
      if(window.innerWidth <= 600){
        this.setState({drawerActivate:true});
      }
      else{
        this.setState({drawerActivate:false})
      }
    });
  }

  //Small Screens
  createDrawer(){
    const {classes, history, dispatch, roleName, cartLength} = this.props
    
    const logoutFunction = () => {
      dispatch(logout())
      history.push('/')
    }
    
    return (
      <div>
        <AppBar >
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />

              <Typography color="inherit" variant = "h6">Reactify</Typography>
              <Typography color="inherit" variant = "h1">
                <CartButton cartLength={cartLength} />
              </Typography>
              
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>
           <ListItem key={1} divider>
            <Typography color="inherit" variant = "h6">Reactify</Typography>
           </ListItem>
           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>
            <List className = {this.props.classes.list}>
                <Link className={classes.navLinkMobile} to='/'>
                  <ListItem key = {2} button divider> 
                    <HomeIcon className={classes.menuIcon}/>
                    Home 
                  </ListItem>
                </Link>
                <Link className={classes.navLinkMobile} to='/products'>
                  <ListItem key = {3} button divider> 
                    <ShoppingBasketIcon className={classes.menuIcon}/>
                    All Products 
                  </ListItem>
                </Link>
               {roleName === 'Admin' ? (
                 <Link className={classes.navLinkMobile} to='/dashboard'>
                    <ListItem key = {4} button divider> 
                      <DashboardIcon className = {classes.menuIcon}/>  
                      Admin Panel 
                    </ListItem>
                  </Link>
               ) : null}
               
               <ListItem key = {5} button divider onClick={logoutFunction}> 
                <AccountCircleIcon className = {classes.menuIcon}/>  
                Logout 
               </ListItem>
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    const {classes, history, dispatch, roleName, cartLength} = this.props

    const logoutFunction = () => {
        dispatch(logout())
        history.push('/')
    }

    return (
      <AppBar>
        <Toolbar>
          <Typography variant = "h6" style={{flexGrow:1}} color="inherit" ><Link className={classes.navLink} to="/">Reactify</Link></Typography>
          
          <Link className={classes.navLink} to="/products">
            <Button variant = "text" className = {classes.padding} color="inherit" >Products</Button>
          </Link>
            {roleName === 'Admin' ? (
              <Link className={classes.navLink} to="/dashboard">
                <Button variant = "text" className = {classes.padding} color="inherit" >Admin Panel</Button>
              </Link>
            ): null}
          
          <Button variant = "text" className = {classes.padding} color="inherit" onClick={logoutFunction}>Logout</Button>

          <CartButton cartLength={cartLength} />
        </Toolbar>
      </AppBar>
    )
  }

  render(){
    return(
      <div>
        {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
      </div>
    );
  }
}

AppBarAuth.propTypes = {
  classes : PropTypes.object.isRequired,
  history : PropTypes.object
};



export default AppBarAuth;