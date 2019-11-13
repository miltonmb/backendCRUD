const item = require('../models').item

module.exports = {
  // create
  create(req, res) {
    return item
      .create({
        content: req.body.content,
        price: req.body.price,
        categoryId: req.params.categoryId

      })
      .then(item => res.status(201).send(item))
      .catch(error => res.status(400).send(error))
  },
  // update
  update(req, res) {
    return item
      .find({
        where: {
          id: req.params.itemId,
          categoryId: req.params.categoryId
        }
      })
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: 'Item not found'
          })
        }
        return item
          .update({
            content: req.body.content || item.content,
            price: req.body.price || item.price
          })
          .then(updatedItem => res.status(200).send(updatedItem))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  },

  // destroy
  destroy(req, res) {
    return item
      .find({
        where: {
          id: req.params.itemId,
          categoryId: req.params.categoryId
        }
      })
      .then(item => {
        if (!item) {
          return res.status(404).send({
            message: 'Item not found'
          })
        }
        return item
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }

}
