const config = require('config');
var jwt = require("jsonwebtoken");

const userModel = require('../user/UserModel')

function verifyUser(confirmationCode, callback) {
  userModel.findOne({ confirmationCode: confirmationCode }, (err, user) => {
    if (user) {
      user.confirmed = true
      user.save((err) => {
        if (err) {
          callback('Could not save user after confirming eMail');
        }
        else {
          var filteredUser = { userName: user.userName };
          callback(null, filteredUser)
        }
      })
    }
    else {
      callback('Could not find user with confirmationCode: ' + confirmationCode);
    }
  })
}

function isVerified(req, res, next) {
  console.log('Check if verified')

  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [usermail, password] = credentials.split(':')
  console.log(usermail)
  if (usermail !== null) {
    userModel.findOne({ userMail: usermail }, (err, user) => {
      if (err) {
        res.status(404).json({ Error: 'Could not find user: ' + tokenInfos.userID })
        return;
      }
      else {
        if (user.confirmed == true) {
          return next();
        }
        else {
          res.status(400).json({ Error: 'User is not verified' });
        }
      }
    })
  } else {
    res.status(400).json({ Error: '"Validation failed: No token received!"' })
  }
}

module.exports = {
  verifyUser,
  isVerified,
}