const express = require('express');
const router = express.Router();
const {getAllTasks, createTask, getTask, updateTask, deleteTask,editTask} = require('../controllers/tasks')

router.get('/',getAllTasks)
router.post('/',createTask)
router.get('/:id',getTask)
router.patch('/:id',updateTask)
router.delete('/:id',deleteTask)
router.put('/:id',editTask)

module.exports = router;

//REST API - Representational State Transfer
//JSON is a common way to send n receive data
//CRUD - Create Read Update Delete
//MongoDB
//NoSql, Non Relational DB
//Store JSON instead of rows n columns like in other DBs
//Free cloud hosting - ATLAS


