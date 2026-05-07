import mongoose from "mongoose"

// title, pride, description, category, stock_quantity, rating, coverImg
const productSchema = mongoose.Schema({

    title: { 
        type: String, required: true 
    },
    price: { 
        type: Number, required: true 
    },
    description: { 
        type: String, required: true
     },
    category: { 
        type: String, required: true 
    },
    stock_quantity: {
        type: Number, required: true
    },
    rating: { 
        type: Number, default: 1, 
        max: 5, min: 0 
    },
    coverImg: {
        type:String, required:true
    },
    tags: { type: [mongoose.Schema.Types.Mixed], default: [] }

})

export const product = mongoose.model("products", productSchema)