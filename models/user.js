const mongoose = require('mongoose');
const Daily = require('./daily')
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const AccountUserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    income: {
        type: Number,
        required: true
    },
    saving: {
        type: Number,
    },
    password: {
        type: String,
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    data: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Daily'
        }
    ],
    properties: {
    }
});

AccountUserSchema.plugin(passportLocalMongoose);

AccountUserSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Daily.deleteMany({
            _id: {
                $in: doc.data
            }
        })
    }
})

module.exports = mongoose.model('AccountUser', AccountUserSchema);