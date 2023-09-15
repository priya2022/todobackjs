const express = require("express")
const router = express.Router();
const config = require('../config')

const bodyParser =require("body-parser")
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
const Todo = require('../model/todoSchema')
const { ObjectId } = require('mongoose').Types;
router.use(express.json())



router.get("/",(req,res)=>{
    res.send("Welcome Kanmani")
})

//Getting Every todo - we use - find()

router.get('/todos',(req,res)=>{
    Todo.find()
    .then((todos) => {
      console.log('All todo items:');
      console.log(todos);
      res.json(todos);
    })
    .catch((error) => {
      console.error('Error while retrieving todos:', error);
    });
})


//Creating a new Todo

router.post('/newTodo', async(req,res)=>{
    try{
        const newTodo=new Todo({
            id:req.body.id,
            name:req.body.name,
            isCompleted:req.body.isCompleted
        })
        await newTodo.save()
        res.status(200).send("New Todos was added successfully")

    }
    catch(err){
        console.log(err)
            res.status(500).send("Error while Creating newTodos")
    }
})



//Deleting a new Todo 

router.delete('/delete/:id',async(req,res)=>{
    try{
        const { id } = req.params;

        // Ensure 'id' is a valid ObjectId
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid ID format' });
        }
    
        // Use 'findByIdAndRemove' to delete the document by its '_id'
        const deletedTodo = await Todo.findOneAndRemove({ _id: id });
       
        if (!deletedTodo) {
            // If the todo with the given ID does not exist
            return res.status(404).json({ message: 'Todo not found' });
          }
      
          res.status(200).json({ message: 'Todo was successfully deleted' });
    }
    catch(error){
        console.error("error",error)
        res.status(500).json({message:'Server Error'})
    }
})



router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { isCompleted } = req.body;
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
  
      // Use 'findByIdAndRemove' to delete the document by its '_id'
      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id },
        { isCompleted },
        { new: true }
        );
      // Ensure 'id' is a valid number

      if (!updatedTodo) {
        return res.status(404).json({ error: 'Data was not found' });
      }
  
      return res.status(200).json('Updated successfully');
    } catch (error) {
      console.error('Updation Error', error);
      return res.status(500).json({ Error: 'Internal Server Error' });
    }
  });


  


module.exports = router

 //   const {id} = req.params

        // if (isNaN(id)) {
        //     return res.status(400).json({ error: 'Invalid ID format' });
        //   }
        // const Delete = await Todo.findOneAndRemove({ id: parseInt(id) });