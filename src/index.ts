import express from "express"
import morgan from "morgan"
import cookeParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./middleware/errorHandler.middleware.ts"
import { rateLimitting } from "./middleware/rateLimtter.middleware.ts"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
export const ENVMODE = process.env.ENVIRONMENT
const startServer = () =>{
   app.use(rateLimitting)
   app.use(express.json())
   app.use(cors({
    credentials:true,       //for cookies  
    origin:process.env.ORIGIN,
   }))
   app.use(morgan("dev"))  //for logging every req 
   app.use(cookeParser(process.env.COOKIESIGNATURE))  //for reading cookies from request with signature 
   
   app.use("/",(_,res)=>{
    res.send("Hello from Routes")
   })
   app.use((_,res)=>{     //if route not found
      res.send("Route not found")
   })
   app.listen(PORT,()=>{
    console.log("Server running on ",PORT)
   })
   app.use(errorHandler)
}
startServer()