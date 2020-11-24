const { model, Schema } = require('mongoose');

const screenSchema = new Schema({
    createdAt: String,
    firstName: String,
    lastName: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    age: String,
    address: String,
    mobile: String,
    temp: String,
    travel: String,
    symptoms: String,
});

module.exports = model('Screen', screenSchema);