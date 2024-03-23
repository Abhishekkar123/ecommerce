/**
 * 
 * controller for category
 * post
 */
const category_model=require("../model/category.model")
exports.createNewCategory=async (req,res)=>{
    //read the req.body
   

    //create the category object
    const categoryData={
        name:req.body.name,
        description:req.body.description
    }
    //insert in the mongodb
   try{
    const category=await  category_model.create(categoryData);
    return res.status(201).send(category)
    }catch(err){
        console.log("err! while creating the category",err);
        res.status(500).send({
            message:"error while creating the category"
        })

   }

    //return the response of the craeted category
    
}