const mongoose = require("mongoose");


const ReportSchema = new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    report: {

        category: {
            type: String
        },
        text: {
            type: String,
        },


    },
    location: {

        type: Schema.Types.ObjectId,
        ref: 'places'
    },

    action: {

        invistigation: {
           
            etape: {
                type: String,

            },
            decision: {
                text: {
                    type: String,
                },

            }

        },
        alert: {

            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
            },
             message:{
                 type:String
             }
        }

    },

    date: {
        type: Date,
        default: Date.now()
    }
});

const Report = mongoose.model('report', ReportSchema);
module.exports = Report;