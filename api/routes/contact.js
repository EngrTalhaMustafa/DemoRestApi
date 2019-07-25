const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const mongoose = require('mongoose');
const authMiddleWare = require('../middlewares/checkauth');

router.get('/', authMiddleWare, (req, res, next) => {
    Contact.find()
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                contacts: docs.map(doc => {
                    return {
                        name: doc.name,
                        email: doc.email,
                        phone: doc.phone,
                    };
                }),
            }
            res.status(200).json(response);
        })
        .catch(e => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', authMiddleWare, (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    });
    contact.save()
        .then(result => {
            res.status(200).json({
                message: 'Contact Created Successfully!',
                createdContact: {
                    name: result.name,
                    email: result.email,
                    phone: result.phone,
                    _id: result._id
                }
            })
        })
        .catch(e => {
            console.log(err);
            res.status(500).json({
            error: err
            });
        })
});

router.patch('/:contactId', authMiddleWare, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops. value
    }
    Contact.update({_id:id},{$set:updateOps})
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Contact updated',
          updatedContact : result,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:contactId', authMiddleWare, (req, res, next) => {
    const id = req.params.contactId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Contact deleted',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;