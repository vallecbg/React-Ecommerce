import React, {
  useContext,
  Component,
  Layout,
  useEffect,
  useState,
} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { StoreContext } from "./Store/Store";
import { Main as MainLayout } from "./Components/Administration/Layout";
import userService from "./Services/userService";

const Home = React.lazy(() => import("./Components/Home/Home"));
const SignUp = React.lazy(() =>
  import("./Components/Authentication/Register/SignUp")
);
const SignIn = React.lazy(() =>
  import("./Components/Authentication/Login/SignIn")
);
const Cart = React.lazy(() => import("./Components/Cart/Cart"));
const Checkout = React.lazy(() => import("./Components/Checkout/Checkout"));
const ProductsList = React.lazy(() =>
  import("./Components/Products/ProductsList/ProductsList")
);
const ProductDetails = React.lazy(() =>
  import("./Components/Products/ProductDetails/ProductDetails")
);
//Admin panel
const Dashboard = React.lazy(() =>
  import("./Components/Administration/Dashboard/Dashboard")
);
const ProductCreate = React.lazy(() =>
  import("./Components/Administration/ProductCreate/ProductCreate")
);
const CategoryCreate = React.lazy(() =>
  import("./Components/Administration/CategoryCreate/CategoryCreate")
);
const UserList = React.lazy(() =>
  import("./Components/Administration/UserList/UserList")
);
const ProductList = React.lazy(() =>
  import("./Components/Administration/ProductList/ProductList")
);
const OrderList = React.lazy(() =>
  import("./Components/Administration/OrderList/OrderList")
);
const MyOrders = React.lazy(() =>
  import("./Components/Administration/OrderList/MyOrders")
);
const ProductEdit = React.lazy(() =>
  import("./Components/Administration/ProductEdit/ProductEdit")
);

//TODO: add 404 route

const AppRouter = () => {
  const { state } = useContext(StoreContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const id = JSON.parse(window.localStorage.getItem("user"))
      ? JSON.parse(window.localStorage.getItem("user")).id
      : null;
    if (id !== null) {
      userService.details(id).then(({ data: currUser }) => {
        console.log(currUser[0]);
        setIsAdmin(currUser[0].role === "Admin");
      });
    }
  }, []);

  const AuthRoute = ({ path, component }) => {
    return state.isAuth ? (
      <Redirect to={"/"} />
    ) : (
      <Route path={path} component={component} />
    );
  };
  const ProtectedRoute = ({ path, component }) => {
    return state.isAuth ? (
      <Route path={path} component={component} />
    ) : (
      <Redirect to={"/login"} />
    );
  };

  function ProtectedRouteLayout({
    component: Component,
    layout: Layout,
    ...rest
  }) {
    return state.isAuth ? (
      <Route
        {...rest}
        render={(props) => (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        )}
      />
    ) : (
      <Redirect to={"/login"} />
    );
  }

  function AdminRoute({ component: Component, layout: Layout, ...rest }) {
    return isAdmin ? (
      <Route
        {...rest}
        render={(props) => (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        )}
      />
    ) : (
      <Redirect to={"/"} />
    );
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
      <AdminRoute
        path="/productCreate"
        component={ProductCreate}
        layout={MainLayout}
      />
      <AdminRoute
        path="/categoryCreate"
        component={CategoryCreate}
        layout={MainLayout}
      />
      <AdminRoute path="/users" component={UserList} layout={MainLayout} />
      <AdminRoute
        path="/productList"
        component={ProductList}
        layout={MainLayout}
      />
      <AdminRoute path="/orders" component={OrderList} layout={MainLayout} />
      <ProtectedRouteLayout
        path="/myOrders"
        component={MyOrders}
        layout={MainLayout}
      />
      <AdminRoute
        path="/productEdit/:id"
        component={ProductEdit}
        layout={MainLayout}
      />
    </Switch>
  );
};

export default AppRouter;
