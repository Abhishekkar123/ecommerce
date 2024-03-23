/**
 * post
 * i need to intercept
 * 
 */
const authController=require("../controllers/auth.controller")
const authMiddleWare=require("../middlewares/auth.middlewares")
console.log(authMiddleWare.verifySignInBody)
module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[authMiddleWare.verifySignUpBody],authController.signup)
    //route for post call
    /**
     * 
     * localhost:8000/ecomm/api/v1/auth/signin
     */
     app.post("/ecomm/api/v1/auth/signin",[authMiddleWare.verifySignInBody],authController.signin)
}