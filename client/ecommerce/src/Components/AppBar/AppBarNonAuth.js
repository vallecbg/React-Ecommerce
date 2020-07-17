import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, Typography, List, ListItem,
  withStyles, Grid, SwipeableDrawer, Button
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'

class AppBarNonAuth extends Component{
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
    const {classes} = this.props
    return (
      <div>
        <AppBar >
          <Toolbar>
            <Grid container direction = "row" justify = "space-between" alignItems="center">
              <MenuIcon
                className = {this.props.classes.sideBarIcon}
                onClick={()=>{this.setState({drawer:true})}} />

              <Typography color="inherit" variant = "h6">Reactify</Typography>
              <Typography color="inherit" variant = "h1"></Typography>
            </Grid>
          </Toolbar>
        </AppBar>

        <SwipeableDrawer
         open={this.state.drawer}
         onClose={()=>{this.setState({drawer:false})}}
         onOpen={()=>{this.setState({drawer:true})}}>
           {/* TODO: add links */}
           <Typography color="inherit" variant = "h6">Reactify</Typography>
           <div
             tabIndex={0}
             role="button"
             onClick={()=>{this.setState({drawer:false})}}
             onKeyDown={()=>{this.setState({drawer:false})}}>
            <List className = {this.props.classes.list}>
               <ListItem key = {1} button divider> 
                <HomeIcon className={classes.menuIcon}/>
                Home 
               </ListItem>
               <ListItem key = {2} button divider> 
                <AccountCircleIcon className = {classes.menuIcon}/>  
                Login 
               </ListItem>
               <ListItem key = {3} button divider> 
               <PersonOutlineIcon className = {classes.menuIcon}/>
                Register 
               </ListItem>
             </List>

         </div>
       </SwipeableDrawer>

      </div>
    );
  }

  //Larger Screens
  destroyDrawer(){
    const {classes} = this.props
    return (
      <AppBar>
        <Toolbar>
          <Typography variant = "h6" style={{flexGrow:1}} color="inherit" ><Link className={classes.navLink} to="/">Reactify</Link></Typography>
          <Link className={classes.navLink} to="/login">
            <Button variant = "text" className = {classes.padding} color="inherit" >Login</Button>
          </Link>
          <Link className={classes.navLink} to="/register">
            <Button variant = "text" className = {classes.padding} color="inherit" >Register</Button>
          </Link>
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

AppBarNonAuth.propTypes = {
  classes : PropTypes.object.isRequired
};



export default AppBarNonAuth;