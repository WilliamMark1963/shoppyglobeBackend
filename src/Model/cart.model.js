import mongoose from "mongoose";

// cartSchema is divided into two parts one user and items that are in cart in that user account.

const cartSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                default: 1,
                min: [1, "Quantity cannot be less than 1"]
            }
        }
    ]
}, { timestamps: true })

export const Cart = mongoose.model("cart", cartSchema)