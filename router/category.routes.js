/**
 * /ecomm/api/v1/auth/category
 * 
 */

const category=require("../controllers/category.controller")
const verify=require("../middlewares/auth.middlewares")

module.exports=(app)=>{

    //api posting
    app.post("/ecomm/api/v1/auth/categories",[verify.verifyToken],category.createNewCategory)

}
