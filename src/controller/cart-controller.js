import Cart from "../db/cart.js"; 
import Product from "../db/product.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    const existingQty = cartItem ? cartItem.quantity : 0;

    if (existingQty >= product.stock) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    if (cartItem) {
      await product.update({ stock: product.stock - 1 });
      await cartItem.update({ quantity: cartItem.quantity + 1 });
    } else {
      await product.update({ stock: product.stock - 1 });
      cartItem = await Cart.create({ userId, productId, quantity: 1 });
    }

    return res.status(201).json({ message: "Product added to cart successfully", cartItem });
  } catch (err) {
    return res.status(500).json({ message: "Failed to add product to cart", error: err.message });
  }
};


export const fetchCart = async (req, res) => {
    try {
        const userId = req.user.id; 

        const cartItems = await Cart.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ["title", "price", "description", "category", "image", "rating"]
                }
            ],
            attributes: ["id", "quantity", "productId"]
        });

        return res.status(200).json({ message: "No product is added to cart.", cartItems });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cart", error: err.message });
    }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    
    const cartItem = await Cart.findOne({ where: { userId, productId } });
    
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    
    if (cartItem.quantity <= 1) {
      await cartItem.destroy();
      return res.status(200).json({ message: "Product removed from cart" });
    } else {

      await cartItem.update({ quantity: cartItem.quantity - 1 });
      return res.status(200).json({ message: "Product quantity decremented in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove product from cart", error: error.message });
  }
};
