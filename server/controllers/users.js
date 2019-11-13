const User = require('../models').User
const Category = require('../models').Category

module.exports = {
  // create
  create(req, res) {
    return User
      .findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (user) {
          return res.status(400).send({
            message: 'User has been already created'
          })
        }
        console.log('llegue hasta aqui')
        return User
          .create({
            email: req.body.email,
            password: req.body.password
          })
          .then(user => res.status(201).send(user))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  // update
  update(req, res) {
    return User
      .findById(req.params.userId, {
        include: [{
          model: Category,
          as: 'categories'
        }]
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          })
        }
        return user
          .update({
            email: req.body.email || user.email,
            password: req.body.password || user.password
          })
          .then(updatedUser => res.status(200).send(updatedUser))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  // retrieve
  retrieve(req, res) {
    return User
      .findById(req.params.userId, {
        include: [{
          model: Category,
          as: 'categories'
        }]
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          })
        }
        return res.status(200).send(user)
      })
      .catch(error => res.status(400).send(error))
  },
  // login 
  retrieveLogin(req, res) {
    return User
      .find({
        where: {
          email: req.body.email,
          password: req.body.password
        },
        include: [{
          model: Category,
          as: 'categories'
        }]
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          })
        }
        return res.status(200).send(user)
      })
      .catch(error => res.status(400).send(error))
  },
  // delete
  destroy(req, res) {
    return User
      .findById(req.params.userId)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          })
        }
        return user
          .destroy()
          .then(() => res.status(404).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }

}
