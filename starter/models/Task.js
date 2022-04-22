const mongoose = require('mongoose')

//schema is structure for all documents in our collections
const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        trim:true,//removes unwanted spaces
        maxlength:[20,'name cannot be more than 20 characters']
    },
    completed:{
        type:Boolean,
        default:false//by def, task is not completed
    }
    //only those props u set in scheme will be sent to database, others are ignored
})

//Model is a wrapper for schema - provides an interface
module.exports = mongoose.model('Task',TaskSchema)