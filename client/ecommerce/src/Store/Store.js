import React, { createContext, useReducer, useMemo } from "react";
import { useAsync } from "react-async-hook";
import {
  ActionTypes,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  logoutSuccess,
  logoutFail,
  getAllProductsSuccess,
  getAllProductsFail,
  getProductSuccess,
  getProductFail,
  getAllCategoriesSuccess,
  getAllCategoriesFail,
  createCategorySuccess,
  createCategoryFail,
  createProductSuccess,
  createProductFail,
  addProductToCartSuccess,
  addProductToCartFail,
  createOrderSuccess,
  createOrderFail,
  getAllOrdersSuccess,
  getAllOrdersFail,
  editCategorySuccess,
  editCategoryFail,
  deleteCategorySuccess,
  deleteCategoryFail,
} from "./Actions";
import authService from "../Services/authService";
import productService from "../Services/productService";
import categoryService from "../Services/categoryService";
import orderService from "../Services/orderService";

const cookies = document.cookie.split("; ").reduce((acc, curr) => {
  const [key, value] = curr.split("=");
  acc[key] = value;
  return acc;
}, {});

// const currentUser = JSON.parse(window.localStorage.getItem("user"));
// const isAdmin =
//   currentUser !== null ? currentUser.role === Constants.AdminRole : false;

const authCookie = cookies["x-auth-cookie"];

const initialState = {
  isAuth: !!authCookie,
  //isAdmin,
  user: JSON.parse(window.localStorage.getItem("user")),
  error: null,
  products: [],
  product: [],
  categories: [],
  productsCart: window.localStorage["cart"]
    ? JSON.parse(window.localStorage.getItem("cart"))
    : [],
  order: [],
  notification: {
    variant: "",
    message: "",
  },
  orders: [],
};

const actionMap = {
  [ActionTypes.Login]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.LoginSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    notification: { variant: "success", message: "Successfully logged in!" },
  }),
  [ActionTypes.LoginFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.Register]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.RegisterSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    notification: { variant: "success", message: "Successfully registered!" },
    //isAdmin: user.role === Constants.AdminRole,
  }),
  [ActionTypes.RegisterFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.Logout]: (state) => ({
    ...state,
    user: null,
    isAuth: false,
    notification: { variant: "success", message: "Successfully logged out!" },
    //isAdmin: false,
  }),
  [ActionTypes.GetAllProducts]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetAllProductsSuccess]: (state, { products }) => ({
    ...state,
    products,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetAllProductsFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.GetProduct]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetProductSuccess]: (state, { product }) => ({
    ...state,
    product,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetProductFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.GetAllCategories]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetAllCategoriesSuccess]: (state, { categories }) => ({
    ...state,
    categories,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetAllCategoriesFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.CreateCategory]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.CreateCategorySuccess]: (state) => ({
    ...state,
    error: null,
    notification: {
      variant: "success",
      message: "Successfully created category!",
    },
  }),
  [ActionTypes.CreateCategoryFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.EditCategory]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.EditCategorySuccess]: (state) => ({
    ...state,
    error: null,
    notification: {
      variant: "success",
      message: "Successfully edited category!",
    },
  }),
  [ActionTypes.EditCategoryFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.DeleteCategory]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.DeleteCategorySuccess]: (state) => ({
    ...state,
    error: null,
    notification: {
      variant: "success",
      message: "Successfully deleted category!",
    },
  }),
  [ActionTypes.DeleteCategoryFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.CreateProduct]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.CreateProductSuccess]: (state) => ({
    ...state,
    error: null,
    notification: {
      variant: "success",
      message: "Successfully created product!",
    },
  }),
  [ActionTypes.CreateProductFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.AddProductToCart]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.AddProductToCartSuccess]: (state, { product }) => {
    let productsArr = [...state.productsCart];
    const productFound = productsArr.find((item) => item._id === product._id);
    console.log(productFound);
    if (productFound) {
      state.productsCart[state.productsCart.indexOf(productFound)] = {
        ...productFound,
        quantity: productFound.quantity++,
      };
    } else {
      productsArr = productsArr.concat({ ...product, quantity: 1 });
    }

    window.localStorage.setItem("cart", JSON.stringify(productsArr));

    return {
      ...state,
      productsCart: productsArr,
      notification: {
        variant: "success",
        message: "Successfully added product to cart!",
      },
    };
  },

  [ActionTypes.addProductToCartFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.UpdateCartSuccess]: (state, { product, value }) => {
    let productsArr = [...state.productsCart];
    const productFound = productsArr.find((item) => item._id === product._id);
    console.log("Quantity: ", value);
    if (productFound) {
      productsArr[productsArr.indexOf(productFound)] = {
        ...productFound,
        quantity: value,
      };
    } else {
      productsArr = productsArr.concat({ ...product, quantity: value });
    }

    window.localStorage.setItem("cart", JSON.stringify(productsArr));

    return {
      ...state,
      productsCart: productsArr,
      notification: productFound
        ? { variant: "", message: "" }
        : {
            variant: "success",
            message: "Successfully added product to cart!",
          },
    };
  },
  [ActionTypes.UpdateCartFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.RemoveProductFromCart]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.RemoveProductFromCartSuccess]: (state, { product }) => {
    const productsArr = state.productsCart.filter(
      (item) => item._id !== product._id
    );
    window.localStorage.setItem("cart", JSON.stringify(productsArr));

    return {
      ...state,
      productsCart: productsArr,
      notification: {
        variant: "success",
        message: "Successfully removed product from cart!",
      },
    };
  },
  [ActionTypes.RemoveProductFromCartFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.ResetCart]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.ResetCartSuccess]: (state) => {
    window.localStorage.setItem("cart", []);

    return {
      ...state,
      productsCart: [],
      notification: { variant: "", message: "" },
    };
  },
  [ActionTypes.ResetCartFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.CreateOrder]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.CreateOrderSuccess]: (state) => ({
    ...state,
    error: null,
    notification: {
      variant: "success",
      message: "Successfully created order!",
    },
  }),
  [ActionTypes.CreateOrderFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
  [ActionTypes.GetAllOrders]: (state) => ({
    ...state,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetAllOrdersSuccess]: (state, { orders }) => ({
    ...state,
    orders,
    error: null,
    notification: { variant: "", message: "" },
  }),
  [ActionTypes.GetAllOrdersFail]: (state, { error }) => ({
    ...state,
    error,
    notification: { variant: "error", message: "An error occurred!" },
  }),
};

const asyncActionMap = {
  [ActionTypes.Login]: ({ user }) => {
    return authService
      .login(user)
      .then(({ data: { user } }) => {
        window.localStorage.setItem(
          "user",
          JSON.stringify({ id: user._id, token: user.token })
        );
        return loginSuccess(user);
      })
      .catch((error) => loginFail(error));
  },
  [ActionTypes.Register]: ({ user }) => {
    return authService
      .register(user)
      .then(({ data: { user } }) => {
        window.localStorage.setItem(
          "user",
          JSON.stringify({ id: user._id, token: user.token })
        );
        return registerSuccess(user);
      })
      .catch((error) => registerFail(error));
  },
  [ActionTypes.Logout]: () => {
    return authService
      .logout()
      .then(() => {
        window.localStorage.removeItem("user");
        return logoutSuccess();
      })
      .catch((error) => logoutFail(error));
  },
  [ActionTypes.GetAllProducts]: () => {
    return productService
      .getAll()
      .then(({ data }) => {
        return getAllProductsSuccess(data);
      })
      .catch((error) => {
        getAllProductsFail(error);
      });
  },
  [ActionTypes.GetProduct]: (id) => {
    return productService
      .getOne(id)
      .then(({ data }) => {
        return getProductSuccess(data);
      })
      .catch((error) => {
        getProductFail(error);
      });
  },
  [ActionTypes.GetAllCategories]: () => {
    return categoryService
      .getAll()
      .then(({ data }) => {
        return getAllCategoriesSuccess(data);
      })
      .catch((error) => {
        getAllCategoriesFail(error);
      });
  },
  [ActionTypes.CreateCategory]: ({ category }) => {
    return categoryService
      .create(category)
      .then(() => {
        return createCategorySuccess(category);
      })
      .catch((error) => {
        createCategoryFail(error);
      });
  },
  [ActionTypes.EditCategory]: ({ category }) => {
    return categoryService
      .edit(category)
      .then(() => {
        return editCategorySuccess(category);
      })
      .catch((error) => {
        editCategoryFail(error);
      });
  },
  [ActionTypes.DeleteCategory]: ({ category }) => {
    return categoryService
      .delete(category)
      .then(() => {
        return deleteCategorySuccess();
      })
      .catch((error) => {
        deleteCategoryFail(error);
      });
  },
  [ActionTypes.CreateProduct]: ({ product }) => {
    console.log("Store product: ", product);
    return productService
      .create(product)
      .then(() => {
        return createProductSuccess(product);
      })
      .catch((error) => {
        createProductFail(error);
      });
  },
  [ActionTypes.AddProductToCart]: ({ product }) => {
    return productService
      .getOne(product._id)
      .then(({ data }) => {
        return addProductToCartSuccess(data[0]);
      })
      .catch((error) => addProductToCartFail(error));
  },
  [ActionTypes.CreateOrder]: ({ order }) => {
    return orderService
      .create(order)
      .then(() => {
        return createOrderSuccess(order);
      })
      .catch((error) => {
        createOrderFail(error);
      });
  },
  [ActionTypes.GetAllOrders]: () => {
    return orderService
      .getAll()
      .then(({ data }) => {
        return getAllOrdersSuccess(data);
      })
      .catch((error) => {
        getAllOrdersFail(error);
      });
  },
};

const storeReducer = (state, action) => {
  return actionMap[action.type]
    ? actionMap[action.type](state, action.payload)
    : state;
};

export const StoreContext = createContext(initialState);

const apiFetchUserDetails = (id) => {
  if (typeof id === "string" && id !== null) {
    return fetch(`http://localhost:8000/api/user/details/${id}`)
      .then((res) => res.json())
      .then((data) => data[0]);
  }
  return null;
};

const ContextStore = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const id = JSON.parse(window.localStorage.getItem("user"))
    ? JSON.parse(window.localStorage.getItem("user")).id
    : null;
  const fetchUserDetails = useAsync(apiFetchUserDetails, [id]);
  const store = useMemo(
    () => ({
      state,
      dispatch: (action) => {
        const asyncActionHandler = asyncActionMap[action.type];
        if (asyncActionHandler) {
          asyncActionHandler(action.payload).then(dispatch);
        }
        dispatch(action);
      },
      fetchUserDetails,
    }),
    [state, dispatch, fetchUserDetails]
  );

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextStore;
