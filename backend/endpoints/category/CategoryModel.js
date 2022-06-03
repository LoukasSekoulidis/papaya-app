var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: Number,
  noteID: { // = id der Note die diese Kategorie besitzt
    type: String,
    required: true
  },
  categoryTitle: {
    type: String,
    required: true
  }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;