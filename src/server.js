const express = require('express')
const routes = require('./routes')

const cors = require('cors')

require('./database/index')

const app = express()

app.use(express.json())
app.use(cors)

app.use('/api', routes)

app.listen(3333)