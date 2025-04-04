import express from "express";
import { multerErrorHandler } from "../middleware/upload.js";
import { login, sendOtp, signUp, verifyOtp } from "../controller/otp-controller.js";
import { uploadMiddleware } from "../controller/upload-controller.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/user-controller.js";
import { addProduct, deleteProduct, fetchProducts } from "../controller/product-controller.js";
import { addToCart, fetchCart, removeFromCart } from "../controller/cart-controller.js";
import authenticateUser from "../middleware/authMiddleware.js";
import { fetchOrderDetails, placeOrder, getOrders } from "../controller/order-controller.js";

const router = express.Router();

router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOtp);
router.post("/signup",uploadMiddleware, signUp)
router.post("/login", login)
router.get("/get-user/:id", getUser)
router.get("/users", getAllUsers)
router.delete("/delete-user/:id", deleteUser)
router.patch('/update/:id',authenticateUser, uploadMiddleware, updateUser, multerErrorHandler)
//products api
router.get("/products", fetchProducts)
router.post("/add-product", addProduct)
router.delete("/delete-product/:id", deleteProduct)
//cart api
router.post("/add-to-cart", authenticateUser, addToCart)
router.get("/fetch-cart", authenticateUser, fetchCart)
router.delete("/remove-from-cart/:productId", authenticateUser, removeFromCart)
//order api
router.post("/place-order", authenticateUser, placeOrder)
router.get("/fetch-order-details", authenticateUser, fetchOrderDetails)
router.get("/get-orders", getOrders);


export default router;
