const express = require('express');
const cors = require('cors');
const DbConnection = require('./config/db');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json())
app.use('/user',userRouter)
app.use('/notes',noteRouter)


app.get('/',(req, res)=>{
    res.send("welcome");
})

app.listen(port, ()=>{
    DbConnection(process.env.DB_URL)
    console.log("server is running on port",port);
})