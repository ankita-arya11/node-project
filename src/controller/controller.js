import { Op } from "sequelize";
import User from "../db/model.js";
import jwt from 'jsonwebtoken';
import path from "path";
import fs from 'fs';
import { getLocalIP } from "../../retriveIp.js";


// export const createUser = async (req, res) => {
//   try {
//       const { name, email, phone, age } = req.body;
//       const profile = req.file ? `/uploads/${req.file.filename}` : null; 

//       if (!name || !email || !phone || !age) {
//           return res.status(400).json({ message: "All fields are required" });
//       }

//       const ageNumber = Number(age);
//       if (isNaN(ageNumber) || ageNumber <= 0) {
//         return res.status(400).json({ message: "Age must be a valid number" });
//       }

//       if (!/^\d{10}$/.test(phone)) {
//           return res.status(400).json({ message: "Invalid phone number" });
//       }

//       const existingUser = await User.findOne({ where: { email } });

//       if (!existingUser) {
//           return res.status(400).json({ message: "Email not found. Please verify OTP first." });
//       }

//       if (existingUser.name || existingUser.phone || existingUser.age) {
//           return res.status(400).json({ message: "User details already exist" });
//       }

//       existingUser.name = name;
//       existingUser.phone = phone;
//       existingUser.age = age;
//       existingUser.profile = profile;

//       await existingUser.save();

//       return res.status(200).json({ message: "User details updated successfully", data: existingUser });

//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
           res.status(404).json({ message: "user not found" });
      }
       res.status(200).json({
        message: "user details fetched successfully",
        data: user,
      });
    } catch (error) {
       res.status(500).json({ message: "Could not retrieve data" });
      }
  };
  

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
  
        if (!users) {
            return res.status(404).json({ message: "No users found" });
          }
      
        res.status(200).json({ 
          message: "Users fetched successfully",
          data: users,
        });
      } catch (error) {
        res.status(500).json({ message: "Could not retrieve users" });
      }
}
   
export const deleteUser = async (req, res) => {
  try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();
      return res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "User could not be deleted" });
  }
};



export const updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized. No token provided" });
        }

        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        const userId = decoded.id;

        const { name, phone, age } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let profile = user.profile;
        if (req.file) {
            const serverIP = getLocalIP();
            const serverUrl = `${req.protocol}://${serverIP}:5000`;
            profile = `${serverUrl}/uploads/${req.file.filename}`;

            if (user.profile) {
                const oldProfilePath = path.join('uploads', path.basename(user.profile));
                if (fs.existsSync(oldProfilePath)) {
                    fs.unlinkSync(oldProfilePath);
                }
            }
        }

        if (req.body.email && req.body.email !== user.email) {
            return res.status(400).json({ message: "Email cannot be changed" });
        }

        if (phone) {
            const existingMobile = await User.findOne({
                where: { phone, id: { [Op.ne]: userId } }
            });

            if (existingMobile) {
                return res.status(400).json({ message: "User with this mobile number already exists" });
            }
        }

        await user.update({ name, phone, age, profile });

        return res.status(200).json({ message: "User data updated successfully", data: user });
    } catch (error) {
        console.error("Error updating user:", error);
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
