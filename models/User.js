const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    
    
    username: {
        type: String,
        require: true,
        min: 4,
        unique: true
    },
    email: {
        type: String,
        require: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 6,
    },
    profilepic: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false 
    },
    city: {
         type: String,
         max: 50 
    },
    homeTown: {
         type: String,
         max: 50 
    },
    relStat: {
        type: String,
        max: 50
    },
},
{timeStamps : true},
);
module.exports = mongoose.model("User", UserSchema);