import React, {
    createContext,
    useReducer,
    useMemo
} from 'react'
import {
    ActionTypes,
    loginSuccess,
    loginFail,
    registerSuccess,
    registerFail,
    logoutSuccess,
    logoutFail,
    getAllProductsSuccess,
    getAllProductsFail
} from './Actions'
import userService from '../Services/userService'
import productService from '../Services/productService'

const cookies = document.cookie.split('; ').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
}, {});

const authCookie = cookies['x-auth-cookie']

const initialState = {
    isAuth: !!authCookie,
    user: JSON.parse(window.localStorage.getItem('user')),
    error: null,
    products: []
    // toast: {
    //     status: '',
    //     message: ''
    // },
}

//TODO: add toast notifications when something is made to inform the user

const actionMap = {
    [ActionTypes.Login]: (state) => ({
        ...state,
        error: null
    }),
    [ActionTypes.LoginSuccess]: (state, {user}) => ({
        ...state,
        user,
        isAuth: true
    }),
    [ActionTypes.LoginFail]: (state, {error}) => ({
        ...state,
        error
    }),
    [ActionTypes.Register]: (state) => ({
        ...state,
        error: null
    }),
    [ActionTypes.RegisterSuccess]: (state, {user}) => ({
        ...state,
        user,
        isAuth: true
    }),
    [ActionTypes.RegisterFail]: (state, {error}) => ({
        ...state,
        error
    }),
    [ActionTypes.Logout]: (state) => ({
        ...state,
        user: null,
        isAuth: false
    }),
    [ActionTypes.GetAllProducts]: (state) => ({
        ...state,
        error: null
    }),
    [ActionTypes.GetAllProductsSuccess]: (state, {products}) => ({
        ...state,
        products,
        error: null
    }),
    [ActionTypes.GetAllProductsFail]: (state, {error}) => ({
        ...state,
        error
    })
}

const asyncActionMap = {
    [ActionTypes.Login]: ({user}) => {
        return userService.login(user).then(({data: {user}}) => {
            console.log(user);
            window.localStorage.setItem(
                'user',
                JSON.stringify({id: user._id, token: user.token})
            )
            return loginSuccess(user)
        })
        .catch((error) => loginFail(error))
    },
    [ActionTypes.Register]: ({user}) => {
        return userService.register(user).then(({data: {user}}) => {
            window.localStorage.setItem(
                'user',
                JSON.stringify({id: user._id, token: user.token})
            )
            return registerSuccess(user)
        })
        .catch((error) => registerFail(error))
    },
    [ActionTypes.Logout]: () => {
        return userService.logout().then(() => {
            window.localStorage.clear()
            return logoutSuccess()
        })
        .catch((error) => logoutFail(error))
    },
    [ActionTypes.GetAllProducts]: () => {
        return productService.getAll().then(({data}) => {
            return getAllProductsSuccess(data)
        })
        .catch((error) => {
            getAllProductsFail(error)
        })
    }
}

const storeReducer = (state, action) => {
    return actionMap[action.type]
      ? actionMap[action.type](state, action.payload)
      : state;
  };
  
export const StoreContext = createContext(initialState);

const ContextStore = (props) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
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
      }),
      [state, dispatch]
    );
  
    return (
      <StoreContext.Provider value={store}>
        {props.children}
      </StoreContext.Provider>
    );
  };
  
  export default ContextStore;