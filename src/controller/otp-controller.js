import Otp from "../db/otp.js";
import User from "../db/user.js";
import bcrypt from "bcryptjs";
import sendOtpEmail from "../common/email-service.js";
import jwt from 'jsonwebtoken';


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const otp = Math.floor(1000 + Math.random() * 9000); 

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 2); 

        await Otp.create({ 
            email, 
            otp: otp.toString(), 
            expiresAt 
        });

        await sendOtpEmail(email, otp);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error in OTP API:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
};



export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const otpRecord = await Otp.findOne({ where: { email, otp } });
        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        let user = await User.findOne({ where: { email } });

        if (!user) {
            user = await User.create({ email }); 
        }

        await Otp.destroy({ where: { email } }); 

        return res.status(200).json({ message: "OTP verified, user registered"});
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const signUp = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;
        const profile = req.file ? `/uploads/${req.file.filename}` : null; 
        
        if (!name || !password || !email || !phone || !age) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const ageNumber = Number(age);
        if (isNaN(ageNumber) || ageNumber <= 0) {
            return res.status(400).json({ message: "Age must be a valid number" });
        }
        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        const isUser = await User.findOne({ where: { email } });

        if (!isUser) {
            return res.status(400).json({ message: "User is not verified" });
        }

        if (isUser.password) {
            return res.status(400).json({ message: "User already signed up. Please update your details instead." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.update(
            { name, password: hashedPassword, phone, age, profile },
            { where: { email } }
        );

        return res.status(200).json({ message: "User signed up successfully",  data: isUser  });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.name || !user.password) {
            return res.status(400).json({ message: "Complete your profile before logging in" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({ message: "Login successful", token});
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};