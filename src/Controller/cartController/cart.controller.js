import { Cart } from "../../Model/cart.model.js";
import { product } from "../../Model/products.model.js";

// addToCart Logic
export const addToCart = async(req, res)=>{

    try{
        const { productId, quantity} = req.body;
        const userId = req.user.id; // Added by auth middleware

        //1. find the user's cart
        let userCart = await Cart.findOne({userId})

        if(userCart){
            // 2. Check if product already exists in the cart
            const itemIndex = userCart.items.findIndex(item=>item.productId.toString()===productId)

            if(itemIndex>-1){
                // product already exist so increase the quantity
                userCart.items[itemIndex].quantity += (Number(quantity) || 1)
            }
            else {
                // Product doesn't exist, push to array
                userCart.items.push({productId, quantity: Number(quantity) || 1})
            }
            userCart = await userCart.save();
        }

        else{
            // 3. Create a new cart if none exists
            userCart = await Cart.create({
                userId,
                items: [{ productId, quantity: Number (quantity) || 1 }]
            });
        }

        res.status(200).json({ message: "Cart updated", cart: userCart});

    }
    catch(err){
        res.status(500).json({ message: "Cart operation failed", error: err.message });
    }
}

// Logic to delete an item from the cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        const userCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } } },
            { new: true }
        );

        res.status(200).json({ message: "Item removed", userCart });
    } catch (error) {
        res.status(500).json({ message: "Error removing item", error: error.message });
    }
};

// Logic for update cart
export const updateCartQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        // Use the positional operator '$' to update the specific item in the array
        const userCart = await Cart.findOneAndUpdate(
            { userId, "items.productId": productId },
            { $set: { "items.$.quantity": quantity } },
            { new: true }
        );

        if (!userCart) {
            return res.status(404).json({ message: "Cart or product not found" });
        }

        res.status(200).json({ message: "Quantity updated", userCart });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

       // 1 fetch cart by userId and use populate to get the items details
        const userCart = await Cart.findOne({ userId }).populate({
    path: 'items.productId',
    model: 'products' 
});

        if (!userCart) {
            return res.status(200).json({ message: "Cart is empty", items: [] });
        }

        // 2. Send the response back to the user
        res.status(200).json({ 
            message: "Success", 
            cart: userCart 
        });
        
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message });
    }
}