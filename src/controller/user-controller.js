import { Op } from "sequelize";
import User from "../db/user.js";
import path from "path";
import fs from 'fs';
import bcrypt from "bcryptjs";
import { getLocalIP } from "../common/retrieveIp.js";


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



// ======================================================================================================================





export const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, phone, age, password } = req.body;
        const serverUrl = getLocalIP()
        const profile = req.file ? `http://${serverUrl}:${process.env.PORT}/uploads/${req.file.filename}` : null;

        const user = await User.findByPk(userId);
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            return next(error);
        }

        if (phone) {
            const existingMobile = await User.findOne({
                where: { phone, id: { [Op.ne]: userId } }
            });

            if (existingMobile) {
                const error = new Error("User with this mobile number already exists");
                error.status = 400;
                return next(error);
            }
        }

        const updateData = {};

        if (name && name.trim() !== "") updateData.name = name;
        if (phone && phone.trim() !== "") updateData.phone = phone;
        if (age && age !== "") updateData.age = age;
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt.hash(password, 10);
        }

        updateData.profile = profile;

        await user.update(updateData);

        return res.status(200).json({ message: "User data updated successfully", data: user });
    } catch (error) {
        next(error);
    }
};