var jwt = require("jsonwebtoken");
var config = require('config');

var userModel = require('../user/UserModel');

function createSessionTokenBasic(props, callback) {
  if (!props) {
    callback('Header Missing', null, null);
    return;
  };

  const base64Credentials = props.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [usermail, password] = credentials.split(':')

  userModel.findOne({ userMail: usermail }, function (err, user) {
    if (user) {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          callback(err, null);
        }
        else {
          if (isMatch) {
            var issuedAt = new Date().getTime();
            var expirationTime = config.get('session.timeout');
            var expiresAt = issuedAt + (expirationTime * 1000);
            var privateKey = config.get('session.tokenKey');
            var privateKey = config.get('session.tokenKey');
            let token = jwt.sign(
              {
                "userMail": user.userMail,
                "userName": user.userName,
                "isAdministrator": user.isAdministrator
              }, privateKey, { expiresIn: expiresAt, algorithm: 'HS256' });

            callback(null, token, user);
          }
          else {
            callback('Authentication failed', null, null);
          }
        }
      })
    }
    else {
      callback("Did not find user", null);
    }
  })
};

// Checks if User is Authenticated by verifying, or denying a given Token
function isAuthenticated(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];
    var privateKey = config.get('session.tokenKey');

    jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
      if (err) {
        res.status(401).json({ error: "Not Authorized!" });
        return;
      }
      req.userMail = user.userMail
      return next();
    });
  } else {
    res.status(400).json({ error: "Not Authorized: No token received!" });
    return;
  }
}

// --- Unused for now, do we have Admins ?  ---
// Checks if User is an Administrator 
function isAdministrator(req, res, next) {
  if (typeof req.headers.authorization !== "undefined") {
    let token = req.headers.authorization.split(" ")[1];
    tokenInfos = jwt.decode(token);
    userModel.findOne({ userMail: tokenInfos.userMail }, function (err, user) {
      if (user) {
        if (user.isAdministrator === true) {
          return next();
        }
        else {
          res.status(401).json({ error: "Not an administrator!" });
          return;
        }
      }
      else {
        res.status(500).json({ error: "Could not find a user with id: " + userID })
        return;
      }
    })
  } else {
    res.status(400).json({ error: "Not Authorized: No token received!" });
    return;
  }
}

module.exports = {
  createSessionTokenBasic,
  isAuthenticated,
}