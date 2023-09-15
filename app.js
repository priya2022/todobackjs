const express = require('express')
const app = express()
const dotenv= require('dotenv').config()
const port =process.env.PORT || 8200
const controller = require('./controller/todoController')
const cors = require("cors")
const db = require('./db')
app.use(cors())


app.use('/data/api', controller)



app.listen(port,()=>{
    console.log(`App is listening on the port : ${port}`)
})