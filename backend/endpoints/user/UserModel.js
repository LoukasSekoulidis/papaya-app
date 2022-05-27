var mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
  userMail: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdministrator: {
    type: Boolean,
    default: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmationCode:{
    type: String
  }
})

// PW hashen beim User anlegen
userSchema.pre('save', function (next) {
  var user = this;
  console.log('Pre-save: ' + this.password + ' change: ' + this.isModified('password'))

  if (!user.isModified('password')) {
    return next();
  }
  bcryptjs.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
},
  function (err) {
    next(err);
  }
)

// PW nach Änderung wieder hashen
userSchema.pre('updateOne', function (next) {
  var user = this._update

  if (!user.password) {
    return next()
  }
  bcryptjs.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  });
},
  function (err) {
    next(err);
  }
)

userSchema.methods.comparePassword = function (candidatePassword, next) {
  console.log(JSON.stringify({
    input: candidatePassword,
    password: this.password
  }))
  bcryptjs.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
}

const User = mongoose.model("User", userSchema);
module.exports = User;