import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export default authenticateUser;

//express error handling middleware
export const multerErrorHandler = (err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Unexpected file error" });
    } else if (err){
        return res.status(400).json({ message: err.message });
    }
    next();
}


export const updateUserErrorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }

    return res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong"
    });
};
