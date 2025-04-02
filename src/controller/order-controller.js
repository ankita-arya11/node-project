import Order from "../db/order.js";
import User from "../db/user.js";

export const placeOrder = async (req,res) => {
    try {
        const userId = req.user.id;
        const loggedInUser = await User.findByPk(userId); 
        // console.log(loggedUser);
        if(!loggedInUser){
            return res.status(401).json({ message: "pls login first" })
        }
        await Order.create({
            userId,
        })

        return res.status(201).json({ message: "Order is placed successfully" })
    } catch (err) {
        return res.status(404).json({ message: "failed to place order", error: err.message })
    }
}

//fetch order details
export const fetchOrderDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const loggedInUser = await User.findByPk(userId); 
        // console.log(loggedUser);
        if(!loggedInUser){
            return res.status(401).json({ message: "pls login first" })
        }
        const order = await Order.findOne(userId)
        console.log(order);


    } catch (err) {
        return res.status(500).json({ message: "failed to fetch order details", error: err.message })
    }
}













// export const cancelOrder = async (req, res) => {
//     try {
        
//     } catch (err) {
//         return res.status(500).json({ message: "failed to cancel order"})
//     }
// }