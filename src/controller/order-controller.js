import Cart from "../db/cart.js";
import Order from "../db/order.js";
import OrderItem from "../db/orderItem.js";
import Product from "../db/product.js";
import User from "../db/user.js";

export const placeOrder = async (req, res) => {
  
    try {
      const userId = req.user.id;
      const loggedInUser = await User.findByPk(userId);
      if (!loggedInUser) {
        return res.status(401).json({ message: "Please log in first" });
      }
      
      const cartItems = await Cart.findAll({ where: { userId } });
      if (!cartItems.length) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      let totalAmount = 0;
      for (const item of cartItems) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          throw new Error(`Product with id ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.id}`);
        }
        totalAmount += product.price * item.quantity;
      }
      
      const order = await Order.create({ userId, totalAmount, status: "Pending" });
      
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await Product.findByPk(item.productId);
          // Update stock
          await product.update({ stock: product.stock - item.quantity });
          return OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price
          });
        })
      );
      
      await Cart.destroy({ where: { userId } });
      
      return res.status(201).json({ message: "Order placed successfully", order, orderItems });
    } catch (error) {
      return res.status(500).json({ message: "Failed to place order", error: error.message });
    }
  };
  
  

export const getOrders = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = await Order.findAll({ where: { userId } });
      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ message: "Unable to retrieve orders", error: error.message });
    }
  };


export const getOrderById = async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findOne({
        where: { 
            id: orderId, 
            userId: req.user.id },

        include: [{ model: OrderItem }]
      });

      if (!order) return res.status(404).json({ message: "Order not found" });
      
      return res.status(200).json({ order });
    } catch (error) {
      return res.status(500).json({ message: "Unable to retrieve order", error: error.message });
    }
  };


  export const updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const order = await Order.findOne({ where: { id: orderId, userId: req.user.id } });
      if (!order) return res.status(404).json({ message: "Order not found" });
      await order.update({ status });
      return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      return res.status(500).json({ message: "Failed to update order status", error: error.message });
    }
  };

  

//fetch order details
export const fetchOrderDetails = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(401).json({ message: "Please log in first" });
      }
  
      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: OrderItem,
            include: [{ model: Product }]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      return res.status(200).json({ message: "Order details fetched successfully", orders });
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch order details", error: err.message });
    }
  };
  



  export const deleteOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;
  
      const order = await Order.findOne({ where: { id: orderId, userId } });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      await OrderItem.destroy({ where: { orderId: order.id } });
      await order.destroy();
  
      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete order", error: error.message });
    }
  };


