

const productModel=require("../model/product.model");
 const category_model=require("../model/category.model")

exports.productCategory=async(req,res)=>{

//read the req,body;

// const c
const category=await category_model.findById(req.body.category);
//const category1 = await category_model.findOne({ _id: req.body.category });
if(!category){
  res.status(400).send({
    message:"Invalid Category"
  })
}
console.log(category.name)

const productData={
    name:req.body.name,
    description:req.body.description,
    category:category,
    brand:req.body.brand,
    price:req.body.price
}

    try{
        const product=await productModel.create(productData);
       res.status(201).send(product)

    }catch(err){
        console.log("err! while creating the  product category",err);
        res.status(500).send({
            message:"error while creating the product category"
        }) 
    }


//insert in the product table



//return the product




}