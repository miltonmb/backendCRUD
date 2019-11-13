const Category = require('../models').Category
const item = require('../models').item

module.exports = {
  // create 
  create(req, res) {
    return Category
      .create({
        name: req.body.name,
        userId: req.params.userId
      })
      .then(category => res.status(201).send(category))
      .catch(error => res.status(400).send(error))
  },

  // list All
  list(req, res) {
    return Category
      .findAll({
        where: {
          userId: req.params.userId
        },
        include: [{
          model: item,
          as: 'items'
        }]
      })
      .then(categories => res.status(200).send(categories))
      .catch(error => res.status(400).send(error))
  },

  // retrieve one
  retrieve(req, res) {
    return Category
      .find({
        where: {
          id: req.params.categoryId,
          userId: req.params.userId
        },
        include: [{
          model: item,
          as: 'items'
        }]
      })
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'category not found'
          })
        }
        return res.status(200).send(category)
      })
      .catch(error => res.status(400).send(error))
  },

  // update
  update(req, res) {
    return Category
      .find({
        where: {
          id: req.params.categoryId,
          userId: req.params.userId
        },
        include: [{
          model: item,
          as: 'items'
        }]
      })
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'category not found'
          })
        }
        return category
          .update({
            name: req.body.name || category.name
          })
          .then(() => res.status(200).send(category))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  // delete
  destroy(req, res) {
    return Category
      .find({
        where: {
          id: req.params.categoryId,
          userId: req.params.userId
        }
      })
      .then(category => {
        if (!category) {
          return res.status(400).send({
            message: 'Category not found'
          })
        }
        return category
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res, status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}
