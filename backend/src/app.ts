import express from "express"
import cors from "cors"
import todoRouter from "./routes/todoRouter"

const app = express()
const port = 3500

app.use(express.json())
app.use(cors({origin : "*"}))
app.use(todoRouter)



app.listen(port , ()=>{
    console.log(`server started on port : ${port}`)
})