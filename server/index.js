const express = require('express')

const app = express()
require('dotenv').config()
const {SERVER_PORT} = process.env.PORT || 3000

const {getHTML, getStyles, getScript} = require('./controller.js')

app.use(express.json())

app.get('/', getHTML)
app.get('/styles', getStyles)
app.get('/js', getScript)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))