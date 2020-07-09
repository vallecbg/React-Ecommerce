const db = require('./config/db')
const dotenv = require('dotenv')
dotenv.config()

db()
    .then(() => {
        require('./config/express')
        console.log("db is running!")
    })
    .catch((err) => {
        console.error(err)
    })