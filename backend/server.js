import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './config/db.js'
import path from "path"

import productRoutes from "./routes/product.route.js"

dotenv.config();

const PORT = process.env.PORT ||500

const app = express();

//Optener el path actual
const __dirname = path.resolve();

app.use(express.json()); //Esto deja que aceptemos un JSON en nuestra req.body

app.use("/api/products",productRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));
    app.get("*",(req,res) => res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html")));
  
}

app.listen(PORT,() =>{
    connectDB();
    console.log("server started at http://localhost:" + PORT);
});
