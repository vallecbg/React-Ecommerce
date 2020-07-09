const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { secret, port } = require('./config')
const app = express()

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

app.use(cookieParser(secret))
app.use(express.json())

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('An error occurred!')
})

require('./routes')(app)

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})