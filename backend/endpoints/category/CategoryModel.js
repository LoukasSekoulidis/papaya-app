var mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    id: Number,
    categoryTitle: {
        type: String,
        required: true,
    },
    ownerID: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#FAFAFA'
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;