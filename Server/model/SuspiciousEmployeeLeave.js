const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuspiciousLeaveSchema = new Schema({
    empID: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    },
    enterTime: {
        type: String, 
        required: true
    },
    exitTime: {
        type: String, 
        //required: true
    },
    timeDifference: {
        type: String, 
        //required: true
    }
}, {
    collection: 'suspiciousLeave'
})

module.exports = mongoose.model('suspiciousLeave', SuspiciousLeaveSchema);