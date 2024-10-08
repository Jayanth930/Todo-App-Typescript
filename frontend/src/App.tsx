import styles from  "./modules/App.module.css"
import TodoList from "./components/TodoList"
import Modal from "./components/Modal"
import { useEffect, useRef, useState } from "react"
import axios, { type AxiosResponse } from "axios"
//types
import { ModelParams , successResponse , failureResponse , Todo , isSuccess } from "./types"

const App : React.FC<{}> = ()=>{
   const [todos , setTodos ] = useState<Todo[]>([])
   const [modelParams , setModelParams ] = useState<ModelParams>({id : null , show : false})
   const inputRef = useRef<HTMLInputElement>(null);
   useEffect(()=>{
        axios.get<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}`)
        .then((response)=>{
            if(isSuccess(response.data)){
               setTodos(response.data.data as Todo[])
            }else{
                setTodos([])
            }
        }).
        catch((err)=>console.log(`Error in fetching Todos ${err.message}`))
       
        // Get todos from database
    },[])
  
  function handleClick(){
     setModelParams((prev)=>{
       return {
        id : null , show : !prev.show
       }
     })
  }

  async function handleChange(){
    const substring = inputRef.current?.value 
    // console.log(substring)
    if(substring){ 
      try {
        const { data } = await axios.get<{}, AxiosResponse<successResponse | failureResponse>>(`${import.meta.env.VITE_APP_BACKEND_URL}/name/${substring.toLowerCase()}`)
        if(isSuccess(data)){
          setTodos(data.data as Todo[])
        }
        
      } catch (err) {
        console.log("Error in updating Todos")
      }
    }else{
      try {
        const { data } = await axios.get<successResponse | failureResponse>(`${import.meta.env.VITE_APP_BACKEND_URL}`)
        if(isSuccess(data)){
          setTodos(data.data as Todo[])
        }
      } catch (err) {
        console.log("Error in fetching Todos")
      }
    }
  }

  return(
    <div className={styles.container}>
      <div  className={styles.header}>
        <p className={styles.heading}>Todo List</p>
        <form className={styles.headerSearch}>
            <div style={{display:"flex" ,  position : "relative"}}>
              <input type="text" name="Todo" placeholder="Search Todo" ref={inputRef} onChange={handleChange}  className={styles.searchbar} />
              <div className={styles.searchicon} >
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                  <path d="M20.7773 20.184L15.9056 15.312H15.8531C17.3547 13.5415 18.1136 11.2588 17.9709 8.94156C17.8282 6.62433 16.7951 4.45202 15.0876 2.87905C13.3801 1.30608 11.1306 0.454303 8.80958 0.501892C6.48855 0.549481 4.27583 1.49275 2.63427 3.13439C0.992706 4.77602 0.0494786 6.98885 0.00189181 9.30999C-0.045695 11.6311 0.806045 13.8808 2.37894 15.5883C3.95184 17.2958 6.12404 18.329 8.44117 18.4717C10.7583 18.6144 13.0408 17.8555 14.8113 16.3539C14.8113 16.3539 14.8113 16.3914 14.8113 16.4063L19.6831 21.2783C19.7527 21.3485 19.8356 21.4043 19.927 21.4424C20.0183 21.4804 20.1163 21.5 20.2152 21.5C20.3141 21.5 20.4121 21.4804 20.5034 21.4424C20.5948 21.4043 20.6777 21.3485 20.7473 21.2783C20.8242 21.2103 20.8862 21.1272 20.9296 21.0342C20.9731 20.9412 20.9969 20.8402 20.9997 20.7376C21.0025 20.635 20.9842 20.533 20.946 20.4377C20.9077 20.3425 20.8503 20.2561 20.7773 20.184ZM9.00276 16.9685C7.5204 16.9685 6.07133 16.5289 4.83879 15.7053C3.60625 14.8817 2.64561 13.7111 2.07833 12.3415C1.51106 10.9719 1.36263 9.46488 1.65183 8.01094C1.94102 6.55699 2.65485 5.22146 3.70303 4.17322C4.75122 3.12499 6.08669 2.41113 7.54057 2.12192C8.99445 1.83272 10.5014 1.98115 11.871 2.54845C13.2405 3.11575 14.411 4.07644 15.2346 5.30904C16.0581 6.54163 16.4977 7.99077 16.4977 9.4732C16.4977 10.4575 16.3038 11.4322 15.9272 12.3415C15.5505 13.2509 14.9985 14.0772 14.3025 14.7732C13.6065 15.4692 12.7803 16.0213 11.871 16.3979C10.9616 16.7746 9.98701 16.9685 9.00276 16.9685Z" fill="#6C63FF"/>
                </svg>
              </div>
            </div>
              {/* <div className={styles.button} >
                All
                <div  style={{paddingTop: "30px"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 15 15" fill="none"><path d="M4 4L1 1" stroke="#F7F7F7" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 1L4 4" stroke="#F7F7F7" strokeLinecap="round"   strokeLinejoin="round"/></svg>
              </div> 
              </div> */}
              <button className={`${styles.button1} `} ><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M11.1249 0.548798C11.3387 0.917354 11.321 1.3762 11.0791 1.72705C10.3455 2.79152 9.91599 4.08062 9.91599 5.47334C9.91599 9.12428 12.8757 12.084 16.5266 12.084C17.9194 12.084 19.2085 11.6545 20.2729 10.9208C20.6238 10.6791 21.0826 10.6613 21.4512 10.8751C21.8197 11.089 22.0319 11.4962 21.9961 11.9208C21.5191 17.567 16.7867 22 11.0178 22C4.93282 22 0 17.0672 0 10.9822C0 5.21328 4.43301 0.480873 10.0792 0.00392422C10.5038 -0.0319387 10.911 0.180242 11.1249 0.548798ZM8.17985 2.63461C4.70452 3.81573 2.20355 7.10732 2.20355 10.9822C2.20355 15.8502 6.14981 19.7964 11.0178 19.7964C14.8927 19.7964 18.1843 17.2955 19.3654 13.8202C18.4741 14.1232 17.5191 14.2875 16.5266 14.2875C11.6587 14.2875 7.71244 10.3413 7.71244 5.47334C7.71244 4.48086 7.87682 3.52582 8.17985 2.63461Z" fill="#F7F7F7"/></svg></button>
          </form>
      </div>
      <div className={styles.body}>
        <TodoList modelParams={modelParams}  setModelParams={setModelParams}  setTodos={setTodos}  todos = {todos}/>
      </div>
         {/* {This is the add Todo button} */}
         <button className={`${styles.button1} ${styles.addbutton}`} onClick={handleClick}  ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10.5 22.5C10.5 22.8978 10.658 23.2794 10.9393 23.5607C11.2206 23.842 11.6022 24 12 24C12.3978 24 12.7794 23.842 13.0607 23.5607C13.342 23.2794 13.5 22.8978 13.5 22.5V13.5H22.5C22.8978 13.5 23.2794 13.342 23.5607 13.0607C23.842 12.7794 24 12.3978 24 12C24 11.6022 23.842 11.2206 23.5607 10.9393C23.2794 10.658 22.8978 10.5 22.5 10.5H13.5V1.5C13.5 1.10218 13.342 0.720644 13.0607 0.43934C12.7794 0.158035 12.3978 0 12 0C11.6022 0 11.2206 0.158035 10.9393 0.43934C10.658 0.720644 10.5 1.10218 10.5 1.5V10.5H1.5C1.10218 10.5 0.720644 10.658 0.43934 10.9393C0.158035 11.2206 0 11.6022 0 12C0 12.3978 0.158035 12.7794 0.43934 13.0607C0.720644 13.342 1.10218 13.5 1.5 13.5H10.5V22.5Z" fill="#F7F7F7"/></svg></button>
     {modelParams.show && <Modal  modelParams={modelParams}  setModelParams={setModelParams} setTodos={setTodos} />}
    </div>
  )
}
export default App
