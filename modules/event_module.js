const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    day:Date,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Event', eventSchema)