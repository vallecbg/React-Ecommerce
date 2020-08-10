import React, { useContext, Component, Layout } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { StoreContext } from './Store/Store'
import { Main as MainLayout } from './Components/Administration/Layout'
const Home = React.lazy(() => import('./Components/Home/Home'))
const SignUp = React.lazy(() => import('./Components/Authentication/Register/SignUp'))
const SignIn = React.lazy(() => import('./Components/Authentication/Login/SignIn'))
const Cart = React.lazy(() => import('./Components/Cart/Cart'))
const Checkout = React.lazy(() => import('./Components/Checkout/Checkout'))
const ProductsList = React.lazy(() => import('./Components/Products/ProductsList/ProductsList'))
const ProductDetails = React.lazy(() => import('./Components/Products/ProductDetails/ProductDetails'))
//Admin panel
const Dashboard = React.lazy(() => import('./Components/Administration/Dashboard/Dashboard'))
const ProductCreate = React.lazy(() => import('./Components/Administration/ProductCreate/ProductCreate'))
const CategoryCreate = React.lazy(() => import('./Components/Administration/CategoryCreate/CategoryCreate'))
const UserList = React.lazy(() => import('./Components/Administration/UserList/UserList'))
const ProductList = React.lazy(() => import('./Components/Administration/ProductList/ProductList'))
const OrderList = React.lazy(() => import('./Components/Administration/OrderList/OrderList'))
const MyOrders = React.lazy(() => import('./Components/Administration/OrderList/MyOrders'))
const ProductEdit = React.lazy(() => import('./Components/Administration/ProductEdit/ProductEdit'))
const CategoryList = React.lazy(() => import('./Components/Administration/CategoryList/CategoryList'))
const CategoryEdit = React.lazy(() => import('./Components/Administration/CategoryEdit/CategoryEdit'))



//TODO: add 404 route


const AppRouter = () => {
    const { state, fetchUserDetails } = useContext(StoreContext)
    const { result, error, loading } = fetchUserDetails

    const AuthRoute = ({ path, component}) => {
        return state.isAuth ? <Redirect to={'/'} /> : <Route path={path} component={component} />
    }
    const ProtectedRoute = ({ path, component }) => {
        return state.isAuth ? <Route path={path} component={component} /> : <Redirect to={'/login'} />
    }

    function ProtectedRouteLayout({
        component: Component,
        layout: Layout,
        ...rest
    }) {
        return state.isAuth ? (
            <Route {...rest} render={(props) => 
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            } 
            />
        ) : <Redirect to={'/login'} />
    }

    function AdminRoute({
        component: Component,
        layout: Layout,
        ...rest
    }) {
        return (result && result.role === 'Admin') ? (
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
            <Route path="/cart" component={Cart} />
            <Route path="/product/details/:id" component={ProductDetails} />
            <ProtectedRoute path="/checkout" component={Checkout} />
            <AdminRoute path="/dashboard" component={Dashboard} layout={MainLayout} />
            <AdminRoute path="/productCreate" component={ProductCreate} layout={MainLayout} />
            <AdminRoute path="/categoryCreate" component={CategoryCreate} layout={MainLayout} />
            <AdminRoute path="/users" component={UserList} layout={MainLayout} />
            <AdminRoute path="/productList" component={ProductList} layout={MainLayout} />
            <AdminRoute path="/orders" component={OrderList} layout={MainLayout} />
            <ProtectedRouteLayout path="/myOrders" component={MyOrders} layout={MainLayout} />
            <AdminRoute path="/productEdit/:id" component={ProductEdit} layout={MainLayout} />
            <AdminRoute path="/categoryList" component={CategoryList} layout={MainLayout} />
            <AdminRoute path="/categoryEdit/:id" component={CategoryEdit} layout={MainLayout} />
        </Switch>
    )
}

export default AppRouter
