const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransportPaymentSchema = new Schema({

    Company: {
        type : String,
        required: true
    },

    Account_No: {
        type : Number,
        required: true
    },

    Date: {
        type : String,
        required: true
    },

    Distance : {
        type : Number,
        required: true
    },

    Total : {
        type : Number,
        required: true
    },

     
})

const TransportPaymentModel= mongoose.model('TransportPayment', TransportPaymentSchema)

module.exports = TransportPaymentModel;