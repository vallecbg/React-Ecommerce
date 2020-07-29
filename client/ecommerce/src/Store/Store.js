import React, { createContext, useReducer, useMemo } from "react";
import { useAsync } from 'react-async-hook'
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
  addProductToCartFail
} from "./Actions";
import userService from "../Services/userService";
import productService from "../Services/productService";
import categoryService from "../Services/categoryService";

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
  productsCart: JSON.parse(window.localStorage.getItem('cart')) || []
  // toast: {
  //     status: '',
  //     message: ''
  // },
};

//TODO: add toast notifications when something is made to inform the user

const actionMap = {
  [ActionTypes.Login]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.LoginSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    //isAdmin: user.role === Constants.AdminRole,
  }),
  [ActionTypes.LoginFail]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.Register]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.RegisterSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    //isAdmin: user.role === Constants.AdminRole,
  }),
  [ActionTypes.RegisterFail]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.Logout]: (state) => ({
    ...state,
    user: null,
    isAuth: false,
    //isAdmin: false,
  }),
  [ActionTypes.GetAllProducts]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.GetAllProductsSuccess]: (state, { products }) => ({
    ...state,
    products,
    error: null,
  }),
  [ActionTypes.GetAllProductsFail]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.GetProduct]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.GetProductSuccess]: (state, { product }) => ({
    ...state,
    product,
    error: null,
  }),
  [ActionTypes.GetProductFail]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.GetAllCategories]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.GetAllCategoriesSuccess]: (state, { categories }) => ({
    ...state,
    categories,
    error: null,
  }),
  [ActionTypes.GetAllCategoriesFail]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.CreateCategory]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.CreateProduct]: (state) => ({
    ...state,
    error: null,
  }),
  [ActionTypes.AddProductToCart]: (state) => ({
    ...state,
    error: null
  }),
  [ActionTypes.AddProductToCartSuccess]: (state, {product}) => {
    let productsArr = [...state.productsCart]
    const productFound = productsArr.find(item => item._id === product._id)
    console.log(productFound);
    if (productFound) {
      state.productsCart[state.productsCart.indexOf(productFound)] = {
        ...productFound,
        quantity: productFound.quantity++
      }
    } else {
      productsArr = productsArr.concat({ ...product, quantity: 1 })
    }

    window.localStorage.setItem('cart', JSON.stringify(productsArr))

    return {
      ...state,
      productsCart: productsArr
    }
  },

  [ActionTypes.addProductToCartFail]: (state, {error}) => ({
    ...state,
    error
  }),
  [ActionTypes.UpdateCartSuccess]: (state, { product, value }) => {
    let productsArr = [...state.productsCart]
    const productFound = productsArr.find((item) => item._id === product._id)
    productsArr[productsArr.indexOf(productFound)] = {
      ...productFound,
      quantity: value
    }
    
    window.localStorage.setItem('cart', JSON.stringify(productsArr))

    return {
      ...state,
      productsCart: productsArr
    }
  },
  [ActionTypes.UpdateCartFail]: (state, {error}) => ({
    ...state,
    error
  }),
  [ActionTypes.RemoveProductFromCart]: (state) => ({
    ...state,
    error: null
  }),
  [ActionTypes.RemoveProductFromCartSuccess]: (state, { product }) => {
    const productsArr = state.productsCart.filter((item) => item._id !== product._id)
    window.localStorage.setItem('cart', JSON.stringify(productsArr))

    return {
      ...state,
      productsCart: productsArr
    }
  },
  [ActionTypes.RemoveProductFromCartFail]: (state, {error}) => ({
    ...state,
    error
  }),
  [ActionTypes.ResetCart]: (state) => ({
    ...state,
    error: null
  }),
  [ActionTypes.ResetCartSuccess]: (state) => {
    window.localStorage.setItem('cart', [])

    return {
      ...state,
      productsCart: []
    }
  },
  [ActionTypes.ResetCartFail]: (state, {error}) => ({
    ...state,
    error
  })
};

const asyncActionMap = {
  [ActionTypes.Login]: ({ user }) => {
    return userService
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
    return userService
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
    return userService
      .logout()
      .then(() => {
        window.localStorage.clear();
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
  [ActionTypes.CreateProduct]: ({ product }) => {
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
      .then(({data}) => {
        return addProductToCartSuccess(data[0])
      })
      .catch((error) => addProductToCartFail(error))
  }
};

const storeReducer = (state, action) => {
  return actionMap[action.type]
    ? actionMap[action.type](state, action.payload)
    : state;
};

export const StoreContext = createContext(initialState);

const apiFetchUserDetails = (id) => {
  if(typeof(id) === 'string' && id !== null){
    return fetch(`http://localhost:8000/api/user/details/${id}`)
    .then((res) => res.json())
    .then((data) => data[0])
  }
  return null
}

const ContextStore = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const id = JSON.parse(window.localStorage.getItem("user")) ? JSON.parse(window.localStorage.getItem("user")).id : null;
  const fetchUserDetails = useAsync(apiFetchUserDetails, [id])
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
      fetchUserDetails
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
