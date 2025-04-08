import express from "express";
import { login, sendOtp, signUp, verifyOtp } from "../controller/otp-controller.js";
import { uploadMiddleware } from "../controller/upload-controller.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/user-controller.js";
import { addProduct, allProducts, deleteProduct, fetchProducts } from "../controller/product-controller.js";
import { addToCart, fetchCart, removeFromCart } from "../controller/cart-controller.js";
import authenticateUser, { multerErrorHandler, updateUserErrorHandler } from "../middleware/authMiddleware.js";
import { fetchOrderDetails, placeOrder, getOrderById, cancelOrder } from "../controller/order-controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp);
router.post("/signup",uploadMiddleware, signUp)
router.post("/login", login)
router.get("/get-user/:id", getUser)
router.get("/users", getAllUsers)
router.delete("/delete-user/:id", deleteUser)
router.patch('/update',authenticateUser, uploadMiddleware, updateUser, multerErrorHandler, updateUserErrorHandler)
router.get("/products", fetchProducts)
router.get("/all-products", allProducts)
router.post("/add-product", addProduct)
router.delete("/delete-product/:id", deleteProduct)
router.post("/add-to-cart", authenticateUser, addToCart)
router.get("/fetch-cart", authenticateUser, fetchCart)
router.delete("/remove-from-cart/:productId", authenticateUser, removeFromCart)
router.post("/place-order", authenticateUser, placeOrder)
router.get("/fetch-order-details", authenticateUser, fetchOrderDetails)
router.get("/get-order/:orderId", authenticateUser, getOrderById)
router.delete("/cancel-order/:orderId", authenticateUser, cancelOrder)


export default router;
