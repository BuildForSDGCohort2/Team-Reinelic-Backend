const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({

    name: {
        type: String
    },
    category: {
        type: String
    },
    badge: {
        type: String
    },
    address: {
        type: String
    },
    photo: {

        type: String,
    },
    contact: {
        type: Number
    },

    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
         
        review_text :{
            type:String
        }
        
    }]
})

const Place = mongoose.model('place', placeSchema);

module.exports = Place;