const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getAllTasks = async(req, res) => {
    try {
        const tasks =  await Task.find({});
        res.status(200).json({tasks:tasks});
        // res.status(200).json({
        //     status:"success",
        //     data: {
        //         tasks: tasks,
        //         noOfTasks: tasks.length,
        //     }
        // });
    } catch(error) {
        res.status(500).json({msg:error});
    }
    
}

//using asyncWrapper middleware:
// const getAllTasks = asyncWrapper(async (req, res) => {
//         const tasks = await Task.find({});
//         res.status(200).json({ tasks: tasks });
// })

const createTask = async(req, res) => {
    //.create expects an object, here passing req.body
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task:task });
    } catch(error) {
        res.status(500).json({msg:error})
        // res.status(500).json({msg:'Please provide name'})
    }
}

const getTask = async(req, res) => {
    try {
        const { id:taskID } = req.params;
        const singleTask = await Task.findOne({ _id: taskID })
        if(!singleTask) {
            return res.status(404).json({ msg: `Task with id ${taskID} not found`}) //err for replacing chars to same syntax
        }
        res.status(200).json({ task: singleTask })
    } catch(error) {
        res.status(500).json({msg:error}) //err for deleting or adding chars to ID
    }
    
}

const updateTask = async(req, res) => {
    try {
        const { id: taskID } = req.params;
        console.log(req.body);
        const singleTask = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
            new: true,//shows the updated/new task
            runValidators: true,//runs the schema validators
        })
        if (!singleTask) {
            return res.status(404).json({ msg: `Task with id ${taskID} not found` })
        }
        res.status(200).json({ task: singleTask })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const editTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        console.log(req.body);
        const singleTask = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
            new: true,//shows the updated/new task
            runValidators: true,//runs the schema validators
            overwrite:true //keeps what ever is passed in req.body and removes other props - diff b/w PUT n PATCH 
        })
        if (!singleTask) {
            return res.status(404).json({ msg: `Task with id ${taskID} not found` })
        }
        res.status(200).json({ task: singleTask })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async(req, res) => {
    try {
        const {id:taskID} = req.params;
        const singleTask = await Task.findOneAndDelete({_id:taskID});
        if(!singleTask) {
            return res.status(404).json({msg:`Task with id ${taskID} not found`})
        }
        res.status(200).json({task:singleTask});
        //other responses:
        //res.status(200).send() 
        //res.status(200).json({task:null, status:'success'})
    } catch(error) {
        res.status(500).json({msg:error});
    }
}

module.exports = {getAllTasks, createTask, getTask, updateTask, deleteTask, editTask}

//PUT - It will overwrite with what ever props sent in req.body
//PATCH  - It will only take those props which are changed in req.body and keep the default values as it is
