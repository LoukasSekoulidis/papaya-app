const express = require('express');
const router = express.Router();

const userModel = require('../user/UserModel')
const confirmationService = require('./ConfirmationService')

router.get('/:token', async (req, res) => {
  let token = req.url.split('/')[1];
  confirmationService.verifyUser(token, (err, user) => {
    if (user) {
      res.status(200).json(user);
    }
    else {
      res.status(404).json({ Error: err });
    }
  })
})

module.exports = router;