import express from "express"
import productRoute from './Route/products.route.js'
import userRouter from './Route/auth.route.js'
import cartRouter from './Route/cart.route.js'

const app = new express();

// Middleware
app.use(express.json())

//Products Route
app.use("/shoppyglobe", productRoute)
//Auth Route
app.use("/shoppyglobe", userRouter)
// Cart Route with protected feature
app.use("/shoppyglobe", cartRouter)
// Catch-all for undefined routes
app.use((req, res, next) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Logs the full error to your console for debugging

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        // Only show error stack if you are in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
});


export default app;