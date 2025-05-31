import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();

    const transformedProducts = products.map(p => ({
      _id: p._id,
      title: p.name,       
      price: p.price,
      image: p.imageUrl,   
    }));

    res.json(transformedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  const { name, price, imageUrl } = req.body;  

  try {
    const newProduct = new Product({
      name,
      price,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    console.log('Product saved:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(400).json({ message: 'Bad request' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting product with id:', req.params.id);
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;