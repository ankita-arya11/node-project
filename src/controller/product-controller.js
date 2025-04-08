import axios from 'axios';
import Product from '../db/product.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { getLocalIP } from '../common/retrieveIp.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const allProducts = async (req, res) => {
    try {
        const products = await Product.findAll()

        if(!products) {
            return res.status(404).json({ message: 'products are not found' })
        }
        return res.status(200).json({ message: 'products data fetched successfully', data: products })
    } catch (err) {
        return res.status(500).json({ message: 'failed to load product data', error: err.message })
    }
}

export const fetchProducts = async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products' })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        
        if(!product){
            return res.status(404).json({ message: 'product not found' })
        }
        await product.destroy();

        res.status(200).json({ message: 'pdroduct deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'failed to delete product', error: err.message })
    }
}



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, category, image: imageUrl, rating } = req.body;

        let storedImageUrl = null;

        if (imageUrl) {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

            const extension = path.extname(new URL(imageUrl).pathname) || '.jpg';
            const imageName = `${uuidv4()}${extension}`;

            const uploadsDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir);
            }

            const imagePath = path.join(uploadsDir, imageName);
            fs.writeFileSync(imagePath, response.data);

            const serverIP = getLocalIP();
            storedImageUrl = `http://${serverIP}:5000/uploads/${imageName}`;
        }

        const newProduct = await Product.create({
            title,
            description,
            price,
            category,
            image: storedImageUrl,
            rating
        });

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to add product', error: err.message });
    }
};