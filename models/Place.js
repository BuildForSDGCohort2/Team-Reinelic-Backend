const mongoose = require('mongoose');


const placeSchema = new mongoose.Schema({

    name: {
        type: String
    },
    category:{
        type:string
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
    contact:{
        type:Number
    }, 

    reviews:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    }]
})

const Place = mongoose.model('place', PlaceSchema);

module.exports = Place;