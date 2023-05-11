const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    forthepostof:{
        type:String,
        require:true
    },
    resumess:{
        type:String,
        required:true
    },
    match:{
        type:String,
        required:true
    },


},{
    timestamps:true,
});

const Resume = mongoose.model('Resume',ResumeSchema)
module.exports=Resume;