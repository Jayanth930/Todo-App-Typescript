import express from "express"
import { type Request , type Response } from "express-serve-static-core"
import { getTodos , createTodo , updateTodo , getTodo , deleteTodo } from "../db/todoQuery"
//types 
import { TodoDto , UpdateDto } from "../dtos/todo"
import { type Todo } from "../types"
const router = express.Router()


interface successResponse{
    responseCode : 1 
    message : string
    data : Todo[] | Todo
}

interface failureResponse {
    responseCode : 0 ,
    message : string
}

//Get all Todos
router.get("/",async (req : Request,res : Response<successResponse | failureResponse>)=>{
     try {
        const todos = await getTodos()
        const success : successResponse  = {
            responseCode : 1 ,
            data : todos ,
            message : "Successfully fetched todos"
        }
        res.status(200).json(success)
     } catch (error) {
        const failure : failureResponse =  {
            responseCode : 0 ,
            message : "Error in fetching todos"
        }
        res.status(500).json(failure)
     }   
})

//get Todo based on id 
router.get("/:id",async (req : Request<{id : string}> , res : Response<successResponse | failureResponse>)=>{
    const { id } = req.params
    try {
        const todo = await getTodo(id)
        const success : successResponse = {
            responseCode : 1 ,
            message : "Successfully fetched todo based on id",
            data : todo
        }
        res.status(200).json(success)
    } catch (err) {
        const failure : failureResponse = {
            responseCode : 0 , 
            message : `Error in fetching todo ${err.message}`
        }
        res.status(500).json(failure)
    }
})

//get Todos based on name 
router.get("/name/:substring",async (req : Request<{substring : string}> , res : Response<successResponse | failureResponse>)=>{
    const { substring } = req.params
    try {
        const todos = await getTodos(substring)
        const success : successResponse = {
            responseCode : 1 ,
            message : "Successfully fetched todo based on substring",
            data : todos
        }
        res.status(200).json(success)
    } catch (err) {
        const failure : failureResponse = {
            responseCode : 0 , 
            message : `Error in fetching todos ${err.message}`
        }
        res.status(500).json(failure)
    }
})


// Post a todo
router.post('/',async (req : Request<{},{},TodoDto> , res : Response<successResponse | failureResponse>)=>{
    const name = req.body.name
    try {
        const newTodo = await createTodo(name)
        const success : successResponse = {
            responseCode : 1 ,
            message : "Successfully created Todo",
            data : newTodo
        }
        res.status(201).json(success)
    } catch (err) {
        const failure : failureResponse = {
            responseCode : 0 ,
            message : "Error in creating newTodo"
        } 
    }
})

//Update a todo
router.put("/",async (req:Request<{},{},UpdateDto> , res : Response<successResponse | failureResponse>)=>{
    const data = req.body
   try {
        const newTodo  = await updateTodo(data)
        const success: successResponse = {
            responseCode : 1 ,
            message : "Successfully updated todo",
            data : newTodo
        }
        res.status(200).json(success)
    } catch (err) {
        const failure : failureResponse = {
            responseCode : 0 ,
            message : "Error in updating the todo"
        }
        res.status(500).json(failure)
    }
})

router.delete("/:id",async (req:Request<{ id : string}>,res : Response<successResponse | failureResponse>)=>{
    const { id } = req.params
    try {
        const remainingTodos = await deleteTodo(id)
        const success : successResponse = {
            responseCode : 1 ,
            message : "Successfully deleted Todo",
            data : remainingTodos
        }
        res.status(200).json(success)
    } catch (err) {
        const failure : failureResponse = {
            responseCode : 0 ,
            message : `Error in deleting todo ${err.message}`
        }
        res.status(500).json(failure)
    }

})

export default router