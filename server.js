/**
 * this will the start of the fil e of the project
 * 
 */

const express=require('express');
const mongoose=require('mongoose');
const PORT=require("./configs/server.config")
const app=express();
const db_config=require("./configs/db.config")
const user_model=require("./model/user.model")
const bcrypt=require("bcryptjs")
app.use(express.json())
/**
 * craete teh admin user at the starting of the application
 * if not already present
 */

//connection with mongodb

mongoose.connect(db_config.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log("error in db")
})

db.once("open",()=>{
    console.log("connected to mongodb ")
    init();
})

async function init(){

    try{
        let user=await user_model.findOne({userId:"admin"});
        if(user){
            console.log("admin is present");
            return;
        }

    }catch(err){
        console.log("Error while reading the data",err)
    }
   
        try{
            user=await user_model.create({
                name:"abhishek1",
                userId:"admin",
                email:"Abhi@gmail.com",
                userType:"ADMIN",
                password:bcrypt.hashSync("welcome1",8)
            })
            console.log("admin is created",user)

        }catch(err){
            console.log("error in craete the admin")

        }
    
}
require("./router/auth.routes")(app)
require("./router/category.routes")(app)
require("./router/product.routes")(app)
/**
 * stich the server
 */

/**
 * server start
 */


app.listen(PORT.PORT,()=>{
    console.log("server is on running")
})
