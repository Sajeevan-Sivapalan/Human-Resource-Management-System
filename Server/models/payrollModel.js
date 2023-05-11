const mongoose = require('mongoose')

const payrollSchema = mongoose.Schema(
    {   
        // ID: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'User',
        //     unique: true,
        // },   
        username: {
            type: String, 
            required: true
        },
        Name: {
            type: String,
            required: true,
            unique: true,
        },
        eid: {
            type: String,
            required: true,
            unique: true,
        },
        department: {
            type: String,
            required: true
        },
        position:{
            type:String,
            required:true,
        },
        mealAllowance:{
            type:Number,
            required:true
        },
        travelAllowance:{
            type:Number,
            required:true
        },
        otHours: {
            type: Number,
            required: false
        },
        otPaid: {
            type: Number,
            required: false
        },
        Salary: {
            type: Number,
            required: true
        },
        taxes:{
            type:Number,
        },
        epf:{
            type:Number,
            required:true
        },
        deductions:{
            type:Number,
            required:true
        },
        BaseSalary:{
            type:Number,
            required:true

        },
        bonus:{
            type:Number,
            required:false
        }
        // isDeleted:{
        //     type:Boolean,
        //     required:false,
        //     default:false
        // }
    })

module.exports = mongoose.model('payrolls', payrollSchema)