const express = require('express')
const routes = express.Router()

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

const authMiddlewares = require('./app/middlewares/auth')

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

routes.use(authMiddlewares)


routes.get('/users', UserController.index)
routes.get('/user/:id', UserController.show)
routes.put('/user/:id', UserController.update)
routes.delete('/user', UserController.delete)



module.exports = routes