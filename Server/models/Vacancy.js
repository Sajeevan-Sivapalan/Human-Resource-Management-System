const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VacanciesSchema = new Schema({
    jobtitle:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{
    type: String,
    required:true
}],
},{
    timestamps:true,
});

const Vacancy = mongoose.model('Vacancies',VacanciesSchema)
module.exports=Vacancy;