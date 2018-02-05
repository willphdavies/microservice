'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/models.user');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/:id?', (req, res, next) => {

  User.get(req.params.id)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      });
    });

});
router.post('/', (req, res, next) => {

  User.save(req.body)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      });
    });

});

router.delete('/:id', (req, res, next) => {

  User.deleteUser(req.params.id)
    .then(data => {
      res.status(200).json({
        status: 'success',
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      });
    });

});

router.get('/merge/:user1/:user2',(req,res,next) => {
  User.merge(req.params.user1,req.params.user2)
    .then((data) => {
      res.status(200).json({
        status: 'success',
        data: data[0]
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 'error',
        message: err
      });
    });
});

module.exports = router;
