const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RouteSchema = new Schema({
    Route_Name : {
        type : String,
        required: true,
    },

    Vehicle_Type : {
        type : String,
        required: true,
    },

    Vehicle_No : {
        type : String,
        required: true,
         
    },

     Arrival_Time : {
        type : String,
        required: true
    },

    Starting_Point : {
        type : String,
        required: true
    },

    Ending_Point : {
        type : String,
        required: true
    },

     Distance : {
        type: Number,
        required: true
     },
     

})

const RouteModel= mongoose.model('Route', RouteSchema)

module.exports = RouteModel;