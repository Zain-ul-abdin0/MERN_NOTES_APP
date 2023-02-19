const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors') 

//constants
require('dotenv/config');
const api = process.env.API_URL;
const notesRouter = require('../Backend/routes/notes');  
const usersRouter = require('../Backend/routes/user');  

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors())
app.options('*', cors())


//routes
app.use(`${api}/notes`, notesRouter);
app.use(`${api}/users`, usersRouter);

mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    dbName: 'mern'
}).then(()=>{
    console.log('Database connection is ready');
});
app.listen(3000,()=>{
    console.log('Listening to port 3000');
})