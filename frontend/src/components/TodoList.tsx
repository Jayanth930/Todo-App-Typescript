import EmptyList from "./EmptlyList"
import TodoJSX from "./TodoJSX"
//types
import { Todo, ModelParams } from "../types"

interface Props{
    modelParams : ModelParams ,
    setModelParams : React.Dispatch<React.SetStateAction<ModelParams>> ,
    todos : Todo[] ,
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList : React.FC<Props> = ({ modelParams , setModelParams ,todos , setTodos})=>{
   
    
    return (
        <ul>
            {
                todos.length == 0 ? <EmptyList /> : todos.map((todo: Todo)=>{
                    return <li  key={todo.id}  style={{listStyle: "none" , padding : "10px"}}><TodoJSX modelParams={modelParams} setModelParams={setModelParams} todo={todo} setTodos={setTodos} /></li>
                })
            }
        </ul>
        
    )
}

export default TodoList