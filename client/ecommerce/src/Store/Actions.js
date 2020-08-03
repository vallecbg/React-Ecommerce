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

    CreateProduct: Symbol('[PRODUCTS] Create Product'),
    CreateProductSuccess: Symbol('[PRODUCTS] Create Product Success'),
    CreateProductFail: Symbol('[PRODUCTS] Create Product Fail'),

    AddProductToCart: Symbol('[PRODUCTS] Add Product To Cart'),
    AddProductToCartSuccess: Symbol('[PRODUCTS] Add Product To Cart Success'),
    AddProductToCartFail: Symbol('[PRODUCTS] Add Product To Cart Fail'),

    RemoveProductFromCart: Symbol('[PRODUCTS] Remove Product From Cart'),
    RemoveProductFromCartSuccess: Symbol('[PRODUCTS] Remove Product From Cart Success'),
    RemoveProductFromCartFail: Symbol('[PRODUCTS] Remove Product From Cart Fail'),

    UpdateCart: Symbol('[PRODUCTS] Update Cart'),
    UpdateCartSuccess: Symbol('[PRODUCTS] Update Cart Success'),
    UpdateCartFail: Symbol('[PRODUCTS] Update Cart Fail'),

    ResetCart: Symbol('[PRODUCTS] Reset Cart'),
    ResetCartSuccess: Symbol('[PRODUCTS] Reset Cart Success'),
    ResetCartFail: Symbol('[PRODUCTS] Reset Cart Fail'),

    CreateOrder: Symbol('[ORDERS] Create Order'),
    CreateOrderSuccess: Symbol('[ORDERS] Create Order Success'),
    CreateOrderFail: Symbol('[ORDERS] Create Order Fail'),
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
export const createCategoryFail = (error) => ({
    type: ActionTypes.CreateCategoryFail,
    payload: { error }
})

export const createProduct = (product) => ({
    type: ActionTypes.CreateProduct,
    payload: {product}
})
export const createProductSuccess = () => ({
    type: ActionTypes.CreateProductSuccess,
    payload: undefined
})
export const createProductFail = (error) => ({
    type: ActionTypes.CreateProductFail,
    payload: { error }
})

export const addProductToCart = (product) => ({
    type: ActionTypes.AddProductToCart,
    payload: {product}
})
export const addProductToCartSuccess = (product) => ({
    type: ActionTypes.AddProductToCartSuccess,
    payload: {product}
})
export const addProductToCartFail = (error) => ({
    type: ActionTypes.AddProductToCartFail,
    payload: { error }
})

export const removeProductFromCart = (product) => ({
    type: ActionTypes.RemoveProductFromCart,
    payload: {product}
})
export const removeProductFromCartSuccess = (product) => ({
    type: ActionTypes.RemoveProductFromCartSuccess,
    payload: {product}
})
export const removeProductFromCartFail = (error) => ({
    type: ActionTypes.RemoveProductFromCartFail,
    payload: { error }
})

export const updateCart = ({product, value}) => ({
    type: ActionTypes.UpdateCart,
    payload: { product, value }
})
export const updateCartSuccess = ({ product, value }) => ({
    type: ActionTypes.UpdateCartSuccess,
    payload: { product, value }
})
export const updateCartFail = (error) => ({
    type: ActionTypes.UpdateCartFail,
    payload: { error }
})

export const resetCart = () => ({
    type: ActionTypes.ResetCart,
    payload: undefined
})
export const resetCartSuccess = () => ({
    type: ActionTypes.ResetCartSuccess,
    payload: undefined
})
export const resetCartFail = (error) => ({
    type: ActionTypes.ResetCartFail,
    payload: {error}
})

export const createOrder = (order) => ({
    type: ActionTypes.CreateOrder,
    payload: {order}
})
export const createOrderSuccess = () => ({
    type: ActionTypes.CreateOrderSuccess,
    payload: undefined
})
export const createOrderFail = (error) => ({
    type: ActionTypes.createOrderFail,
    payload: { error }
})