import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import SignUp from './Components/Authentication/Register/SignUp'
import SignIn from './Components/Authentication/Login/SignIn'


const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={SignIn} />
        </Switch>
    )
}

export default AppRouter