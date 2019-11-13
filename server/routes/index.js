const categoriesController = require('../controllers').categories
const usersController = require('../controllers').users
const itemsController = require('../controllers').items

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the expense API!'
  }))
  // user
  app.post('/api/users', usersController.create)
  app.get('/api/users/:userId', usersController.retrieve)
  app.post('/api/login', usersController.retrieveLogin)
  app.put('/api/users/:userId', usersController.update)
  app.delete('/api/users/:userId', usersController.destroy)
  
  // categories
  app.post('/api/users/:userId/categories', categoriesController.create)
  app.get('/api/users/:userId/categories', categoriesController.list)
  app.get('/api/users/:userId/categories/:categoryId', categoriesController.retrieve)
  app.put('/api/users/:userId/categories/:categoryId', categoriesController.update)
  app.delete('/api/users/:userId/categories/:categoryId', categoriesController.destroy)

  // items
  app.post('/api/categories/:categoryId/items', itemsController.create)
  app.put('/api/categories/:categoryId/items/:itemId', itemsController.update)
  app.delete('/api/categories/:categoryId/items/:itemId', itemsController.destroy)

  app.all('/api/users/:userId/categories/:categoryId/items', (req, res) => res.status(405).send({
    message: 'Method not allowed'
  }))
}
