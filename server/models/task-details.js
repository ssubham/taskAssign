const mongoose = require('mongoose');

const schema = mongoose.Schema;

const taskdetails = schema(
    {
        name: {type:String, required: true},
        assignedto: {type:String, required: true},
        username:{type:String, required:true}
    },
    {timestamps:true}
)
module.exports = mongoose.model('taskDetails', taskdetails)