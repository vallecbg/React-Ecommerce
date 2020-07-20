import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { StoreContext } from './Store/Store'
const Home = React.lazy(() => import('./Components/Home/Home'))
const SignUp = React.lazy(() => import('./Components/Authentication/Register/SignUp'))
const SignIn = React.lazy(() => import('./Components/Authentication/Login/SignIn'))
const ProductsList = React.lazy(() => import('./Components/Products/ProductsList/ProductsList'))
const ProductDetails = React.lazy(() => import('./Components/Products/ProductDetails/ProductDetails'))
const Dashboard = React.lazy(() => import('./Components/Administration/Dashboard/Dashboard'))

const AppRouter = () => {
    const { state } = useContext(StoreContext)
    const AuthRoute = ({ path, component}) => {
        return state.isAuth ? <Redirect to={'/'} /> : <Route path={path} component={component} />
    }
    const ProtectedRoute = ({ path, component }) => {
        return state.isAuth ? <Route path={path} component={component} /> : <Redirect to={'/'} />
    }
    const AdminRoute = ({ path, component }) => {
        return state.isAdmin ? <Route path={path} component={component} /> : <Redirect to={'/'} />
    }

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/register" component={SignUp} />
            <AuthRoute path="/login" component={SignIn} />
            <Route path="/products" component={ProductsList} />
            <Route path="/product/details/:id" component={ProductDetails} />
            <AdminRoute path="/dashboard" component={Dashboard}/>
        </Switch>
    )
}

export default AppRouter