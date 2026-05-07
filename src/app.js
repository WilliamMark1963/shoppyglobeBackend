import express from "express"
import productRoute from './Route/products.route.js'
const app = new express();

// Middleware
app.use(express.json())

//Products Route
app.use("/shoppyglobe", productRoute)


export default app;