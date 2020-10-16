const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({

    child_name: {
        type: String
    },
    child_age: {
        type: Number
    },
    child_contact: {
        type: Number
    },

    child_school:{
        type:String
    }
}
)

const Children = mongoose.model('Children',childrenSchema);

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
    },
    category: {
        type: String,
    },
    
    children: [
        childrenSchema      
    ],
    work: {
        type: String,
        required: true
    },
    contact: {
        type: Number
    },
    
    date: {
        type: Date,
        default: Date.now()

    },
    trustlevel:{
        type:String,
        default:'One'
    },
    available:{

        type:String,
        
    },
    picture:{
        type:String,
        
    },


})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;