const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailySchema = new Schema({
    date: {
        type: String
    },
    bonus: {
        type: Number
    },
    expenditure: {
        type: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'AccountUser'
    }
});

module.exports = mongoose.model("Daily", dailySchema);