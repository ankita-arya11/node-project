import Cart from "../db/cart.js"; 
import Product from "../db/product.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            await cartItem.update({ quantity: cartItem.quantity + 1 });
        } else {
            cartItem = await Cart.create({ userId, productId, quantity: 1 });
        }

        return res.status(201).json({ message: "Product added to cart successfully", cartItem });
    } catch (err) {
        res.status(500).json({ message: "Failed to add product to cart", error: err.message });
    }
};

export const fetchCart = async (req, res) => {
    try {
        const userId = req.user.id; 

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product, attributes: ["id", "name", "price"] }],
        });

        return res.status(200).json({ cartItems });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err.message });
    }
};
