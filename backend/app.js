import express from "express"
import dbConnection from "./src/utils/dbConnection.js"
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authRoutes.js"
import studentRoutes from "./src/routes/studentRoutes.js"
import cors from "cors"


dbConnection()

class App {
    constructor() {
        this.app = express();
        this.middlewares()
        this.routes()
        
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
          });
        this.app.use(cors({origin: ['http://localhost:5173/'], methods:["POST", "GET", "PUT", "DELETE"], credentials: true}))  
    }

    routes(){
        this.app.use('/', authRoutes)
        this.app.use('/', studentRoutes)
        
    }
 
}




export default new App().app


