import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ordersRoute from './routes/orders.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Proper CORS setup to allow your Netlify frontend
app.use(cors({
  origin: 'https://pakhenna.netlify.app', // Only allow your deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  credentials: true // Optional, only if you're using cookies or sessions
}));

app.use(express.json());  // Body parser
app.use('/api/admin', adminRoutes); // Admin routes
app.use('/api/orders', ordersRoute); // Orders routes

// ✅ MongoDB Connection
const mongoUri = process.env.MONGODB_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// ✅ Product Schema and Model
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
});
const Product = mongoose.model('Product', productSchema);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ Add Product
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
});

// ✅ Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get products', error });
  }
});

// ✅ Delete Product
app.delete('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error });
  }
});

// ✅ Server Start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
