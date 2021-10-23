const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    nickname: String,
    role: {
        type: String,
        default: 'free',
        enum: ['free', 'premium', 'student_premium']
    }
})

module.exports = mongoose.model('User', userSchema);