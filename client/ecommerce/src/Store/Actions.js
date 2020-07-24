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

    GetProduct: Symbol('[PRODUCTS] Get One Product'),
    GetProductSuccess: Symbol('[PRODUCTS] Get One Product Success'),
    GetProductFail: Symbol('[PRODUCTS] Get One Product Fail'),

    GetAllCategories: Symbol('[CATEGORIES] Get All Categories'),
    GetAllCategoriesSuccess: Symbol('[CATEGORIES] Get All Categories Success'),
    GetAllCategoriesFail: Symbol('[CATEGORIES] Get All Categories Fail'),

    CreateCategory: Symbol('[CATEGORIES] Create Category'),
    CreateCategorySuccess: Symbol('[CATEGORIES] Create Category Success'),
    CreateCategoryFail: Symbol('[CATEGORIES] Create Category Fail'),
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

export const getProduct = () => ({
    type: ActionTypes.GetProduct,
    payload: undefined
})
export const getProductSuccess = (product) => ({
    type: ActionTypes.GetProduct,
    payload: { product }
})
export const getProductFail = (error) => ({
    type: ActionTypes.GetProductFail,
    payload: { error }
})

export const getAllCategories = () => ({
    type: ActionTypes.GetAllCategories,
    payload: undefined
})
export const getAllCategoriesSuccess = (categories) => ({
    type: ActionTypes.GetAllCategoriesSuccess,
    payload: { categories }
})
export const getAllCategoriesFail = (error) => ({
    type: ActionTypes.GetAllCategoriesFail,
    payload: { error }
})

export const createCategory = (category) => ({
    type: ActionTypes.CreateCategory,
    payload: {category}
})
export const createCategorySuccess = () => ({
    type: ActionTypes.CreateCategorySuccess,
    payload: undefined
})
export const CreateCategoryFail = (error) => ({
    type: ActionTypes.CreateCategoryFail,
    payload: { error }
})