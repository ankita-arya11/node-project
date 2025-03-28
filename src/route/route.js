import express from "express";
import upload from "../middleware/upload.js";
import { login, sendOtp, signUp, verifyOtp } from "../controller/otp.controller.js";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controller/controller.js";
import { uploadMiddleware } from "../controller/uploadController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signup",uploadMiddleware, signUp);
router.post("/login", login);
router.get("/get-user/:id", getUser)
router.get("/users", getAllUsers)
router.delete("/delete-user/:id", deleteUser)
router.patch('/update/:id', uploadMiddleware, updateUser);


export default router;
