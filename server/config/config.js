const env = process.env.NODE_ENV || 'development'
const config = {
    development: {
        port: process.env.PORT || 8000,
        dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/ecommerce',
        authCookie: 'x-auth-cookie',
        secret: process.env.SECRET || 'nanaikipendo',
        tokenExpiresIn: '2h'
    },
    production: {}
}

module.exports = config[env]