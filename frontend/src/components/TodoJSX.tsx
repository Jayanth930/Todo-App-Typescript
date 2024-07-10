import styles from "../modules/TodoJSX.module.css"
import { useState } from "react"
import axios from "axios"
import { isSuccess } from "../types"
//types
import { failureResponse, successResponse, Todo, UpdateDto , ModelParams } from "../types"

interface Props{
    todo : Todo ,
    modelParams : ModelParams ,
    setModelParams : React.Dispatch<React.SetStateAction<ModelParams>> ,
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TododJSX( { todo  , setModelParams , setTodos } : Props){
    const [completed , setCompleted] = useState<boolean>(todo.completed)
    async function handleChange1(){
      // submit to database and setTodos 
      try {
        const { data } = await axios.put<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}`,{
          id : todo.id
        } as UpdateDto) 
         if(isSuccess(data)){
            const updatedTodo = data.data as Todo
            setCompleted(updatedTodo.completed)
         }
      } catch (err) {
        console.log(`Error in updated todo`)
      }
      
    }

    async function handleClick(){
        try {
          const { data } = await axios.delete<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}/${todo.id}`)
          if(isSuccess(data)){
            setTodos(data.data as Todo[])
          }
        } catch (err) {
          console.log(`Error in deleting Todo`)
        }
    }

    return (
       <div className={styles.todo} style={completed ? {opacity : 0.6} : {}} >
         <input type="checkbox" checked={completed}  className={styles.checkbox} onChange={handleChange1}  /> 
         <p style={completed ? {textDecoration : "line-through", color : "#efebeb"} : {color : "#efebeb"}} >{todo.name}</p>
         <div style={{marginLeft : "auto"}}>
            <button className={styles.button} onClick={()=>setModelParams({ id : todo.id , show : true })} >Edit button</button>
            <button className={styles.button} onClick={handleClick}>Delete</button>
         </div>
       </div>
    )
}