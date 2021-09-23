const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userdetails = schema(
    {
        name: {type:String, required: true},
        email: {type:String, required: true},
        password: {type: String, required: true},
        age:{type: Number},
        role:{type:String},
    },
    {timestamps:true}
)
module.exports = mongoose.model('userdetails', userdetails)