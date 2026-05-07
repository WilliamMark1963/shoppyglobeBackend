import mongoose from "mongoose";
import { product } from "../Model/products.model.js";

const seedProducts = async()=>{
try{
     // ST:1 check if prodcuts already exist to avoid duplicates
     const count = await product.countDocuments();
     if(count>0){
        console.log("Database already has products. skipping seed");
        return;        
     }

     //ST:2 Fetch data feom you dummy API
     console.log("Fettchng products from dummy API...")
     const response = await fetch('https://dummyjson.com/products');
     const result = await response.json();
     const dummyProducts = result.products;

     // ST:3 Extracting the fields
     const formattedProducts = dummyProducts.map(p => ({
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    stock_quantity: p.stock,
    rating: p.rating,
    coverImg: p.thumbnail, // Mapping "thumbnail" from API to your "coverImg"
    tags: p.tags
}));

// inserting it to DB
await product.insertMany(formattedProducts)
console.log(("Successfully seeded database with products! ✅"));
}
catch(err){
    console.error("Error seeding products:", err.message);
}


}

export const connectDB = async()=>{
    try{
        const DB_URI = process.env.MONGODB_URL || "";
        mongoose.connect(DB_URI);
        console.log("MongoDB Connect... ✅");

        // Calling the seed function
        await seedProducts();

    }
    catch(err){
        console.error("Databse Connection Error:", err.message);
        process.exit(1)
    }
}
