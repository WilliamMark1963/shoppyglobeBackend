import express from "express"
import productRoute from './Route/products.route.js'
import userRouter from './Route/auth.route.js'
const app = new express();

// Middleware
app.use(express.json())

//Products Route
app.use("/shoppyglobe", productRoute)
//Auth Route
app.use("/shoppyglobe", userRouter)
export default app;