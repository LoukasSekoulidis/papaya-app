const Category = require('./CategoryModel')
const Note = require('../note/NoteModel')
const jwt = require("jsonwebtoken");

function createCategory(props, callback) {
  body = props.body;
  header = props.headers;
  if (typeof header.authorization !== "undefined") {
    let token = header.authorization.split(" ")[1];
    tokenInfos = jwt.decode(token);
  }
  else {
    return callback('No token received, need ownerID', null);
  }
  const newCategory = new Category({
    categoryTitle: body.categoryTitle,
    ownerID: tokenInfos.userMail
  });
  newCategory.save(function (err, category) {
    if (err) {
      callback(err, null)
    } else {
      console.log('New category created!')
      callback(null, category)
    }
  })
}

function updateCategory(categoryID, props, callback) {
  Category.findOne({ categoryTitle: categoryID }, function (err, category) {
    if (err) {
      return callback(err)
    }
    else if (!category) {
      return callback(`Category with categoryID: ${categoryID}, does not exist!`);
    }
    else {
      Object.assign(category, props);
      category.save((err) => {
        if (err) {
          return callback(err, null);
        }
        else {
          return callback(null, category);
        }
      })
    }
  })
}

function deleteCategory(categoryID, callback) {
  Category.findOneAndDelete({ categoryTitle: categoryID }, function (err, category) {
    if (err) {
      console.log('Category nicht gelöscht.' + err)
      return callback(err, null)
    }
    else {
      console.log('Notiz gelöscht.')
      return callback(null, category)
    }
  })
}

function getAllChildrenOf(categoryID, callback) {
  console.log(categoryID);
  Note.find({ categoryID: categoryID }, function (err, notes) {
    Category.find({ categoryTitle: categoryID }, function (err, category) {
      if (err) {
        return callback('No Category found: ' + categoryID);
      }
      else {
        if (err) {
          return callback(err.message, null);
        }
        else {
          return callback(null, notes);
        }
      }
    })
  })
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllChildrenOf
}