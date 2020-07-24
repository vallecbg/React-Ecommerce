import React, { useContext, Component, Layout } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { StoreContext } from './Store/Store'
import { Main as MainLayout } from './Components/Administration/Layout'
const Home = React.lazy(() => import('./Components/Home/Home'))
const SignUp = React.lazy(() => import('./Components/Authentication/Register/SignUp'))
const SignIn = React.lazy(() => import('./Components/Authentication/Login/SignIn'))
const ProductsList = React.lazy(() => import('./Components/Products/ProductsList/ProductsList'))
const ProductDetails = React.lazy(() => import('./Components/Products/ProductDetails/ProductDetails'))
//Admin panel
const Dashboard = React.lazy(() => import('./Components/Administration/Dashboard/Dashboard'))
const ProductCreate = React.lazy(() => import('./Components/Administration/ProductCreate/ProductCreate'))
const CategoryCreate = React.lazy(() => import('./Components/Administration/CategoryCreate/CategoryCreate'))


const AppRouter = () => {
    const { state } = useContext(StoreContext)
    const AuthRoute = ({ path, component}) => {
        return state.isAuth ? <Redirect to={'/'} /> : <Route path={path} component={component} />
    }
    const ProtectedRoute = ({ path, component }) => {
        return state.isAuth ? <Route path={path} component={component} /> : <Redirect to={'/'} />
    }
    // const AdminRoute = ({ path, component }) => {
    //     return state.isAdmin ? <Route path={path} component={component}/> : <Redirect to={'/'} />
    // }

    function AdminRoute({
        component: Component,
        layout: Layout,
        ...rest
    }) {
        return state.isAdmin ? (
            <Route {...rest} render={(props) =>
                <Layout {...props}>
                    <Component {...props}/>
                </Layout>
            }
            />
        ) : <Redirect to={'/'} />
    }

    return (
        //TODO: Separate routes into their own files
        <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/register" component={SignUp} />
            <AuthRoute path="/login" component={SignIn} />
            <Route path="/products" component={ProductsList} />
            <Route path="/product/details/:id" component={ProductDetails} />
            <AdminRoute path="/dashboard" component={Dashboard} layout={MainLayout} />
            <AdminRoute path="/productCreate" component={ProductCreate} layout={MainLayout} />
            <AdminRoute path="/categoryCreate" component={CategoryCreate} layout={MainLayout} />
        </Switch>
    )
}

export default AppRouter