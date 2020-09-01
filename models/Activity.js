const mongoose = require('mongoose');


const activitySchema = new mongoose.Schema(
    {
        user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:user
            },

        place:{

            type:mongoose.Schema.Types.ObjectId,
            ref:place
        }    ,

        Date :{
            type:Date
        },

        endorsements:[{
            user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:user
            },
        ]
        }
            
    
    }
    
);

const Activity = mongoose.model('activity',activitySchema);

module.exports = Activity;