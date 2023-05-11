const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplyTransportSchema = new Schema({

    Emp_id: {
        type : String,
        required: true
    },

    Route_Name : {
        type : String,
        required: true
    },

    Vehicle_Type : {
        type : String,
        required: true
    },

    Emp_Contact_Number : {
        type : Number,
        required: true
    },

})

const ApplyTransportModel= mongoose.model('ApplyTransport', ApplyTransportSchema)

module.exports = ApplyTransportModel;