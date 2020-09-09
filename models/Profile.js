const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: String,
    },
    location: {
        type: String
    },
    children: [{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'

        },
        
        name: {
            type: String
        },
        age: {
            type: Number
        },
        contact: {
            type: Number
        },
    
        school:{
            type:String
        }}
        
    ],
    work: {
        type: String,
        required: true
    },
    contact: {
        type: Number
    },
    photo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()

    },
    trustlevel:{
        type:String
    }


})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;