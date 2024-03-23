/***
 * i need to write the controller login to register
 * craete teh logic to create or register the user
 * 
 */
const secret=require("../configs/auth.config")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs");
const user_model=require("../model/user.model")
console.log(secret)
exports.signup=async (req,res)=>{
    //logic to craete teh user
    //1. read the request the req.body
    const request_body=req.body;

    //2. insert the data in the user collection mongodb
    
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8) 
    }
    console.log(userObj.password  )

    try{
     const user_created= await user_model.create(userObj)
      /**
       * return the user
       */
      const res_obj={
        name:user_created.name,
        userId:user_created.userId,
        email:user_created.email,
        userType:user_created.userType,
        createdAt:user_created.createdAt,
        updateAt:user_created.updatedAt
      }
      res.status(201).send(res_obj)
    }catch(err){
        console.log("error inb creating the user",err)
         res.status(500).send({
            message:"Some error happened while registering the user"
         })
    }
    //3. return response back to the user

}


exports.signin=async (req,res)=>{
  //check userid is present in the system
 const user=await user_model.findOne({userId:req.body.userId});
 if(user==null){
  return  res.status(400).send({
    message:"User id passed is not a valid user id"
  })
 } 
 
 //password is correct
 const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)

 if(!isPasswordValid){
  return  res.status(401).send({
    message:"wrong password passed"
  })
 }

  //using jwt we will create the access token with a given TTl and return
  const token=jwt.sign({id:user.userId},secret.secret,{expiresIn:120})
  
  res.status(200).send({
    name:user.name,
    userId:user.userId,
    email:user.email,
    userType:user.userType,
    accessToken:token
  })
}