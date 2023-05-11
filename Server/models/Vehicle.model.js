const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({

    Vehicle_No : {
        type : String,
        required: true
    },

    Vehicle_Type : {
        type : String,
        required: true
    },

    Driver_Name : {
        type : String,
        required: true
    },

    Driver_Contact_No : {
        type : Number,
        required: true
    },

    Driver_Nic : {
        type : String,
        required: true
    },

    Company : {
        type : String,
        required: true
    },

    No_Of_Seats : {
        type : Number,
        required: true
    },

})

const VehicleModel= mongoose.model('Vehicle', VehicleSchema)

module.exports = VehicleModel;