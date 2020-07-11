import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignUp from './Components/Authentication/Register/SignUp'


const AppRouter = () => {
    return (
        <Switch>
            <Route path="/register" exact component={SignUp} />
        </Switch>
    )
}

export default AppRouter