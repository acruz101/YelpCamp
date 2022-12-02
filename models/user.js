const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    // username and password are hidden by passportLocalMongoose
});

UserSchema.plugin(passportLocalMongoose); // adds username and password and more

module.exports = mongoose.model('User', UserSchema);
