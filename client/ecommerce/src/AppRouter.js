import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './Components/Home/Home'
import SignUp from './Components/Authentication/Register/SignUp'
import SignIn from './Components/Authentication/Login/SignIn'
import { StoreContext } from './Store/Store'

const AppRouter = () => {
    const { state } = useContext(StoreContext)
    const AuthRoute = ({ path, component}) => {
        return state.isAuth ? <Redirect to={'/'} /> : <Route path={path} component={component} />
    }
    // const ProtectedRoute = ({ path, component }) => {
    //     return state.isAuth ? <Route path={path} component={component} /> : <Redirect to={'/'} />
    // }

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/register" component={SignUp} />
            <AuthRoute path="/login" component={SignIn} />
        </Switch>
    )
}

export default AppRouter