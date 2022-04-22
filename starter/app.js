const express = require('express');
const app = express();
const taskRouter = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();

//static files
app.use(express.static('./public'))

//parse json
app.use(express.json());

//routes
app.use('/api/v1/tasks',taskRouter);
app.use(notFound);

//error-handler - to used only when u are using async middleware
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI) //1st connection of db 
        app.listen(port, () => { //2nd server is started
            console.log(`server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start();


//app.get('/api/v1/tasks') - get all tasks
//app.post('/api/v1/tasks') - create new task
//app.get('/api/v1/tasks/:id') - get single task
//app.patch('/api/v1/tasks/:id') - update single task
//app.delete('/api/v1/tasks/:id') - delete task