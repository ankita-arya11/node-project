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
      if(product.stock === 0){
        return res.status(404).json({ message: "stock is unavailable"})
      }
  
      let cartItem = await Cart.findOne({ where: { userId, productId } });
  
      if (cartItem) {
        await cartItem.update({ quantity: cartItem.quantity + 1 })
        await product.update({ stock: product.stock - 1 })
      } else {
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
        const { productId } = req.params;
        const  userId  = req.user.id;
        // console.log(req.user);

        const cartItem = await Cart.findOne({ where : {userId, productId}})

        if(!cartItem){
            return res.status(404).json({ message: "Cart is empty." })
        }

        if (cartItem.quantity > 1) {
            await cartItem.update({ quantity: cartItem.quantity - 1 });
        } else {
            await cartItem.destroy();
        }

        return res.status(200).json({ message: "product removed from cart successfully" })

    } catch (err) {
        res.status(500).json({ message: "failed to remove from cart", error: err.message })
    }
}