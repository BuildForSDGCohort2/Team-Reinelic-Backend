
const mongoose = require("mongoose");

const investigationSchema = new mongoose.Schema({
    committe :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    status:{
        type:String
    },
    decision:{
      type:String
    },


})

const Investigation =  mongoose.model('Investigation', investigationSchema);


const ReportSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    report_type: {
        type: String
    },
    description: {
        type: String,
    },
    witness: {
        type: String,
    },
    location:{
        type:String,
    },

    investigation: [ ]
});


const Report = mongoose.model('Report', ReportSchema);

module.exports ={ Report,Investigation};

