const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    gender : String,
    dateOfBirth : String,
    about : {
        type : String,
        trim : true,
    },
    contactNumber : {
        type : String,
        trim : true,
    }
})

const Profile = mongoose.model('Profile',ProfileSchema);

module.exports.Profile = Profile;