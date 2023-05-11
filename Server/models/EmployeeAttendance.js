const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceSchema = new Schema({
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
        type: String
    },
    timeDifference: {
        type: String
    }
}, {
    collection: 'employeeAttendance'
})

module.exports = mongoose.model('employeeAttendance', AttendanceSchema);