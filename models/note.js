const mongoose = require('mongoose')
const {Schema} = mongoose;

const noteSchema = new Schema({
    content: {type: String, required: true},
    create_time: {type: Date, default: Date.now},
    creator: String,
    tags: Array,
    last_edit: Date
})

module.exports = mongoose.model('Note', noteSchema);