const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category'
    }


},{
    timestamps:true,
    versionKey:false 
})

module.exports=mongoose.model("Product",productSchema);