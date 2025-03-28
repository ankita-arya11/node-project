import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "src/uploads";
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

//express error handling middleware
export const multerErrorHandler = (err, req, res, next) => {
    if(err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Unexpected file error" });
    } else if (err){
        return res.status(400).json({ message: err.message });
    }
    next();
}

export default upload;
