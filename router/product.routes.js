


const verify=require("../middlewares/auth.middlewares")
const product=require("../controllers/product.controller")
module.exports=(app)=>{

//api,token ,controller
    app.post("/ecomm/api/v1/products",product.productCategory);

}