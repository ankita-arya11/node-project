import axios from 'axios';
import Product from '../db/product.js';
import { getLocalIP } from '../common/retrieveIp.js';

export const fetchProducts = async (req, res) => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products' })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, category, rating } = req.body
        const serverUrl = getLocalIP()
        const image = req.file 
                        ? `http://${serverUrl}:5000/uploads/${req.file.filename}`
                        : null

        const newProduct = await Product.create({
            title,
            description,
            price, 
            category,
            image,
            rating
        });
        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        })
   
    } catch (err) {
        res.status(500).json({ message: 'failed to add product', error: err.message })
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

