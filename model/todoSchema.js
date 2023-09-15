const mongoose= require('mongoose')

const todoSchema = new mongoose.Schema({
    id:Number,
    name:String,
    isCompleted:Boolean
})

const Todo = mongoose.model("todolist", todoSchema)
module.exports = Todo