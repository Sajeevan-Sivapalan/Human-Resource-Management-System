const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resourceSchema = new Schema({
    /*_id:{
        type: Number,
        required:true,
        unique: true,
    },*/
    
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
    },
    quantity:{
        type: Number,
        required:true
    },
    invoiceNo:{
        type: String,
        required:true,
        unique: true,
    },
    supplierName:{
        type: String,
        required:true
    },
    orderedDate:{
        type: String,
        required:true
    },
    imageURL:{
        type: String,
        
    },

    employeesAssigned:[{
        type: String     
    }]

},{
    timestamps: true,
})

module.exports = mongoose.model('Resource',resourceSchema)