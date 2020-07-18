export const ActionTypes = {
    Login: Symbol('[AUTH] Login'),
    LoginSuccess: Symbol('[AUTH] Login Success'),
    LoginFail: Symbol('[AUTH] Login Fail'),

    Register: Symbol('[AUTH] Register'),
    RegisterSuccess: Symbol('[AUTH] Register Success'),
    RegisterFail: Symbol('[AUTH] Register Fail'),

    Logout: Symbol('[AUTH] Logout'),
    LogoutSuccess: Symbol('[AUTH] Logout Success'),
    LogoutFail: Symbol('[AUTH] Logout Fail'),

    GetAllProducts: Symbol('[PRODUCTS] Get All Products'),
    GetAllProductsSuccess: Symbol('[PRODUCTS] Get All Products Success'),
    GetAllProductsFail: Symbol('[PRODUCTS] Get All Products Fail'),
}

export const login = (user) => ({
    type: ActionTypes.Login,
    payload: {user}
})
export const loginSuccess = (user) => ({
    type: ActionTypes.LoginSuccess,
    payload: {user}
})
export const loginFail = (error) => ({
    type: ActionTypes.LoginFail,
    payload: {error}
})

export const register = (user) => ({
    type: ActionTypes.Register,
    payload: {user}
})
export const registerSuccess = (user) => ({
    type: ActionTypes.RegisterSuccess,
    payload: {user}
})
export const registerFail = (error) => ({
    type: ActionTypes.RegisterFail,
    payload: {error}
})

export const logout = () => ({
    type: ActionTypes.Logout,
    payload: undefined
})
export const logoutSuccess = () => ({
    type: ActionTypes.LogoutSuccess,
    payload: undefined 
})
export const logoutFail = (error) => ({
    type: ActionTypes.LogoutFail,
    payload: {error}
})

export const getAllProducts = () => ({
    type: ActionTypes.GetAllProducts,
    payload: undefined
})
export const getAllProductsSuccess = (products) => ({
    type: ActionTypes.GetAllProductsSuccess,
    payload: { products }
})
export const getAllProductsFail = (error) => ({
    type: ActionTypes.GetAllProductsFail,
    payload: { error }
})