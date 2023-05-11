const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required: true
    },

    password:{
        type: String,
        required: true
    },


    firstname:{
        type:String,
        required: true
    },

    lastname:{
        type:String,
        required: true
    },

    fullname:{
        type: String,
        required: true
    },


    gender:{
        type:String,
        required: true
    },

    NIC:{
        type: String,
        required:true
    },

    date_of_birth:{
        type: String,
        required: true
    },

    place_of_birth:{
        type: String,
        required: true
    },

    age:{
        type: String,
        required: true
    },

    nationality:{
        type: String,
        required: true
    },

    religion:{
        type: String,
        required: true
    },

    department:{
        type: String,
        required: true
    },

    date_joined:{
        type: String,
        required: true
    },

    employee_type:{
        type: String,
        required: true
    },

    empID:{
        type: String,
        required: true
    },

    contact:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    address:{
        type: String,
        required: true
    },

    roles:[{
        type: String,
        default: "Employee"
    }],

    position:{
        type: String,
        required: true
    },
    active:{
        type: Boolean,
        default: true
    },


})


module.exports = mongoose.model('User', userSchema)