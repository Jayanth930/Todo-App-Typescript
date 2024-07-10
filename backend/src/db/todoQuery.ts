import { PrismaClient } from "@prisma/client";

//types
import { type Todo } from "../types";
import { UpdateDto } from "../dtos/todo";
const prisma = new PrismaClient()



export async function getTodos( substring? : string): Promise<Todo[]>{
    if(substring){
        console.log(substring)
        const todos = await prisma.todo.findMany({
            where : { name : { contains : substring } },
            orderBy : { createdAt : "asc" }
        })
        return todos
    }else{
        try {
            const todos : Todo[] = await prisma.todo.findMany({
                orderBy : { createdAt : "asc"}
            });
            return todos
        } catch (err) {
            throw new Error(err.message)
        }
    }
}


export async function createTodo(name : string) : Promise<Todo>{
    try {
        const todo = await prisma.todo.create({
            data : {
                name 
            }
        })
        return todo
    } catch (err) {
        new Error(err.message)
    }
}


export async function updateTodo({ id , newname} : UpdateDto) : Promise<Todo>{
    try {
       if(newname){
            const  newTodo = await prisma.todo.update({
                where : {
                    id 
                }  , 
                data : {
                    name : newname
                }
            })
            return newTodo
        }else{
            const oldTodo = await prisma.todo.findUnique({ where : { id }})
            const newTodo = await prisma.todo.update({ where : { id } , data : { completed : !oldTodo.completed}})
            return newTodo
        }
    } catch (err) {
        throw new Error(err.message)
    }
    
}


export async function getTodo(id : string):Promise<Todo>{
    try {
        const todo = await prisma.todo.findUnique({ where : { id }})
        return todo
    } catch (err) {
        throw new Error(err.message)
    }
}

export async function deleteTodo(id : string):Promise<Todo[]>{
    try {
        await prisma.todo.delete({
            where : { id }
        })
        const todos = await getTodos()
        return todos
    } catch (err) {
        throw new Error(err.message)    
    }
}