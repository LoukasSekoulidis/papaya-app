const User = require('./UserModel');
const userModel = require('./UserModel');

function getUsers(callback) {
  userModel.find((err, users) => {
    if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, users);
    }
  });
};

function getUser(userMail, callback) {
  userModel.findOne({ userMail: userMail }, (err, user) => {
    if (err) {
      return callback(err, null);
    }
    else if (!user) {
      return callback(`No User -- ${userMail} -- in Database`, null);
    }
    else {
      return callback(null, user);
    }
  });
};

function createUser(props, callback) {
  const newUser = new User({
    userMail: props.userMail,
    userName: props.userName,
    password: props.password,
    isAdministrator: props.isAdministrator
  });
  newUser.save((err, user) => {
    if (err && err.code === 11000) {
      return callback('Duplicate Key Error: User with given userMail already exists!', null);
    }
    else if (err && err.name === 'ValidationError') {
      return callback('Validation Error: Required attribute Missing: ' + err, null);
    }
    else if (err) {
      return callback(err, null);
    }
    else {
      return callback(null, user);
    }
  });
};

function updateUser(givenMail, props, callback) {
  userModel.findOne({ userMail: givenMail }, function (err, user) {
    if (err) {
      return callback(err)
    }
    else if (!user) {
      return callback(`Problem finding User: User with given userMail -- ${givenMail} -- does not exist!`);
    }
    else {
      Object.assign(user, props);
      user.save((err) => {
        if (err) {
          return callback('Problem saving User: ' + err, null);
        }
        else {
          return callback(null, user);
        }
      })
    }
  });
}

function deleteUser(givenMail, callback) {
  userModel.findOneAndDelete({ userMail: givenMail }, function (err, deletetUser) {
    if (err) {
      return callback(err);
    }
    else if (!deletetUser) {
      return callback('Error deleting User: No user in database with given userMail: ' + givenMail);
    }
    else {
      return callback(null, givenMail);
    }
  })
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

