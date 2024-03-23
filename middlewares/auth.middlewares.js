/**
 * craete the mw to check the request body is proper and correct
 */
const user_model=require("../model/user.model")
const jwt=require("jsonwebtoken")
const auth_config=require("../configs/auth.config")
const verifySignUpBody=async (req,res,next)=>{
    try{

        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                mesage:"Failed !name is not provided in request body"
            })
        }

        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                mesage:"Failed !email is not provided in request body"
            })
        }

        //check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                mesage:"Failed !userId is not provided in request body"
            })
        }

        //check for the user with the samre userId is a;lready present
      const user=await user_model.findOne({userId:req.body.userId})
      if(user){
        return res.status(400).send({
            mesage:"Failed !user is not provided in request body"
        })

      }
      next();
    }catch(err){
        console.log("error while validating the request",err)
       res.status(500).send({
        message:"Error while validating the request body"
       })
    }

}


const verifySignInBody=async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            "message":"userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            "message":"password is not provided"
        })
    }
    next();
}



const verifyToken=(req,res,next)=>{
    //check if the token token is present
    //in the header

    const token=req.headers['x-access-token']


    if(!token){
        return res.status(403).send({
            message:"no token is found unauthorized"
        })
    }


    //if it is the valid token
  jwt.verify(token, auth_config.secret,async(err,decoded)=>{
    if(err){
        return res.status(401).send({
            message:"Invalid Token"
        })
    }
    const user=await user_model.findOne({userId:decoded.id})
    if(!user){
        res.status(400).send({
            message:"UnAuthorize data"
        })
    }
    req.user=user;
    next();

  })


    //then move to the next tokem

}

const isAdmin=(req,res,next)=>{
    const user=req.user;
    if(user &&user.userType=="ADMIN"){
        next();
    }else{
        return res.status(403).send({
            message:"Only Admin user are allowed to access"
        })
    }
}
module.exports={
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}