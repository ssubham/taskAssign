const express = require('express')
const cors = require('cors');

// Database connection
const db = require('./db')
//Specific Routes....
const userRouter = require('./routes/user-routes');
const taskRouter = require('./routes/task-routes');


const app = express()
const apiPort = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

//mongodb://127.0.0.1:27017/?directConnection=true

// Connection Database.
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', userRouter); // Getting user Router.
app.use('/api', taskRouter); // Getting task Router.

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))