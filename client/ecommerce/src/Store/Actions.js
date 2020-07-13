export const ActionTypes = {
    Login: Symbol('[AUTH] Login'),
    LoginSuccess: Symbol('[AUTH] Login Success'),
    LoginFail: Symbol('[AUTH] Login Fail'),

    Register: Symbol('[AUTH] Register'),
    RegisterSuccess: Symbol('[AUTH] Register Success'),
    RegisterFail: Symbol('[AUTH] Register Fail'),
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

