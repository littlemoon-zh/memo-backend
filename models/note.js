const mongoose = require('mongoose')
const {Schema} = mongoose;

const noteSchema = new Schema({
    content: {type: String, required: true},
    create_time: Date,
    creator: String,
    tag: Array,
    last_edit: Date
})

module.exports = mongoose.model('Note', noteSchema);