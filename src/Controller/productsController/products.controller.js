import { product } from "../../Model/products.model.js";

//CoreLogic of getAllProducts
export const getProducts=async (req, res)=>{
    try{
        const productList = await product.find({});
        res.status(200).json({
            message: "Successful",
            data: productList
        })
    }
    catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//CoreLogic of getProduct by id
export const getProductById=async (req, res)=>{
    try{
        const foundProduct = await product.findById(req.params.id);
        if(!foundProduct){
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"Successful", data: foundProduct })
    }
    catch(err){
        res.status(500).json({message: "Something went wrong", error: err.message})
        }
}