const express = require('express');
const router = express.Router();

const userService = require('./UserService')
const authenticationService = require('../authentication/AuthenticationService')

router.get('/', authenticationService.isAuthenticated, (req, res, next) => {
  userService.getUsers((err, users) => {
    if (users) {
      res.status(200).json(users);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

router.get('/:userName', authenticationService.isAuthenticated, (req, res, next) => {
  const userName = req.url.split('/')[1]
  userService.getUser(userName, (err, user) => {
    if (user) {
      res.status(200).json(user);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

router.post('/create', (req, res, next) => {
  console.log('In Post!')
  userService.createUser(req.body, (err, postedUser) => {
    if (postedUser) {
      res.status(201).json(postedUser);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

router.put('/update/:userName', authenticationService.isAuthenticated, (req, res, next) => {
  userService.updateUser(req.url.split('/')[2], req.body, (err, updatedUser) => {
    if (updatedUser) {
      res.status(200).json(updatedUser);
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

router.delete('/delete/:userName', authenticationService.isAuthenticated, (req, res, next) => {
  userService.deleteUser(req.url.split('/')[2], (err, deletedUser) => {
    if (deletedUser) {
      res.status(200).json({ Deleted: deletedUser });
    }
    else {
      res.status(404).json({ Error: err });
    }
  });
});

module.exports = router;