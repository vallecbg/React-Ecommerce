import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import SignUp from './Components/Authentication/Register/SignUp'


const AppRouter = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={SignUp} />
        </Switch>
    )
}

export default AppRouter