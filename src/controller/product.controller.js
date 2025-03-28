import axios from 'axios';
import Product from '../db/product.js';

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
        const { title, description, price, category, image, rating } = req.body

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