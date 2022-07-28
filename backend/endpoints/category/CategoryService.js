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
        return callback('201', null);
    }

    const newCategory = new Category({
        categoryTitle: body.categoryTitle,
        color: body.color,
        ownerID: tokenInfos.userMail
    });
    newCategory.save(function (err, category) {
        if (err) {
            callback('202', null)
        } else {
            callback(null, category)
        }
    })
}

function updateCategory(categoryID, props, callback) {
    Category.findOne({ _id: categoryID }, function (err, category) {
        if (err) {
            return callback('203')
        }
        else if (!category) {
            return callback('203');
        }
        else {
            Object.assign(category, props);
            category.save((err) => {
                if (err) {
                    return callback('204', null);
                }
                else {
                    return callback(null, category);
                }
            })
        }
    })
}

function deleteCategory(categoryID, callback) {
    Category.findOneAndDelete({ _id: categoryID }, function (err, category) {
        if (err) {
            return callback('205', null)
        }
        else {
            return callback(null, category)
        }
    })
}

function getAllCategories(userMail, callback) {
    console.log('in get all cat ' + userMail)
    Category.find({ ownerID: userMail }, function (err, categories) {
        if (err) {
            return callback('206')
        } else {
            return callback(null, categories)
        }
    })
}

function getAllChildrenOf(categoryID, callback) {
    console.log(categoryID);
    Note.find({ categoryID: categoryID }, function (err, notes) {
        Category.find({ categoryTitle: categoryID }, function (err, category) {
            if (err) {
                return callback('207');
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

function getCategory(categoryID, callback) {
    console.log(categoryID);
    Category.findOne({ _id: categoryID }, function (err, category) {
        if (err) {
            return callback('208')
        } else {
            return callback(null, category)
        }
    }) 
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllChildrenOf,
    getAllCategories,
    getCategory
}