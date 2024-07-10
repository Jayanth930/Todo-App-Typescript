import { useEffect, useState } from "react"
import styles from "../modules/App.module.css"
import axios from "axios"
//types
import { ModelParams, Todo, UpdateDto, failureResponse, isSuccess, successResponse } from "../types"
interface Props {
    modelParams : ModelParams
    setModelParams : React.Dispatch<React.SetStateAction<ModelParams>>
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>
}


export default function Modal( { modelParams , setModelParams  , setTodos} : Props){
    const [name , setName] = useState<string>("")
    const [error , setError] = useState<string>("")
    function handleClick1(){
        setModelParams({
            id : null ,
            show : false
        })
    }

    async function handleClick2(){
        if(modelParams.id){
            //Make a put request to update data
            try {
                const { data } = await axios.put<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}` , {
                    id : modelParams.id , 
                    newname : name
                } as UpdateDto)
                if(isSuccess(data)){
                    setModelParams({ id : null , show : false})
                    //Fetch all todo and pass to setTodos 
                }else{
                    setError("Error in updating todo")
                }
            } catch (error) {
                setError("Server Error : Error  in updating todo")
            }
        }else{
            //Make a post request to add data 
            try {
                const { data }= await axios.post<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}`,{
                    name
                })
                if(!isSuccess(data)){
                    setError("Error in creating todo")
                }
            } catch (err) {
                setError("Server error : Error in creating todo")
            }
        }
        try {
            const { data } = await axios.get<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}`)
            if(isSuccess(data)){
                setTodos(data.data as Todo[])
            }
        } catch (err) {   
            setError("Server Error : Error occured in fetching todos")
        }
        setModelParams({
            id : null,
            show : false
        })
    }
    useEffect(()=>{
        if(modelParams.id){
            // This is coming from edit Todo so Fetch that todo based on Id
            axios.get<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}/${modelParams.id}`).then(({data})=>{
                if(isSuccess(data)){
                    const todo = data.data as Todo
                    setName(todo.name)
                }
            })
        }

    },[])
    return (
        <div className={styles.modalwrapper} >
            <div className={styles.modal}>
                <div className={styles.modalheader}>
                    <h2 style={{marginBottom : "25px"}} >NEW NOTE</h2>
                    <input  type="text" name="Todo" placeholder="New Todo" value={name} onChange={(e)=>setName(e.target.value)} className={styles.modalsearchbar} />
                </div>
                <div className={styles.modalbody} ></div>
                <div className={styles.modalfooter} >
                    <button className={styles.button3} onClick={handleClick1} >CANCEL</button>
                    <button className={styles.button3} onClick={handleClick2}  >APPLY</button>
                    {error!= "" ? <p>Error message : {error}</p>: null}
                </div>
            </div>
        </div>
    )
}